import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const key = 'apiKey=6c6b71cbab324fbd82b11f2c79e14456';
const url = function (endpoint, country, key){
    return endpoint + country + key;
};
const req = new Request(url('https://newsapi.org/v2/top-headlines?','country=us&', key));
fetch(req).then(function(response){
    console.log(response.json());
}); 

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
