import React, { Component } from 'react';
import $ from "jquery";
import Chart from "chart.js";
import fire from "../config/Access.js";
import moment from "moment";

const options = {
    month: "short",
    day: "numeric",
//    year: "numeric"
};

const timeFormat = 'MM/DD/YYYY HH:mm';

class Lab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chart: "",
            db: fire.database(),
            user: fire.auth().currentUser,
        }

        this.handleTrend = this.handleTrend.bind(this);
    }

    handleTrend(label, anger, fear, joy, surprise, el) {
 new Chart(document.getElementById("pie-chart"), {
type: 'scatter',
  data: {
    labels: label,
    datasets: [{
        data: anger,
        label: "Anger",
        borderColor: "#ff3366",
        backgroundColor: "#ff3366",
        fill: false
      }, {
        data: fear,
        label: "fear",
        borderColor: "#6b9b6b",
        backgroundColor: "#6b9b6b",
        fill: false
      }, {
        data: joy,
        label: "joy",
        borderColor: "#3b6dbf",
        backgroundColor: "#3b6dbf",
        fill: false
      }, {
        data: surprise,
        label: "surprise",
        borderColor: "#f4df42",
        backgroundColor: "#f4df42",
        fill: false
      }
    ]
  },
  options: {
    title: {
      display: true,
      text: 'Emotion of selected articles'
    },
      scales: {
					xAxes: [{
						type: 'time',
						time: {
							format: timeFormat,
							// round: 'day'
							tooltipFormat: 'll HH:mm' // HH:mm
						},
						scaleLabel: {
							display: true,
							labelString: 'Date'
						}
					}],
					yAxes: [{
						scaleLabel: {
							display: true,
							labelString: "value"
						},
					}]
				},
      tooltips: {
                enabled: true,
                mode: 'single',
                callbacks: {
                    label: function(tooltipItem, data) {
                        var label = data.datasets[tooltipItem.datasetIndex].label || '';

                    if (label) {
                        label += ': ';
                    }
                        let tag = Object.keys(el.val());
                        let db = el.val();

                    label += db[tag[tooltipItem.index]].title;
                    return label + " : " + tooltipItem.xLabel;
                    }
                }
            },

  }
});
    }

    componentDidMount(){
        const dash = this.state;
//        Chart.defaults.global.tooltips = {
//
//        }
        dash.db.ref(dash.user.uid + "/articles").once("value",
            el => {

                let db = el.val();
                let tag = Object.keys(el.val());
                let dataAngerArr = [];
                let dataFearArr = [];
                let dataJoyArr = [];
                let dataSurpriseArr = [];
                let tagLength = tag.length;
                let i = 0;
//                console.log(new Date (db[tag[0]].date).getTime());

            let dateWindow = [];

            for (var g = -1; g<1; g++){
                dateWindow.push(moment().add(g, "d").toDate());
            }

                for(i; i < tagLength; i++) {
                    dataAngerArr.push({y:db[tag[i]].emotion.anger, x: new Date (db[tag[i]].date)});

                    dataFearArr.push({y:db[tag[i]].emotion.fear, x: new Date (db[tag[i]].date)});

                    dataJoyArr.push({y:db[tag[i]].emotion.joy, x: new Date (db[tag[i]].date)});

                    dataSurpriseArr.push({y:db[tag[i]].emotion.surprise, x: new Date (db[tag[i]].date)});

//BDDSEA
                }

                this.setState({
                    chart: this.handleTrend(dateWindow, dataAngerArr, dataFearArr, dataJoyArr, dataSurpriseArr, el),
                });

//                console.log(dateWindow);
            }
        );


    }

    render(){
        return(
            <div className="container " style={{marginTop: "80px"}}>
                <div className="row">
                    <div  className="col-sm-12">
                       <canvas className="shadow-sm" id="pie-chart"  style={{backgroundColor: "white", borderRadius: "5px ",}} width="200" height= "200">
                           {this.state.chart}
                       </canvas>

                    </div>
                </div>
            </div>
        );
    }
};

export default Lab;
