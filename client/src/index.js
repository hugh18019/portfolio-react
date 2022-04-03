import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";

// redux
import { Provider } from "react-redux";
import { createStore } from "redux";
import reducer from "./utils/redux/reducers/rootReducers";

import "./index.css";
import App from "./App";
import Auth0ProviderWithHistory from "./auth/auth0-provider-with-history";

const store = createStore(reducer);

ReactDOM.render(
  <Router basename="/index.html">
    <Auth0ProviderWithHistory>
      <Provider store={store}>
        <App />
      </Provider>
    </Auth0ProviderWithHistory>
  </Router>,
  document.getElementById("root")
);
