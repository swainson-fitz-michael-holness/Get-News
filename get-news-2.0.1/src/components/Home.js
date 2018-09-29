import React, { Component } from "react";
//import $ from 'jquery';
import ArticleCard from "./Article.js";

import {Animated} from "react-animated-css";


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

            val: "",
            valSubmit: "uk",
            firstLoad: false,
            initHome: null,
            searchHome: null,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    //Everytime an input is made in the search field fire this change function and save results in this.state.val
    handleChange(e){
        e.preventDefault();

        this.setState({
            val: e.target.value,
        })
    }

    //When the submit button is clicked update the submitted state as the current state of this.state.val
    handleSubmit(e){
        e.preventDefault();
        console.log(this.state.val)
        this.setState({
            valSubmit: this.state.val
        });

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
    componentDidUpdate(prevProps, prevState) {
//        console.log(this.state.valSubmit+" :: "+ prevState.valSubmit)
        if((this.state.valSubmit !== prevState.valSubmit) && (this.state.valSubmit !== "")){
            fetch(urlSearch(this.state.valSubmit))
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
            <div className="container" style={{marginTop: "80px",}} >


            <div className="jumbotron " style={{backgroundColor: "rgba(255,255,255,0)", height: "17px"}}>


              <div id="home-search" style={{ display: "block", margin: "auto", }}>


                 <Animated animationIn="fadeIn" isVisible={true}>
                     <form className="form-inline input-group mb-3" onSubmit={this.handleSubmit}>
                            <input className="form-control mr-sm-2" type="search" placeholder="Search top headlines.." aria-label="Search" value={this.state.val} onChange={this.handleChange}/>


                            <div className="input-group-prepend">
                                <button className="btn btn-success " type="submit" data-toggle="tooltip" data-placement="top" title="search for article"><i className="fas fa-search"></i></button>
                            </div>



                        </form>
                 </Animated>

              </div>
              </div>

              <div style={{marginBottom: "0px", opacity:"0.5", marginTop: "10px", marginLeft: "0px", }}>{this.state.isLoaded === true ? <div>Results: <span className="badge badge-pill badge-primary"> {getNews.articles.length}</span></div> : ""} </div>

<hr/>
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
                                date={val.publishedAt}
                                ID={getNews.articles.indexOf(val)}
                            />
                        ))
                    ) : (
                        <div
                            className=""
                            style={{ width: "50px", margin: "auto", marginTop: "100px", }}
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
                                        className="fa fa-spinner fa-spin"
                                        style={{ fontSize: "50px", color:"#3c90df",}}
                                    />


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
