import React, { Component } from "react";
import $ from "jquery";
import Chart from "chart.js";
import fire from "../config/Access.js";

const db = fire.database();
const userDB = fire.auth().currentUser;

//const ref = db.ref("analysis");

//Gathers information bassed on url to analyzxe from news article
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
        };

        this.handleHorChart = this.handleHorChart.bind(this);
        this.handlePolChart = this.handlePolChart.bind(this);
        this.handleTxtChart = this.handleTxtChart.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

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
              title: {
                display: true,
                text: 'Political analysis'
              }
            }
        });
    };

    handleTxtChart(label, data){
        new Chart(document.getElementById("B"+this.props.chartID), {
            type: 'pie',
            data: {
              labels: label,
              datasets: [
                {
                  label: "num)",
                  backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
                  data: data
                }
              ]
            },
            options: {
              title: {
                display: true,
                text: 'This article is about:'
              }
            }
        });
    };

    //when the modal loads gather data from api AI
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
                load: <div style={{color: "red", textAlign: "center"}}>Sorry, couldn't collect data at this moment. Please refresh the page and try again.</div>
            });
        });
    }

    //
    // LOOK HERE!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    //
    handleChange(e){
        e.preventDefault();
        let user = fire.auth().currentUser;
        let dbData = this.state.apiData.results;
        console.log(user)
        db.ref("articles").push({
            url: this.props.dataURL,
            emotion: dbData.emotion.results[0],
            people: dbData.people.results[0],
            places: dbData.places.results[0],
            political: dbData.political.results[0],
            sentimenthq: dbData.sentimenthq.results[0],
            texttags: dbData.texttags.results[0],
            twitterengagement: dbData.twitterengagement.results[0],
        });

        fire.database().ref("articles").on("value", (el)=>{
            let keys = Object.keys(el.val());
            console.log(keys)
        });

    };

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
                <button onClick={this.handleChange} style={{marginTop: "37px"}} type="button" className="btn btn-primary">Save Article</button>
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