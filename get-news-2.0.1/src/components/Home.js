import React, { Component } from 'react';
//import fire from '../config/Access.js';
import NavigationLogIn from './NavigationLogIn.js'
import ArticleCard from './Article.js';

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


class Home extends Component {
    constructor(props){
        super(props);

        this.state = {
            isLoaded: false,
            data: null,
        };

    }

    componentDidMount() {
        //Make api on Load
        fetch(req)
            .then(function(response) {
                return response.json();
            })
            .then(
                data => {
                    this.setState({
                        isLoaded: true,
                        data: data
                    });
                }
            );
    }

    render(){
        const getNews = this.state.data;
        console.log(getNews);


        return (
                <div className="container">
                   <NavigationLogIn/>

                   <div className="row">
                       {this.state.isLoaded === true ? <ArticleCard
                       title={getNews.articles[2].title}
                       img={getNews.articles[2].urlToImage}
                       info={getNews.articles[2].description}

                        /> : <div></div>}
                   </div>

                </div>
        )

    }
}

export default Home;
