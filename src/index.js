import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { HashRouter } from 'react-router-dom'
import  App  from './container/App'
import { LoginPage } from './pages/LoginPage'
import * as apiCalls from './api/apiCalls';

const actions = {
    postLogIn: apiCalls.login
}

ReactDOM.render(
    <HashRouter>
        <App></App>
    </HashRouter>,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
