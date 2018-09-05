import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Dashboard from './components/Dashboard.js';




ReactDOM.render(
    (
        <BrowserRouter>
          <Switch>
            <Route path="/" component={App} exact/>
            <Route path="/Dashboard" component={Dashboard} />
          </Switch>

        </BrowserRouter>

    ), document.getElementById('root'));
registerServiceWorker();
