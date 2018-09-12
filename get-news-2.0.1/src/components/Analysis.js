import React, { Component } from "react";
import $ from "jquery";
import Chart from "chart.js";
import fire from "../config/Access.js";

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
            horChart:
                <canvas style={{ display: "none" }} id={this.props.chartID} />
            ,
            polChart: <canvas style={{ display: "none" }} id={"A"+this.props.chartID} />,
            txtChart: <canvas style={{ display: "none" }} id={"B"+this.props.chartID} />,
            apiData: null,
            user: fire.auth().currentUser,
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
    handlePolChart(label, data){
        new Chart(document.getElementById("A"+this.props.chartID), {
            type: 'doughnut',
            data: {
              labels: label,
              datasets: [
                {
                  label: "num",
                  backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
                  data: data
                }
              ]
            },
            options: {
                legend: { display: document.documentElement.clientWidth < 500 ? false : true },
              title: {
                display: true,
                text: 'Political analysis'
              }
            }
        });
    };

    //creates keyword pie chart
    handleTxtChart(label, data){
        new Chart(document.getElementById("B"+this.props.chartID), {
            type: 'pie',
            data: {
              labels: label,
              datasets: [
                {
                  label: "num",
                  backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
                  data: data
                }
              ]
            },
            options: {
                legend: { display: document.documentElement.clientWidth < 500 ? false : true },
              title: {
                display: true,
                text: 'This article is about:'
              }
            }
        });
    };

    //=============================================================
    //when the modal loads gather data from api AI then parse them into arrays to use in charts wherever needed
    //=============================================================
    componentDidMount() {
        $.post(
            "https://apiv2.indico.io/apis/multiapi/batch?apis=twitterengagement,sentimenthq,texttags,political,people,places,emotion",
            JSON.stringify({
                api_key: "1fd3f7fee7efe92f194cf184a5b7bfc4", //1
                data: this.props.dataURL,
                top_n: 5
            })
        ).then(res => {
            let holder = JSON.parse(res);
            this.setState({
                apiData: holder
            });
            console.log(this.state.apiData);
            //----- emo stats
            let emoNameArr = [];
            let emoDataArr = [];
            for (var keyName in holder.results.emotion.results[0]) {
                emoNameArr.push(keyName);
            }
            for (var keyData in holder.results.emotion.results[0]) {
                emoDataArr.push(holder.results.emotion.results[0][keyData]);
            }
            //end

            //----- pol stats
            let polNameArr = [];
            let polDataArr = [];
            for (var keyPolName in holder.results.political.results[0]) {
                polNameArr.push(keyPolName);
            }
            for (var keyPolData in holder.results.political.results[0]) {
                polDataArr.push(holder.results.political.results[0][keyPolData]);
            }
            //end

            //----- Text stats
            let TxtNameArr = [];
            let TxtDataArr = [];
            for (var keyTxtName in holder.results.texttags.results[0]) {
                TxtNameArr.push(keyTxtName);
            }
            for (var keyTxtData in holder.results.texttags.results[0]) {
                TxtDataArr.push(holder.results.texttags.results[0][keyTxtData]);
            }
            //end

            //updates the state of the 3 charts used with chartjs
            this.setState({
                dataViral: Math.round(holder.results.twitterengagement.results[0]*100),
                dataSentiment: Math.round(holder.results.sentimenthq.results[0]*100),
                dataLoaded: true,
                load: <div style={{ display: "none" }} />,
                horChart: (
                    <canvas
                        style={{ display: "block" }}
                    >
                        {this.handleHorChart(emoNameArr, emoDataArr)}
                    </canvas>
                ),
                polChart: <canvas
                        style={{ display: "block" }}
                    >
                        {this.handlePolChart(polNameArr, polDataArr)}
                    </canvas>,
                txtChart: <canvas
                        style={{ display: "block" }}
                    >
                        {this.handleTxtChart(TxtNameArr, TxtDataArr)}
                    </canvas>
            });

        }).catch(error => {
            this.setState({
                load: <div style={{color: "red", textAlign: "center"}}>Sorry, can not collect data at this moment. Please refresh the page and try again.</div>
            });
        });
    }
    //=============================================================
    // Database with Firebase !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    //=============================================================
    // Each user has their own unique uid to save analysis
    // To limit the call of the api and prevent saving duplicate results:
    // search database for keys of saved article and check that the url is not the same as the url in apiData.
    handleChange(){
        let dbData = this.state.apiData.results;
        db.ref(this.state.user.uid+"/articles").push({
            url: this.props.dataURL,
            title: this.props.dataTitle,
            info: this.props.dataInfo,
            date: this.props.dataDate,
            image: this.props.dataImg,
            emotion: dbData.emotion.results[0],
            people: dbData.people.results[0],
            places: dbData.places.results[0],
            political: dbData.political.results[0],
            sentimenthq: dbData.sentimenthq.results[0],
            texttags: dbData.texttags.results[0],
            twitterengagement: dbData.twitterengagement.results[0],
        });
    };
    //checks for duplicates in database
    handleCheck(e) {
        e.preventDefault();
        fire.database().ref(this.state.user.uid+"/articles").once("value", (el)=>{
            let dbObj = el.val();
            if(dbObj){
                let keys = Object.keys(el.val());
                for (var i = 0; i < keys.length; i++) {
                    if(dbObj[keys[i]].url === this.props.dataURL) {
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
            if(info.dataLoaded) {
            return (<div>
               {info.load}
                {info.horChart}
                <hr style={{marginTop: "10px", display: "block"}}/>
                {info.polChart}
                <hr style={{marginTop: "10px", display: "block"}}/>
                {info.txtChart}
                <hr/>
                <h5>Positivity:</h5>
                <div className="progress" style={{height: "25px"}}>
                    <div className="progress-bar bg-warning" role="progressbar" style={{width: info.dataSentiment+"%"}} aria-valuenow={info.dataSentiment} aria-valuemin="0" aria-valuemax="100">{info.dataSentiment}%</div>
                </div>
                <h5 style={{marginTop: "20px"}}>Engagement:</h5>
                <div className="progress" style={{height: "25px"}}>
                    <div className="progress-bar" role="progressbar" style={{width: info.dataViral+"%"}} aria-valuenow={info.dataViral} aria-valuemin="0" aria-valuemax="100">{info.dataViral}%</div>
                </div>
                <button onClick={this.handleCheck} style={{marginTop: "37px"}} type="button" className="btn btn-primary">Save Article</button>
            </div>)
        } else {
            return (<div>
               {info.load}
                {info.horChart}
                <hr style={{marginTop: "10px", display: "none"}}/>
                {info.polChart}
                <hr style={{marginTop: "10px", display: "none"}}/>
                {info.txtChart}
            </div>)
        }
    }
}
export default Analysis;
