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
        borderColor: "#3e95cd",
        backgroundColor: "#3e95cd",
        fill: false
      },
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
							tooltipFormat: 'll HH:mm'
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

                        console.log(db[tag[tooltipItem.index]])
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
        dash.db.ref(dash.user.uid + "/articles").once("value",
            el => {

                let db = el.val();
                let tag = Object.keys(el.val());
                let dataAngerArr = [];
                let dataFearArr = [];
                let dataJoyArr = [];
                let dataSurpriseArr = [];
//                console.log(new Date (db[tag[0]].date).getTime());

            let dateWindow = [];

            for (var g = -1; g<1; g++){
                dateWindow.push(moment().add(g, "d").toDate());
            }

                for(var i = 0; i < tag.length; i++) {
                    dataAngerArr.push({y:db[tag[i]].emotion.anger, x: new Date (db[tag[i]].date).toLocaleDateString("en-US")});
                    dataFearArr.push(db[tag[i]].emotion.fear);
                    dataJoyArr.push(db[tag[i]].emotion.joy);
                    dataSurpriseArr.push(db[tag[i]].emotion.surprise);
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
