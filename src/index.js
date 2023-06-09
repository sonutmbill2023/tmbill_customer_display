import React from "react";
 import App from "./App";
import  ReactDOM  from "react-dom";
import 'bootstrap/dist/css/bootstrap.css';
import "bootstrap/dist/js/bootstrap.bundle.min";
import { HashRouter } from "react-router-dom";
ReactDOM.render(<HashRouter><App/></HashRouter> ,document.getElementById('root'))