import React, { Component } from "react";
import NavigationLogIn from "./NavigationLogIn.js";
import ArticleCard from "./Article.js";

const options = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric"
};

const key = "apiKey=6c6b71cbab324fbd82b11f2c79e14456"; //6

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

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoaded: false,
      data: null,
        error: null
    };
  }

  componentDidMount() {
    //Make api on Load
    fetch(req)
      .then(function(response) {
        return response.json();
      })
      .then(data => {
        if(data.status === "error") {
            this.setState({
          isLoaded: false,
                data: data
        });
        } else {
         this.setState({
          isLoaded: true,
          data: data
        })

        };
      }).catch(err => {
        this.setState({
            error: err
        });

    }

    );
  }

  render() {
    const getNews = this.state.data;
    console.log(this.state.error);


    return (
      <div className="container">
        <NavigationLogIn />

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
                date={new Date(val.publishedAt).toLocaleDateString(
                  "en-US",
                  options
                )}
                ID={getNews.articles.indexOf(val)}
              />
            ))
          ) : (
            <div className="mx-auto" style={{width: "200px", marginTop: "180px"}}>

    {this.state.error ? <div style={{textAlign: "center", color: "red"}}>something went wrong <br/> Please try again later </div> : <div><i className="fa fa-circle-notch fa-spin" style={{fontSize:"4rem", margin: "0px 0px 4px 11px"}}></i><h4>Loading</h4></div>}
</div>
          )}
        </div>
      </div>
    );
  }
}

export default Home;
