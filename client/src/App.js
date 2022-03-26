import React from "react";
import { Routes, Route } from "react-router-dom";

import Navigation from "./components/Navigation";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Messages from "./pages/Messages";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

import "./App.css";

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";

import { setContext } from "@apollo/client/link/context";
import Message from "./components/Message";

const httpLink = createHttpLink({
  uri: "http://localhost:3001/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Navigation />
      <Routes>
        <Route exact path="/" element={<About />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/Message" element={<Messages />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
      </Routes>
    </ApolloProvider>
  );
}

export default App;
