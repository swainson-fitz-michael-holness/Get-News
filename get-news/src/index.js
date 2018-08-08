import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import registerServiceWorker from "./registerServiceWorker";
import $ from "jquery";
import Chart from "chart.js";
//===========================================
// Code for dynamically writing search to fetch -1 ApiCall
//===========================================
const key = "apiKey=6c6b71cbab324fbd82b11f2c79e14456";

const url = function(endpoint, country, key) {
    return endpoint + country + key;
};

const req = new Request(
    url("https://newsapi.org/v2/top-headlines?", "country=us&", key)
);

const urlSearch = function(el) {
    return (
        "https://newsapi.org/v2/everything?" +
        "q=" +
        el +
        "&" +
        "language=en&" +
        "sortBy=popularity&" +
        key
    );
};

//Chart component
class Chartify extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            contentOn: <div className="collapse contentDim" id={"hide"+props.identity}><canvas id={props.identity} width="0" height="0" /></div>,
        }
    }


    render(){
//        if(this.state.isOn === true) {
//            console.log(this.state.isOn)
//            return this.state.contentOn;
        return this.state.contentOn;
        }
//


}

//Analyze button
class ActionAnalyze extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isActive: false,
            element: "",
            drawChart: "",
            wChart: "0",
            hChart: "0"
        };

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        e.preventDefault();

        if (this.state.drawChart === "" && this.state.element === "") {
//             console.log("!!!!IF ONE")
            //Fetch analysis from AI
            $.post(
                "https://apiv2.indico.io/texttags",
                JSON.stringify({
                    api_key: "1fd3f7fee7efe92f194cf184a5b7bfc4",
                    data: this.props.cardInfo,
                    top_n: 5
                })
            ).then(res => {
                let holder = JSON.parse(res)
                let nameArr = [];
                let dataArr = [];
                for(var key in holder.results) {
                    nameArr.push(key);
                }
                for(var key in holder.results) {
                    dataArr.push(holder.results[key]);
                }
                console.log(nameArr)

                this.setState({
                    element: JSON.parse(res),
                    clabel: "hello",
                    drawChart: new Chart(
                        document.getElementById(this.props.cardIdentity),
                        {
                            type: "doughnut",
                            data: {
                                labels: nameArr,
                                datasets: [
                                    {
                                        label: "keyword analysis",
                                        backgroundColor: [
                                            "#3e95cd",
                                            "#8e5ea2",
                                            "#3cba9f",
                                            "#e8c3b9",
                                            "#c45850"
                                        ],
                                        data: dataArr
                                    }
                                ]
                            },
                            options: {
                                title: {
                                    display: true,
                                    text:
                                        "This topic is about:"
                                }
                            }
                        }
                    )
                });
                console.log(this.state.clabel)
            });
        } else if( !(this.state.element === "") ) {

        }
    }

    render() {
        let stats = [];
        let labels = [];
        const statContent = this.state.element.results;
//        console.log(this.state.drawChart);
        if (!(this.state.drawChart === "")) {
//            console.log(statContent);
//            console.log(this.props.cardInfo);
            for (let key in statContent) {
                stats.push(statContent[key]);
                labels.push(key);
            }
        }
        return (
            <div className="analyze ">



                <a className="btn btn-primary"
                    href={this.props.cardInfo}
                    target="_blank"
                >
                    {this.props.cardName}
                </a>

                <button
                    className="btn btn-primary analyze-adj "
                    onClick={this.handleClick} type="button" data-toggle="collapse" data-target={"#hide"+this.props.cardIdentity} aria-expanded="false" aria-controls="collapseExample"
                >
                    Analyze
                </button>
                <Chartify identity={this.props.cardIdentity} />




            </div>
        );
    }
}




//end
//===========================================
// Code for dynamically writing search to fetch -1 ApiCall
//===========================================
class MainFrame extends React.Component {
    constructor(props) {
        // Load state values
        super(props);
        this.state = {
            value: "",
            isLoaded: false,
            getData: null,
            error: null
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({ value: e.target.value });
    }

    handleSubmit(e) {
        // Render search results here
        fetch(urlSearch(this.state.value))
            .then(function(response) {
                return response.json();
            })
            .then(
                data => {
                    this.setState({
                        isLoaded: true,
                        getData: data
                    });
                },
                error => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            );
        e.preventDefault();
    }

    componentDidMount() {
        //Make api call for states
        fetch(req)
            .then(function(response) {
                return response.json();
            })
            .then(
                data => {
                    this.setState({
                        isLoaded: true,
                        getData: data
                    });
                },
                error => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            );
    }

    render() {
        if (this.state.isLoaded === false) {
            return <div>Loading</div>;
        } else {
            var info = this.state.getData;
            return (
                //Div container for article feed
                <div>
                    <div className="container">
                        <div className="row">
                            <nav className="navbar navbar-light">
                                <form
                                    className="form-inline"
                                    onSubmit={this.handleSubmit}
                                >
                                    <input
                                        className="form-control mr-sm-2"
                                        placeholder="search"
                                        type="search"
                                        value={this.state.value}
                                        onChange={this.handleChange}
                                    />
                                    <button
                                        className="btn btn-outline-success my-2 my-sm-0"
                                        type="submit"
                                    >
                                        search
                                    </button>
                                </form>
                            </nav>

                            {info.articles.map(val => (
                                <div
                                    key={info.articles.indexOf(val)}
                                    className="dimention-news-card media col-lg-6 "
                                >
                                    <div className="inner-container">
                                        <img
                                            className="mr-3 img-size"
                                            src={val.urlToImage}
                                            alt="test"
                                        />
                                        <div className="media-body">
                                            <h4 className="mt-0 card-title">
                                                {val.title}
                                            </h4>
                                            <p className="mt-1">
                                                {val.description}
                                            </p>

                                            <ActionAnalyze cardInfo={val.url} cardName={val.source.name} cardIdentity={"chart"+info.articles.indexOf(val)}/>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div> //END
            );
        }
    }
}

ReactDOM.render(<MainFrame />, document.getElementById("root"));
registerServiceWorker();
//A rewrite is in orders
