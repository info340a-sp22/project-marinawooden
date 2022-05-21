import React from "react";
import ReactDOM from 'react-dom/client';
import App from './components/App';
// import bootstrap from "bootstrap";
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';

import CRITERIA from "./data/criteria.json";
import PROFILES from "./data/profiles.json";
import { BrowserRouter } from "react-router-dom";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <App criteria={CRITERIA} dataSet={PROFILES}/>
        </BrowserRouter>
    </React.StrictMode>
)