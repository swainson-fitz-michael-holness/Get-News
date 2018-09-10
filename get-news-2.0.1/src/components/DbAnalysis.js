import React, { Component } from "react";
//import $ from "jquery";
import Chart from "chart.js";
import fire from "../config/Access.js";

class DbAnalysis extends Component {
    constructor(props) {
        super(props);

        this.state = {
            load: <div>loading</div>,
            db: fire.database(),
            user: fire.auth().currentUser,
            keys: "",
            hr:"",
            horChart: <canvas style={{ display: "none" }} id="horChart"/>,
            polChart: <canvas style={{ display: "none" }} id="polChart"/>,
            txtChart: <canvas style={{ display: "none" }} id="txtChart"/>,

        }

        this.handleHorChart = this.handleHorChart.bind(this);
        this.handlePolChart = this.handlePolChart.bind(this);
        this.handleTxtChart = this.handleTxtChart.bind(this);

    }

    handleHorChart(label, data) {
        new Chart(document.getElementById("horChart"), {
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
        new Chart(document.getElementById("polChart"), {
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

    //creates keyword pie chart
    handleTxtChart(label, data){
        new Chart(document.getElementById("txtChart"), {
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



    componentDidMount(){


        const dash = this.state;

        dash.db.ref(dash.user.uid + "/articles").once(
            "value",
            el => {
                let tag = Object.keys(el.val());
                let db = el.val();

                //----- emo stats
                let emoNameArr = [];
                let emoDataArr = [];
                let emoData = db[this.props.dataKeyID].emotion

                for (var keyName in emoData) {
                    emoNameArr.push(keyName);
                }
                for (var keyData in emoData) {
                    emoDataArr.push(emoData[keyData]);
                }
                //end

                //----- emo stats
                let polNameArr = [];
                let polDataArr = [];
                let polData = db[this.props.dataKeyID].political

                for (var keyPolName in polData) {
                    polNameArr.push(keyPolName);
                }
                for (var keyPolData in polData) {
                    polDataArr.push(polData[keyPolData]);
                }
                //end

                //----- Text stats
                let txtNameArr = [];
                let txtDataArr = [];
                let txtData = db[this.props.dataKeyID].texttags

                for (var keytxtName in txtData) {
                    txtNameArr.push(keytxtName);
                }
                for (var keytxtData in txtData) {
                    txtDataArr.push(txtData[keytxtData]);
                }
                //end

                this.setState({
                    keys: Object.keys(el.val()),
                    load: <div style={{display: "none"}}>Loaded</div>,
                    hr:<hr style={{marginTop: "10px", display: "block"}}/>,
                    horChart: <canvas style={{ display: "block" }} id={this.state.keys}> {this.handleHorChart(emoNameArr,emoDataArr)} </canvas>,
                    polChart: <canvas style={{ display: "block" }} id={"A" + this.state.keys}> {this.handlePolChart(polNameArr,polDataArr)} </canvas>,

                    txtChart: <canvas style={{ display: "block" }} id={"B" + this.state.keys}> {this.handleTxtChart(txtNameArr,txtDataArr)} </canvas>,
                });
            },
            err => {}
        );
    }

    render(){
        let dbA = this.state;
        return (
            <div>
                {dbA.load}
                {dbA.horChart}
                {dbA.hr}
                {dbA.polChart}
                {dbA.hr}
                {dbA.txtChart}
            </div>
        );
    }
}

export default DbAnalysis;
