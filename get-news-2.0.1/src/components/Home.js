import React, { Component } from "react";

import ArticleCard from "./Article.js";

//for constructing date format
const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
};

//=============================================================
//collect credentials for loading api articles by request and search bar
//=============================================================



const key = "apiKey=6c6b71cbab324fbd82b11f2c79e14456"; //6

const url = function(endpoint, country, key) {
    return endpoint + country + key;
};

const req = new Request(
    url("https://newsapi.org/v2/top-headlines?", "country=us&", key)
);

const urlSearch = function(el) {
    return (
        "https://newsapi.org/v2/top-headlines?" +
        "q=" +
        el +
        "&" +
        "language=en&" +
        "sortBy=popularity&" +
        key
    );
};
// --END

//=============================================================
//Component which presents Articles on login.
//=============================================================
class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoaded: false,
            data: null,
            error: null,
            init: props.term,
        };
    }

    //when app loads run fetch api
    componentDidMount() {
        //update state on succesful api Load else error check
        fetch(req)
            .then(function(response) {
                return response.json();
            })
            .then(data => {
                if (data.status === "error") {
                    this.setState({
                        isLoaded: false,
                        data: data
                    });
                } else {
                    this.setState({
                        isLoaded: true,
                        data: data
                    });
                }

            })
            .catch(err => {
                this.setState({
                    error: err
                });
            });
    }

    componentDidUpdate(prevProps) {
        if(this.props.term !== prevProps.term ){
                    fetch(urlSearch(this.props.term))
            .then(function(response) {
                return response.json();
            })
            .then(data => {
                if (data.status === "error") {
                    this.setState({
                        isLoaded: false,
                        data: data
                    });
                } else {
                    this.setState({
                        isLoaded: true,
                        data: data
                    });
                }

            })
            .catch(err => {
                this.setState({
                    error: err
                });
            });
        }
    }

    render() {
        const getNews = this.state.data;
//        console.log(this.state.error);

        //view displayed with dynamic information brought in by the api
        return (
            <div className="container">
                <div className="row">
                    {this.state.isLoaded === true ? (
                        getNews.articles.map(val => (
                            <ArticleCard
                                key={getNews.articles.indexOf(val)}
                                title={val.title}
                                img={val.urlToImage}
                                info={val.description}
                                sourceName={val.source.name}
                                url={val.url}
                                date={new Date(
                                    val.publishedAt
                                ).toLocaleDateString("en-US", options)}
                                ID={getNews.articles.indexOf(val)}
                            />
                        ))
                    ) : (
                        <div
                            className="mx-auto"
                            style={{ width: "200px", marginTop: "180px" }}
                        >
                            {this.state.error ? (
                                <div
                                    style={{
                                        textAlign: "center",
                                        color: "red"
                                    }}
                                >
                                    something went wrong <br /> Please try again
                                    later{" "}
                                </div>
                            ) : (
                                <div
                                    style={{
                                        display: "block",
                                        margin: "auto",
                                        width: "90px"
                                    }}
                                >
                                    <div
                                        className="fa fa-spinner fa-spin mx-auto"
                                        style={{ fontSize: "90px" }}
                                    />
                                    <h4
                                        style={{
                                            textAlign: "center",
                                            marginTop: "10px"
                                        }}
                                    >
                                        Loading
                                    </h4>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        );
    }
}
//--END

export default Home;
