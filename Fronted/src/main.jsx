import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import "./App.css";

import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store"; // make sure this is correct

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <Provider store={store}>
        <App />
      </Provider>
    </Router>
  </React.StrictMode>
);
// This code initializes a React application with routing and state management using Redux.
// It wraps the main App component with a Router for navigation and a Provider to connect the Redux   