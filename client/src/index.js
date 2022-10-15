// This code is loaded (i.e. run) from the "client/public/index.html" file

import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App"; // This is where you actually create the front-end React app
import "bootstrap/dist/css/bootstrap.min.css";

// This renders the app and puts it inside "document.getElementById("root")":
ReactDOM.render(<App />, document.getElementById("root"));
