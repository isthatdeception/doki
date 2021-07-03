/* eslint-disable import/first */
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import dotenv from "dotenv";
dotenv.config();

import { firebaseContext } from "./context/forFirebase";
import { firebase, fieldValue } from "./lib/firebase";

ReactDOM.render(
  <React.StrictMode>
    <firebaseContext.Provider value={{ firebase, fieldValue }}>
      <App />
    </firebaseContext.Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
