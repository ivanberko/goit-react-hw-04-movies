import React from "react";
import ReactDOM from "react-dom";
import App from "./Components/App/App";
import { BrowserRouter } from "react-router-dom";
import "./styles.css"

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);
