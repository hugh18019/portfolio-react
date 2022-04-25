import React from "react";
import { Routes, Route } from "react-router-dom";
import { useCookies } from "react-cookie";

import Navigation from "./components/Navigation";
import About from "./pages/About";
import Works from "./pages/Works";
import Contact from "./pages/Contact";
import Messages from "./pages/Messages";

import Login_auth0 from "./pages/Login/login_auth0";
import Logout_auth0 from "./pages/Logout/logout_auth0";
import Landing from "./pages/LandingPage";
import Footer from "./components/Footer";

import "./App.css";

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";

import { setContext } from "@apollo/client/link/context";

var httpLink;
var authLink;
var client;

function setup(cookies) {
  httpLink = createHttpLink({
    // uri: "http://localhost:3001/graphql", // for development
    // uri: "http://whispering-chamber-76792.herokuapp.com/graphql", // for deployment
    uri: process.env.REACT_APP_GRAPHQL_URI,
  });

  authLink = setContext((_, { headers }) => {
    const token = cookies.id_token;
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      },
    };
  });

  client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });
}

function App() {
  const [cookies, setCookie] = useCookies();
  setup(cookies);

  return (
    <ApolloProvider client={client}>
      <Navigation />
      <Routes>
        <Route exact path="/" element={<About />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/Work" element={<Works />} />
        <Route path="/Message" element={<Messages />} />
        <Route path="/Login" element={<Login_auth0 />} />
        <Route path="/logout" element={<Logout_auth0 />} />
        <Route path="/Landing" element={<Landing />} />
      </Routes>
      <Footer />
    </ApolloProvider>
  );
}

export default App;
