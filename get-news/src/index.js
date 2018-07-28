import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const key = 'apiKey=6c6b71cbab324fbd82b11f2c79e14456';
const url = function (endpoint, country, key) {
    return endpoint + country + key;
};
const req = new Request(url('https://newsapi.org/v2/top-headlines?', 'country=us&', key));

const urlSearch = 'https://newsapi.org/v2/everything?' +
          'q=bitcoin&' +
          'from=2018-07-28&' +
          'language=en&' +
          'sortBy=popularity&' +
          key;

const reqSearch = new Request(urlSearch);



fetch(reqSearch).then(function (response) {
    return response.json();
}).then(function (data) {
    console.log(data)

    class NewsCard extends React.Component {
        render() {
            return (
                <div>
                   <img src={data.articles[this.props.name].urlToImage} alt="test"/>
                    <h1>{data.articles[this.props.name].title}</h1>
                    <h3>{data.articles[this.props.name].source.name}</h3>
                    <p>{data.articles[this.props.name].description}</p>
                    <a href={data.articles[this.props.name].url} target="_blank">more</a>
                    <hr/>
                </div>
            )
        }
     };

    let arrFunc = function(){
        let temp = [];
        for(var i = 0; i < data.articles.length; i++) {
           temp.push(<NewsCard name={i} key ={i} />)
        }
        return temp;
    };

    const arr = arrFunc()

    class Lesson1 extends React.Component {

        render() {
            return (
                <div>
                      {arr.map(function(comp){
                           return comp
                       })}
                </div>
            )
        }
    };

    ReactDOM.render( < Lesson1 / > , document.getElementById('root'));
    registerServiceWorker();
});
