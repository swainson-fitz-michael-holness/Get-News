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
        "sortBy=recent&" +
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

    //if a search is inputted refetch data based on the search result. Note this bug. If the key isn't unique information fetched initially will continue to propagate. To fix this I used a random string generator to ensure uniqueness.
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

        //view displayed with dynamic information brought in by the api
        return (
            <div className="container" style={{marginTop: "80px"}} >
               <div className="text-left" style={{marginBottom: "3px", opacity:"0.5", marginTop: "10px"}}>Results: {this.state.isLoaded === true ? <em>{getNews.articles.length}</em> : "..."} </div>
                <div className="row">


                    {this.state.isLoaded === true ? (
                        getNews.articles.map(val => (

                            <ArticleCard
                                key={getNews.articles.indexOf(val)+Math.random().toString(36).substring(2, 15)}
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
                            style={{ width: "7px", marginTop: "180px" }}
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

//TODO
//give search results condition
//fix tags in title
