import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./styles/index.css";

window.devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__;

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById("root")
);
