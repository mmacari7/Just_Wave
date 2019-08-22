import React from 'react';
import ReactDOM from 'react-dom';
//import './css/index.css';
import App from './components/app';
//import * as serviceWorker from '../serviceWorker';

import {BrowserRouter} from 'react-router-dom';

import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

ReactDOM.render(<App />, document.getElementById("root"));

if (module.hot) { module.hot.accept(); }

