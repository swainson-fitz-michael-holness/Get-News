import React, { Component } from "react";
import $ from "jquery";
import Chart from "chart.js";
import fire from "../config/Access.js";
import { generateKeyPairSync } from "crypto";
import { promisify } from "util";
const db = fire.database();

function DataCollectError(props) {
    return (
        <div
            style={{
                color: "red",
                textAlign: "center",
            }}
        >
            Can not analyze {props.content} of article.
            <hr />
        </div>
    );

};

function allFalse(obj) {
    for (var o in obj) {
        if (obj[o]) {
            return true;
        } else {
            return false;
        }
    }
}

//=============================================================
//This component gathers information based on url to analyze from news article
//=============================================================
class Analysis extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataViral: null,
            dataSentiment: null,
            dataLoaded: false,
            checkData: false,
            load: <div>Loading... </div>,
            horChart: (
                <canvas style={{ display: "none" }} id={this.props.chartID} />
            ),
            polChart: (
                <canvas
                    style={{ display: "none" }}
                    id={"A" + this.props.chartID}
                />
            ),
            txtChart: (
                <canvas
                    style={{ display: "none" }}
                    id={"B" + this.props.chartID}
                />
            ),
            apiData: {
                emotion: null,
                political: null,
                texttags: null,
                sentimenthq: null,
                twitterengagement: null
            },
            user: fire.auth().currentUser,
            visible: "hidden"
        };

        this.handleHorChart = this.handleHorChart.bind(this);
        this.handlePolChart = this.handlePolChart.bind(this);
        this.handleTxtChart = this.handleTxtChart.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleCheck = this.handleCheck.bind(this);
    }

    // creates the emotional horizontal bar chart
    handleHorChart(label, data) {
        new Chart(document.getElementById(this.props.chartID), {
            type: "horizontalBar",
            data: {
                labels: label,
                datasets: [
                    {
                        label: "emotion",
                        backgroundColor: [
                            "#3e95cd",
                            "#8e5ea2",
                            "#3cba9f",
                            "#e8c3b9",
                            "#c45850"
                        ],
                        data: data
                    }
                ]
            },
            options: {
                legend: { display: false },
                title: {
                    display: true,
                    text: "Emotion evoked from article"
                }
            }
        });
    }

    // creates political doghnutchart
    handlePolChart(label, data) {
        new Chart(document.getElementById("A" + this.props.chartID), {
            type: "doughnut",
            data: {
                labels: label,
                datasets: [
                    {
                        label: "num",
                        backgroundColor: [
                            "#3e95cd",
                            "#8e5ea2",
                            "#3cba9f",
                            "#e8c3b9",
                            "#c45850"
                        ],
                        data: data
                    }
                ]
            },
            options: {
                legend: {
                    display:
                        document.documentElement.clientWidth < 500
                            ? false
                            : true
                },
                title: {
                    display: true,
                    text: "Political analysis"
                }
            }
        });
    }

    //creates keyword pie chart
    handleTxtChart(label, data) {
        new Chart(document.getElementById("B" + this.props.chartID), {
            type: "pie",
            data: {
                labels: label,
                datasets: [
                    {
                        label: "num",
                        backgroundColor: [
                            "#3e95cd",
                            "#8e5ea2",
                            "#3cba9f",
                            "#e8c3b9",
                            "#c45850"
                        ],
                        data: data
                    }
                ]
            },
            options: {
                legend: {
                    display:
                        document.documentElement.clientWidth < 500
                            ? false
                            : true
                },
                title: {
                    display: true,
                    text: "This article is about:"
                }
            }
        });
    }

    //=============================================================
    //when the modal loads gather data from api AI then parse them into arrays to use in charts wherever needed
    //=============================================================
    componentDidMount() {

        let apiObj = {};

        Promise.all([
            fetch('https://cors-anywhere.herokuapp.com/https://apiv2.indico.io/emotion', {
                method: 'POST',
                body: JSON.stringify({
                    api_key: 'bc4cac0bc7ae9435444f865229516cd2',
                    data: this.props.dataURL,
                    top_n: 5
                    // queries: ['team sports', 'royalty']
                })
            }),
            fetch('https://cors-anywhere.herokuapp.com/https://apiv2.indico.io/political', {
                method: 'POST',
                body: JSON.stringify({
                    api_key: 'bc4cac0bc7ae9435444f865229516cd2',
                    data: this.props.dataURL,
                    top_n: 5
                })
            }).catch(err => alert("something went wrong")),
            fetch('https://cors-anywhere.herokuapp.com/https://apiv2.indico.io/texttags', {
                method: 'POST',
                body: JSON.stringify({
                    api_key: 'bc4cac0bc7ae9435444f865229516cd2',
                    data: this.props.dataURL,
                    top_n: 5
                })
            }),
            fetch('https://cors-anywhere.herokuapp.com/https://apiv2.indico.io/sentimenthq', {
                method: 'POST',
                body: JSON.stringify({
                    api_key: 'bc4cac0bc7ae9435444f865229516cd2',
                    data: this.props.dataURL,
                    top_n: 5
                })
            }),
            fetch('https://cors-anywhere.herokuapp.com/https://apiv2.indico.io/twitterengagement', {
                method: 'POST',
                body: JSON.stringify({
                    api_key: 'bc4cac0bc7ae9435444f865229516cd2',
                    data: this.props.dataURL,
                    top_n: 5
                })
            })

        ]).then(responses => {
            Promise.all(responses.map(val => val.json())).then(response => {
                //object collection of the response 
                apiObj.emotion = response[0].results;
                apiObj.political = response[1].results;
                apiObj.texttags = response[2].results;
                apiObj.sentimenthq = response[3].results;
                apiObj.twitterengagement = response[4].results;

                //----- emo stats
                let emoNameArr = [];
                let emoDataArr = [];
                for (var keyName in apiObj.emotion) {
                    emoNameArr.push(keyName);
                }
                for (var keyData in apiObj.emotion) {
                    emoDataArr.push(
                        apiObj.emotion[keyData]
                    );
                }

                //----- pol stats
                let polNameArr = [];
                let polDataArr = [];
                for (var keyPolName in apiObj.political) {
                    polNameArr.push(keyPolName);
                }
                for (var keyPolData in apiObj.political) {
                    polDataArr.push(
                        apiObj.political[keyPolData]
                    );
                }
                //end

                //----- Text stats
                let TxtNameArr = [];
                let TxtDataArr = [];
                for (var keyTxtName in apiObj.texttags) {
                    TxtNameArr.push(keyTxtName);
                }
                for (var keyTxtData in apiObj.texttags) {
                    TxtDataArr.push(
                        apiObj.texttags[keyTxtData]
                    );
                }
                //end

                let failTest = allFalse(apiObj);

                this.setState({
                    apiData: apiObj,
                    dataLoaded: failTest,
                    checkData: true,
                    load: "",
                    horChart: apiObj.emotion ? (
                        <canvas style={{ display: "block" }}>
                            {this.handleHorChart(emoNameArr, emoDataArr)}
                        </canvas>
                    ) : <DataCollectError content="emotional content" />,
                    polChart: apiObj.political ? (
                        <canvas style={{ display: "block" }}>
                            {this.handlePolChart(polNameArr, polDataArr)}
                        </canvas>
                    ) : <DataCollectError content="political content" />,
                    txtChart: apiObj.texttags ? (
                        <canvas style={{ display: "block" }}>
                            {this.handleTxtChart(TxtNameArr, TxtDataArr)}
                        </canvas>
                    ) : <DataCollectError content="contextual content" />,
                    dataSentiment: Math.round(
                        apiObj.sentimenthq * 100
                    ),
                    dataViral: Math.round(
                        apiObj.twitterengagement * 100
                    ),
                    sentiment: apiObj.sentimenthq ? (<div>
                        <h5>Positivity:</h5>
                        <div className="progress" style={{ height: "25px" }}>
                            <div
                                className="progress-bar bg-warning"
                                role="progressbar"
                                style={{
                                    width: Math.round(
                                        apiObj.sentimenthq * 100
                                    ) + "%"
                                }}
                                aria-valuenow={Math.round(
                                    apiObj.sentimenthq * 100)}
                                aria-valuemin="0"
                                aria-valuemax="100"
                            >
                                {Math.round(
                                    apiObj.sentimenthq * 100)}%
                        </div>

                        </div>
                        <hr />
                    </div>) : <DataCollectError content="sentimental" />,
                    twitter: apiObj.twitterengagement ? (<div>
                        <h5 style={{ marginTop: "20px" }}>Engagement:</h5>
                        <div className="progress" style={{ height: "25px" }}>
                            <div
                                className="progress-bar"
                                role="progressbar"
                                style={{
                                    width: Math.round(
                                        apiObj.twitterengagement * 100
                                    ) + "%"
                                }}
                                aria-valuenow={Math.round(
                                    apiObj.twitterengagement * 100
                                )}
                                aria-valuemin="0"
                                aria-valuemax="100"
                            >
                                {Math.round(
                                    apiObj.twitterengagement * 100
                                )}%
        </div>
                        </div>

                    </div>) : <DataCollectError content="virality index" />
                });



                console.log(failTest);
                console.log(apiObj);
            })
                .catch(error => {
                    this.setState({
                        load: (
                            <div
                                style={{
                                    color: "red",
                                    textAlign: "center",
                                    display: "none"
                                }}
                            >
                                Sorry, can not collect data at this moment. Please
                                refresh the page and try again.
                        </div>
                        )
                    });
                });
        });
    }



    //=============================================================
    // Database with Firebase !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    //=============================================================
    // Each user has their own unique uid to save analysis
    // To limit the call of the api and prevent saving duplicate results:
    // search database for keys of saved article and check that the url is not the same as the url in apiData.
    handleChange() {
        let dbData = this.state.apiData;
        console.log(dbData);
        db.ref(this.state.user.uid + "/articles").push(
            {
                //this data is brought in with props from another component
                url: this.props.dataURL,
                title: this.props.dataTitle,
                info: this.props.dataInfo,
                date: this.props.dataDate,
                image: this.props.dataImg,

                //this data is brought in with the fetch command
                //It saves all listed keys to firebase
                emotion: dbData.emotion,
                political: dbData.political,
                sentimenthq: dbData.sentimenthq,
                texttags: dbData.texttags,
                twitterengagement: dbData.twitterengagement
            },
            el => {
                this.setState({
                    visible: "visible"
                });
            }
        );
    }
    //checks for duplicates in database
    handleCheck(e) {
        e.preventDefault();
        fire.database()
            .ref(this.state.user.uid + "/articles")
            .once("value", el => {
                let dbObj = el.val();
                if (dbObj) {
                    let keys = Object.keys(el.val());
                    for (var i = 0; i < keys.length; i++) {
                        if (dbObj[keys[i]].url === this.props.dataURL) {
                            console.log("do not push");
                            break;
                        } else if (i === keys.length - 1) {
                            //                        console.log(keys.length - 1);
                            this.handleChange();
                        }
                    }
                } else {
                    this.handleChange();
                }
            });
    }

    //update the DOM accordingly
    render() {
        const info = this.state;

        if (info.dataLoaded && info.checkData) {
            console.log(info.twitterengagement)
            return (
                <div>
                    {info.load}
                    {info.horChart}
                    <hr style={{ marginTop: "10px", display: "block" }} />
                    {info.polChart}
                    <hr style={{ marginTop: "10px", display: "block" }} />
                    {info.txtChart}
                    <hr />
                    {info.sentiment}
                    {info.twitter}
                    <div className="row">
                        <div className="col-6">
                            <button
                                onClick={this.handleCheck}
                                style={{ marginTop: "37px" }}
                                type="button"
                                className="btn btn-primary"
                            >
                                Save Article
                            </button>
                        </div>
                        <div className="col-6 " style={{}}>
                            <div
                                id="save-alert"
                                style={{
                                    marginTop: "37px",
                                    visibility: this.state.visible,
                                    position: "absolute",
                                    bottom: "0"
                                }}
                                role="alert"
                            >
                                <i
                                    className="fas fa-check-square"
                                    style={{
                                        marginRight: "10px",
                                        marginTop: "37px",
                                        position: "absoltue",
                                        bottom: "0",
                                        fontSize: "1.7rem",
                                        color: "#8fb56e"
                                    }}
                                />

                                <p
                                    style={{
                                        display: "inline",
                                        color: "#8fb56e"
                                    }}
                                >
                                    Saved!
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            );
        } else if (!info.dataLoaded && info.checkData) {
            return (
                <div
                    style={{
                        color: "red",
                        textAlign: "center",

                    }}
                >
                    Sorry, can not collect data at this moment. Please
                    refresh the page and try again.
                        </div>
            );
        } else {
            return (
                <div>
                    {info.load}
                    {info.horChart}
                    <hr style={{ marginTop: "10px", display: "none" }} />
                    {info.polChart}
                    <hr style={{ marginTop: "10px", display: "none" }} />
                    {info.txtChart}
                </div>
            );
        }
    }
}
export default Analysis;
