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
    console.log(data);


    class NewsCard extends React.Component {
        render() {
            return (
                <div className="media dimention-news-card">
                   <img className="mr-3 img-size" src={data.articles[this.props.name].urlToImage } alt="test"/>
                   <div className="media-body">
                       <h3 className="mt-0">{data.articles[this.props.name].title }</h3>
                       <p className="mt-1">{data.articles[this.props.name].description}</p>
                       <h5>{data.articles[this.props.name].source.name}</h5>
                       <a  href={data.articles[this.props.name].url} target="_blank">source</a>
                   </div>

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
