import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { HashRouter } from 'react-router-dom'
import App from './container/App'
import { Provider } from 'react-redux';
import configureStore from './redux/configureStore'
 
const store = configureStore();

ReactDOM.render(
    <Provider store={store}>
        <HashRouter>
            <App></App>
        </HashRouter>
    </Provider>,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
