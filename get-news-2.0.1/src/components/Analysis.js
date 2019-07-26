import React, { Component } from "react";
import $ from "jquery";
import Chart from "chart.js";
import fire from "../config/Access.js";
import { generateKeyPairSync } from "crypto";
import { promisify } from "util";
const db = fire.database();



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

    getAnalysis = () => {


        // fetch('https://cors-anywhere.herokuapp.com/https://apiv2.indico.io/emotion', {
        //     method: 'POST',
        //     body: JSON.stringify({
        //         api_key: 'bc4cac0bc7ae9435444f865229516cd2',
        //         data: this.props.dataURL,
        //         top_n: 5
        //         // queries: ['team sports', 'royalty']
        //     })
        // })
        //     .then(r => r.json())
        //     .then(response => {
        //         apiObj.emotion = response.results;

        //         //----- emo stats
        //         let emoNameArr = [];
        //         let emoDataArr = [];
        //         for (var keyName in response.results) {
        //             emoNameArr.push(keyName);
        //         }
        //         for (var keyData in response.results) {
        //             emoDataArr.push(
        //                 response.results[keyData]
        //             );
        //         }


        //         this.setState({
        //             apiData: apiObj,
        //             horChart: (
        //                 <canvas style={{ display: "block" }}>
        //                     {this.handleHorChart(emoNameArr, emoDataArr)}
        //                 </canvas>
        //             )
        //         });

        //     })
        //     .catch(err => console.log(err));

        // fetch('https://cors-anywhere.herokuapp.com/https://apiv2.indico.io/political', {
        //     method: 'POST',
        //     body: JSON.stringify({
        //         api_key: 'bc4cac0bc7ae9435444f865229516cd2',
        //         data: this.props.dataURL,
        //         top_n: 5
        //     })
        // })
        //     .then(r => r.json())
        //     .then(response => {
        //         apiObj.political = response.results

        //         //----- pol stats
        //         let polNameArr = [];
        //         let polDataArr = [];
        //         for (var keyPolName in response.results) {
        //             polNameArr.push(keyPolName);
        //         }
        //         for (var keyPolData in response.results) {
        //             polDataArr.push(
        //                 response.results[keyPolData]
        //             );
        //         }
        //         //end

        //         this.setState({
        //             apiData: apiObj,
        //             polChart: (
        //                 <canvas style={{ display: "block" }}>
        //                     {this.handlePolChart(polNameArr, polDataArr)}
        //                 </canvas>
        //             ),
        //         });
        //     })
        //     .catch(err => console.log(err));

        // fetch('https://cors-anywhere.herokuapp.com/https://apiv2.indico.io/texttags', {
        //     method: 'POST',
        //     body: JSON.stringify({
        //         api_key: 'bc4cac0bc7ae9435444f865229516cd2',
        //         data: this.props.dataURL,
        //         top_n: 5
        //     })
        // })
        //     .then(r => r.json())
        //     .then(response => {
        //         apiObj.texttags = response.results;

        //         //----- Text stats
        //         let TxtNameArr = [];
        //         let TxtDataArr = [];
        //         for (var keyTxtName in response.results) {
        //             TxtNameArr.push(keyTxtName);
        //         }
        //         for (var keyTxtData in response.results) {
        //             TxtDataArr.push(
        //                 response.results[keyTxtData]
        //             );
        //         }
        //         //end

        //         this.setState({
        //             apiData: apiObj,
        //             txtChart: (
        //                 <canvas style={{ display: "block" }}>
        //                     {this.handleTxtChart(TxtNameArr, TxtDataArr)}
        //                 </canvas>
        //             )
        //         });
        //     })
        //     .catch(err => console.log(err));

        // fetch('https://cors-anywhere.herokuapp.com/https://apiv2.indico.io/sentimenthq', {
        //     method: 'POST',
        //     body: JSON.stringify({
        //         api_key: 'bc4cac0bc7ae9435444f865229516cd2',
        //         data: this.props.dataURL,
        //         top_n: 5
        //     })
        // })
        //     .then(r => r.json())
        //     .then(response => {
        //         apiObj.sentimenthq = response.results;
        //         this.setState({
        //             apiData: apiObj,
        // dataSentiment: Math.round(
        //     response.results * 100
        // ),
        //             // dataLoaded: true
        //         });
        //     })
        //     .catch(err => console.log(err));

        // fetch('https://cors-anywhere.herokuapp.com/https://apiv2.indico.io/twitterengagement', {
        //     method: 'POST',
        //     body: JSON.stringify({
        //         api_key: 'bc4cac0bc7ae9435444f865229516cd2',
        //         data: this.props.dataURL,
        //         top_n: 5
        //     })
        // })
        //     .then(r => r.json())
        //     .then(response => {
        //         apiObj.twitterengagement = response.results;
        //         this.setState({
        //             apiData: apiObj,
        // dataViral: Math.round(
        //     response.results * 100
        // ),
        //             // dataLoaded: true
        //         });
        //     })
        //     .catch(err => console.log(err));

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
            }),
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
                //emotion data 
                apiObj.emotion = response[0].results;
                apiObj.political = response[1].results;
                apiObj.texttags = response[2].results;
                apiObj.sentimenthq = response[3].results;
                apiObj.twitterengagement = response[4].results;

                //----- emo stats
                let emoNameArr = [];
                let emoDataArr = [];
                for (var keyName in response[0].results) {
                    emoNameArr.push(keyName);
                }
                for (var keyData in response[0].results) {
                    emoDataArr.push(
                        response[0].results[keyData]
                    );
                }

                //----- pol stats
                let polNameArr = [];
                let polDataArr = [];
                for (var keyPolName in response[1].results) {
                    polNameArr.push(keyPolName);
                }
                for (var keyPolData in response[1].results) {
                    polDataArr.push(
                        response[1].results[keyPolData]
                    );
                }
                //end

                //----- Text stats
                let TxtNameArr = [];
                let TxtDataArr = [];
                for (var keyTxtName in response[2].results) {
                    TxtNameArr.push(keyTxtName);
                }
                for (var keyTxtData in response[2].results) {
                    TxtDataArr.push(
                        response[2].results[keyTxtData]
                    );
                }
                //end


                this.setState({
                    apiData: apiObj,
                    dataLoaded: true,
                    load: "",
                    horChart: (
                        <canvas style={{ display: "block" }}>
                            {this.handleHorChart(emoNameArr, emoDataArr)}
                        </canvas>
                    ),
                    polChart: (
                        <canvas style={{ display: "block" }}>
                            {this.handlePolChart(polNameArr, polDataArr)}
                        </canvas>
                    ),
                    txtChart: (
                        <canvas style={{ display: "block" }}>
                            {this.handleTxtChart(TxtNameArr, TxtDataArr)}
                        </canvas>
                    ),
                    dataSentiment: Math.round(
                        response[3].results * 100
                    ),
                    dataViral: Math.round(
                        response[4].results * 100
                    ),
                });
                console.log(apiObj);
            });
        })

        //////////////////////////////////////////////////
        //     LEGACY AJAX CALL - fails due to cors
        /////////////////////////////////////////////////

        //Its being kept around as reference for now. Will be deleted.

        //     $.post(
        //         "https://cors-anywhere.herokuapp.com/https://apiv2.indico.io/apis/multiapi/batch?apis=sentimenthq,texttags,political,people,emotion",
        //         JSON.stringify({
        //             "api_key": "bc4cac0bc7ae9435444f865229516cd2",
        //             "data": this.props.dataURL,
        //             "top_n": 5
        //         })
        //     )
        //         .then(res => {
        //             let holder = JSON.parse(res);
        //             this.setState({
        //                 apiData: holder
        //             });
        //             console.log(holder);

        //             if (this.state.apiData.results.emotion.status === 400) {
        //                 this.setState({
        //                     load: (
        //                         <div style={{ color: "red", textAlign: "center" }}>
        //                             Sorry, can not collect data at this moment.{" "}
        //                         </div>
        //                     )
        //                 });
        //             } else {
        //                 //----- emo stats
        //                 let emoNameArr = [];
        //                 let emoDataArr = [];
        //                 for (var keyName in holder.results.emotion.results[0]) {
        //                     emoNameArr.push(keyName);
        //                 }
        //                 for (var keyData in holder.results.emotion.results[0]) {
        //                     emoDataArr.push(
        //                         holder.results.emotion.results[0][keyData]
        //                     );
        //                 }
        //                 //end

        //                 //----- pol stats
        //                 let polNameArr = [];
        //                 let polDataArr = [];
        //                 for (var keyPolName in holder.results.political
        //                     .results[0]) {
        //                     polNameArr.push(keyPolName);
        //                 }
        //                 for (var keyPolData in holder.results.political
        //                     .results[0]) {
        //                     polDataArr.push(
        //                         holder.results.political.results[0][keyPolData]
        //                     );
        //                 }
        //                 //end

        //                 //----- Text stats
        //                 let TxtNameArr = [];
        //                 let TxtDataArr = [];
        //                 for (var keyTxtName in holder.results.texttags.results[0]) {
        //                     TxtNameArr.push(keyTxtName);
        //                 }
        //                 for (var keyTxtData in holder.results.texttags.results[0]) {
        //                     TxtDataArr.push(
        //                         holder.results.texttags.results[0][keyTxtData]
        //                     );
        //                 }
        //                 //end

        //                 //updates the state of the 3 charts used with chartjs
        //                 this.setState({
        //                     dataViral: Math.round(
        //                         holder.results.twitterengagement.results[0] * 100
        //                     ),
        //                     dataSentiment: Math.round(
        //                         holder.results.sentimenthq.results[0] * 100
        //                     ),
        //                     dataLoaded: true,
        //                     load: <div style={{ display: "none" }} />,
        //                     horChart: (
        //                         <canvas style={{ display: "block" }}>
        //                             {this.handleHorChart(emoNameArr, emoDataArr)}
        //                         </canvas>
        //                     ),
        //                     polChart: (
        //                         <canvas style={{ display: "block" }}>
        //                             {this.handlePolChart(polNameArr, polDataArr)}
        //                         </canvas>
        //                     ),
        //                     txtChart: (
        //                         <canvas style={{ display: "block" }}>
        //                             {this.handleTxtChart(TxtNameArr, TxtDataArr)}
        //                         </canvas>
        //                     )
        //                 });
        //             }
        //         })
        //         .catch(error => {
        //             this.setState({
        //                 load: (
        //                     <div
        //                         style={{
        //                             color: "red",
        //                             textAlign: "center",
        //                             display: "none"
        //                         }}
        //                     >
        //                         Sorry, can not collect data at this moment. Please
        //                         refresh the page and try again.
        //                     </div>
        //                 )
        //             });
        //         });
        // }
        // --- END
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
                //            document.getElementById("save-alert").style.visability = "visible";
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
        if (info.dataLoaded) {
            return (
                <div>
                    {info.load}
                    {info.horChart}
                    <hr style={{ marginTop: "10px", display: "block" }} />
                    {info.polChart}
                    <hr style={{ marginTop: "10px", display: "block" }} />
                    {info.txtChart}
                    <hr />
                    <h5>Positivity:</h5>
                    <div className="progress" style={{ height: "25px" }}>
                        <div
                            className="progress-bar bg-warning"
                            role="progressbar"
                            style={{ width: info.dataSentiment + "%" }}
                            aria-valuenow={info.dataSentiment}
                            aria-valuemin="0"
                            aria-valuemax="100"
                        >
                            {info.dataSentiment}%
                        </div>
                    </div>
                    <h5 style={{ marginTop: "20px" }}>Engagement:</h5>
                    <div className="progress" style={{ height: "25px" }}>
                        <div
                            className="progress-bar"
                            role="progressbar"
                            style={{ width: info.dataViral + "%" }}
                            aria-valuenow={info.dataViral}
                            aria-valuemin="0"
                            aria-valuemax="100"
                        >
                            {info.dataViral}%
                        </div>
                    </div>

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
