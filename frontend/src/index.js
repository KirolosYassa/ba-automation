import React from "react";
import ReactDOM from "react-dom/client";
import "./css/index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.min.js";
// var admin = require("firebase-admin");

// var serviceAccount = require("path/to/serviceAccountKey.json");

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: "https://ba-automation-5a4ae-default-rtdb.firebaseio.com",
// });

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
