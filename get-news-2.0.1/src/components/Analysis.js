import React, { Component } from "react";
import $ from "jquery";
import Chart from "chart.js";

//Gathers information bassed on url to analyzxe from news article
class Analysis extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataLoaded: false,
            load: <div>Loading... </div>,
            horChart: (
                <canvas style={{ display: "none" }} id={this.props.chartID} />
            ),
            polChart: <canvas style={{ display: "none" }} id={"A"+this.props.chartID} />
        };

        this.handleHorChart = this.handleHorChart.bind(this);
        this.handlePolChart = this.handlePolChart.bind(this);
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
          label: "Population (millions)",
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
            let holder = JSON.parse(res);

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

            //----- poli stats
            let polNameArr = [];
            let polDataArr = [];
            for (var keyName in holder.results.political.results[0]) {
                polNameArr.push(keyName);
            }
            for (var keyData in holder.results.political.results[0]) {
                polDataArr.push(holder.results.political.results[0][keyData]);
            }
            //end

            console.log(holder);

            this.setState({
                dataLoaded: true,
                horChart: (
                    <canvas
                        style={{ display: "block" }}
                    >
                        {this.handleHorChart(emoNameArr, emoDataArr)}
                    </canvas>
                ),
                load: <div style={{ display: "none" }} />,
                polChart: <canvas
                        style={{ display: "block" }}
                    >
                        {this.handlePolChart(polNameArr, polDataArr)}
                    </canvas>
            });
        });
    }

    render() {
        const info = this.state;

            if(info.dataLoaded) {
            return (<div>
                {this.state.horChart}
                <hr style={{marginTop: "10px"}}/>
                {this.state.polChart}
            </div>)
        } else {
            return (<div>
               {this.state.horChart}
                {this.state.load}
                {this.state.polChart}
            </div>)
        }

    }
}

export default Analysis;
