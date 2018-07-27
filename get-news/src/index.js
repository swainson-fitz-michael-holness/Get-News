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

class Run extends React.Component {
        render() {
            return ( < h1 > {
                    this.props.author
                } < /h1>);
            }
        }

        fetch(req).then(function (response) {
            return response.json();
        }).then(function (data) {

            class App extends React.Component {
                constructor(props) {
                    super(props);
                    this.state = {
                        title: data.articles[0].title
                    }
                }

                render(){
                    return (
                        <div>
                            <h1>{this.state.title}</h1>
                        </div>
                    )
                };
            }

            ReactDOM.render( < App / > , document.getElementById('root'));
            registerServiceWorker();
            console.log(data);
        });
