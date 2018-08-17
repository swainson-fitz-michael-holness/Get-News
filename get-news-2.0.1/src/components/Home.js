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
        const getNews = this.state;
        console.log(getNews.data);


        return (
                <div className="container">
                   <NavigationLogIn/>

                   <div className="row">
                        <ArticleCard  />
                   </div>

                </div>
        )

    }
}

export default Home;
