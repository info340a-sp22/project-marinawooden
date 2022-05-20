import React from "react";
import ReactDOM from 'react-dom/client';
import App from './components/App';
// import bootstrap from "bootstrap";
import 'bootstrap/dist/css/bootstrap.css';

import CRITERIA from "./data/criteria.json";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <App criteria={CRITERIA}/>
    </React.StrictMode>
)