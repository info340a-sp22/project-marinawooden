import React from "react";
import ReactDOM from 'react-dom/client';
import App from './components/App';

//imported css
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import { BrowserRouter } from 'react-router-dom'

import CRITERIA from "./data/criteria.json";
import PROFILES from "./data/profiles.json";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDzAvp6RaG98hREp-csQsOqmpo9kXw0k28",
  authDomain: "musicroom-196ba.firebaseapp.com",
  projectId: "musicroom-196ba",
  storageBucket: "musicroom-196ba.appspot.com",
  messagingSenderId: "122879506300",
  appId: "1:122879506300:web:460255754098ebe341d6f9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//render root
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <App criteria={CRITERIA} dataSet={PROFILES}/>
        </BrowserRouter>
    </React.StrictMode>
)