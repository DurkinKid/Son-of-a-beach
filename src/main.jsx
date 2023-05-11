import "vite/modulepreload-polyfill";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import 'semantic-ui-css/semantic.min.css'


ReactDOM.createRoot(document.getElementById("root")).render(

    <Router>
      
      <App />
      
    </Router>
  
);
