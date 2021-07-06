/* eslint-disable import/first */

/**
 * main file for our app
 * static imports
 */
import "./wdyr";
import React from "react";
import ReactDOM from "react-dom";

import dotenv from "dotenv";
dotenv.config();

// relative imports
import { FirebaseContext } from "./context/forFirebase";
import { firebase, fieldValue } from "./lib/firebase";
import App from "./App";
import "./styles/app.css";

ReactDOM.render(
  <React.StrictMode>
    <FirebaseContext.Provider value={{ firebase, fieldValue }}>
      <App />
    </FirebaseContext.Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
