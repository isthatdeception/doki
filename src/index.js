/* eslint-disable import/first */

/**
 *
 * @author isthatdeception
 * @description main file for the doki app
 * @version 1.00
 *
 */
// import "./wdyr";
import React from "react";
import ReactDOM from "react-dom";

import dotenv from "dotenv";
dotenv.config();

// relative imports
import { FirebaseContext } from "./context/forFirebase";
import { firebase, FieldValue } from "./lib/firebase";
import App from "./App";
import "./styles/app.css";

ReactDOM.render(
  <React.StrictMode>
    <FirebaseContext.Provider value={{ firebase, FieldValue }}>
      <App />
    </FirebaseContext.Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
