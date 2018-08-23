import React, { Component } from 'react';
import $ from "jquery";
import Chart from "chart.js";



//Gathers information bassed on url to analyzxe from news article
class Analysis extends Component {
    constructor(props) {
        super(props);
        this.state = {
            load: <div>Loading... </div>,
            horChart: <canvas style={{display: "none"}} id={this.props.chartID}></canvas>,

        };

        this.handleChart = this.handleChart.bind(this);
    }

    handleChart(label, data){
             new Chart(document.getElementById(this.props.chartID), {
        type: 'horizontalBar',
        data: {
          labels: label,
          datasets: [
            {
              label: "emotion",
              backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
              data: data
            }
          ]
        },
        options: {
          legend: { display: false },
          title: {
            display: true,
            text: 'Emotion evoked from article'
          }
        }
    });


    }

//when the modal loads gather data from api AI
    componentDidMount() {
            $.post(
                "https://apiv2.indico.io/apis/multiapi/batch?apis=twitterengagement,sentimenthq,texttags,political,people,places,emotion",
                JSON.stringify({
                    api_key: "1fd3f7fee7efe92f194cf184a5b7bfc4",
                    data: this.props.dataURL,
                    top_n: 5
                })
            ).then(res => {
                let holder = JSON.parse(res)
                let emoNameArr = [];
                let emoDataArr = [];
                for(var keyName in holder.results.emotion.results[0]) {
                    emoNameArr.push(keyName);
                }
                for(var keyData in holder.results.emotion.results[0]) {
                    emoDataArr.push(holder.results.emotion.results[0][keyData]);
                }
//            this.setState({
//            stats: nameArr
//        });
                console.log(holder);

                    this.setState({
                      horChart: <canvas style={{display: "block"}} id={this.props.chartID}>{this.handleChart(emoNameArr, emoDataArr)}</canvas>,
                        load: <div style={{display: "none"}}></div>
                    });
                });

    }

    render(){
        return (

            <div>
               {this.state.load}
                {this.state.horChart}
            </div>
        );
    }
};

export default Analysis;
