import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import store from "./services/redux-toolkit/store.js";

import { Provider } from "react-redux";
import { getConfig } from "./config";
import { Auth0Provider } from "@auth0/auth0-react";

import "./index.css";

const config = getConfig();

const providerConfig = {
  domain: config.domain,
  clientId: config.clientId,
  authorizationParams: {
    redirect_uri: window.location.origin,
  },
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Auth0Provider {...providerConfig}>
      <Provider store={store}>
        <App />
      </Provider>
    </Auth0Provider>
  </React.StrictMode>
);
