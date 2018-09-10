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
            horChart: <canvas style={{ display: "none" }} id="horChart"/>

        }

        this.handleHorChart = this.handleHorChart.bind(this);
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

                this.setState({
                    keys: Object.keys(el.val()),
                    load: <div style={{display: "none"}}>Loaded</div>,
                    horChart: <canvas style={{ display: "block" }} id={this.state.keys}> {this.handleHorChart(emoNameArr,emoDataArr)} </canvas>
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
            </div>
        );
    }
}

export default DbAnalysis;
