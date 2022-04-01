import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Navigation from './components/Navigation';
import About from './pages/About';
import Works from './pages/Works';
import Contact from './pages/Contact';
import Messages from './pages/Messages';

import Login_auth0 from './pages/Login/login_auth0';
import Logout_auth0 from './pages/Logout/logout_auth0';
import Landing from './pages/LandingPage';
import Footer from './components/Footer';

import './App.css';

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';

import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: 'http://localhost:3001/graphql', // for development
  // uri: "/graphql", // for deployment
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
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
        <Route exact path='/' element={<About />} />
        <Route path='/Contact' element={<Contact />} />
        <Route path='/Work' element={<Works />} />
        <Route path='/Message' element={<Messages />} />
        <Route path='/Login' element={<Login_auth0 />} />
        <Route path='/logout' element={<Logout_auth0 />} />
      </Routes>
      <Landing />
      <Footer />
    </ApolloProvider>
  );
}

export default App;
