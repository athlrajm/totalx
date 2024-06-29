import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import store from "./redux/store";
import App from "./App";

// Create a root container instead of using ReactDOM.render
const container = document.getElementById("root");
const root = createRoot(container!); // Create a root for React 18

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
