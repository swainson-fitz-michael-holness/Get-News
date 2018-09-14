import React, { Component } from 'react';
import $ from "jquery";
import Chart from "chart.js";
import fire from "../config/Access.js";

const options = {
    month: "numeric",
    day: "numeric",
    hour: "numeric"
};

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

    handleTrend(label, anger, fear, joy, surprise) {
 new Chart(document.getElementById("pie-chart"), {
type: 'bar',
  data: {
    labels: label,
    datasets: [{
        data: anger,
        label: "Anger",
        borderColor: "#3e95cd",
        backgroundColor: "#3e95cd",
        fill: true
      }, {
        data: fear,
        label: "Fear",
        borderColor: "#8e5ea2",
        fill: false
      }, {
        data: joy,
        label: "Joy",
        borderColor: "#3cba9f",
        fill: false
      }, {
        data: surprise,
        label: "Surpise",
        borderColor: "#e8c3b9",
        fill: false
      },
    ]
  },
  options: {
    title: {
      display: true,
      text: 'Emotion of selected articles'
    }
  }
});
    }

    componentDidMount(){
        const dash = this.state;
        dash.db.ref(dash.user.uid + "/articles").once("value",
            el => {

                let db = el.val();
                let tag = Object.keys(el.val());
                let dataDateArr = [];
                let dataDateArrMs = [];
                let dataAngerArr = [];
                let dataFearArr = [];
                let dataJoyArr = [];
                let dataSurpriseArr = [];
//                console.log(new Date (db[tag[0]].date).getTime());

                for(var i = 0; i < tag.length; i++) {
                    dataDateArrMs.push(new Date (db[tag[i]].date).getTime());
                    dataDateArr.push(new Date (db[tag[i]].date).toLocaleDateString("en-US", options));
                    dataAngerArr.push(db[tag[i]].emotion.anger);
                    dataFearArr.push(db[tag[i]].emotion.fear);
                    dataJoyArr.push(db[tag[i]].emotion.joy);
                    dataSurpriseArr.push(db[tag[i]].emotion.surprise);
                }

                this.setState({
                    chart: this.handleTrend(dataDateArr, dataAngerArr, dataFearArr, dataJoyArr, dataSurpriseArr),
                });

                console.log(dataFearArr)
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
