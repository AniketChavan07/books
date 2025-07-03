import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// ✅ Correct CSS import (no variable name)
import "./index.css";
import "./App.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
