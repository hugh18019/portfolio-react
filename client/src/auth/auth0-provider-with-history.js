import React from "react";
import { useNavigate } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";

const Auth0ProviderWithHistory = ({ children }) => {
  const domain = process.env.REACT_APP_AUTH0_DOMAIN;
  const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;
  const history = useNavigate();
  const audience = process.env.REACT_APP_AUTH0_AUDIENCE; // for development
  const onRedirectCallback = (appState) => {
    history.push(
      appState && appState.targetUrl
        ? appState.targetUrl
        : // : (window.location.href = "http://localhost:3000/Landing")    // for development
          (window.location.path =
            "https://whispering-chamber-76792.herokuapp.com/Landing") // for deployment
    );
  };

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      redirectUri={window.location.origin}
      onRedirectCallback={onRedirectCallback}
      audience={audience}
    >
      {children}
    </Auth0Provider>
  );
};

export default Auth0ProviderWithHistory;
