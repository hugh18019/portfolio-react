import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

// redux
import { Provider } from "react-redux";
import { createStore } from "redux";
import reducer from "./utils/redux/reducers/rootReducers";

import "./index.css";
import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";

const store = createStore(reducer);

ReactDOM.render(
  <Auth0Provider
    domain={process.env.REACT_APP_AUTH0_DOMAIN}
    clientId={process.env.REACT_APP_AUTH0_CLIENT_ID}
    redirectUri={window.location.origin}
    audience={"https://whispering-chamber-76792.herokuapp.com/"}
  >
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </Auth0Provider>,
  document.getElementById("root")
);
