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



fetch(req).then(function (response) {
    return response.json();
}).then(function (data) {
    console.log(data)

    class NewsCard extends React.Component {
        render() {
            return (
                <div>
                   <img src={data.articles[0].urlToImage} alt="test"/>
                    <h1>{data.articles[0].title}</h1>
                    <h3>{data.articles[0].source.name}</h3>
                    <p>{data.articles[0].description}</p>
                    <a href={data.articles[0].url} target="_blank">more</a>
                </div>
            )
        }
     };


    let arr = [<NewsCard key="1" />,<NewsCard key="13" />,<NewsCard key="145" />];

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

    ReactDOM.render( < NewsCard / > , document.getElementById('root'));
    registerServiceWorker();
});
