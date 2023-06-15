import React from "react";
 import App from "./App";
import  ReactDOM  from "react-dom";
import { createRoot } from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.css';
import "bootstrap/dist/js/bootstrap.bundle.min";
import { HashRouter } from "react-router-dom";
createRoot( document.getElementById('root')).render(<HashRouter><App/></HashRouter>)