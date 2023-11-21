import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import store from "./store";
import App from "./components/app";
import ErrorBoundry from "./components/error-boundry";
import "./index.scss";

const root = document.getElementById("root");

createRoot(root).render(
  <Provider store={store}>
    <ErrorBoundry>
      <App />
    </ErrorBoundry>
  </Provider>
);
