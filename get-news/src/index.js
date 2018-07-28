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



//fetch(req).then(function (response) {
//    return response.json();
//}).then(function (data) {
//
//    class App extends React.Component {
//        constructor(props) {
//            super(props);
//            this.state = data;
//        }
//this.state.articles[0].title
//        render(){
//            return (
//                <div>
//                    <h1>{}</h1>
//                </div>
//            )
//        };
//    }
//});

class RepeatMe extends React.Component {
    render() {
        return (
            <div>h</div>
        )
    }
 };


let arr = [<RepeatMe key="1" />,<RepeatMe key="13" />,<RepeatMe key="145" />];

class Lesson1 extends React.Component {
    render() {
        return (
            <div>{
                   arr.map(function(comp){
                       return comp
                   })
                }</div>
        )
    }
};

ReactDOM.render( < Lesson1 / > , document.getElementById('root'));
registerServiceWorker();
