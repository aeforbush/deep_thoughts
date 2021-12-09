import React from 'react';
// Provider sends data to all other components, Client is a constructor function/connect to GraphQL server, Cache response data for efficiency, Link controls how Client makes a req
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

import Header from './components/Header';
import Footer from './components/Footer';

import Home from './pages/Home';

// this creates graphql endpoint
const httpLink = createHttpLink({
  uri: '/graphql',
});

// this creates Apollo Client instance and connection to graphql API endpoint
const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

// passing the client variable in as the value for the client prop, everything between JSX tags will have access to the server's API data through client we set up.
function App() {
  return (
    <ApolloProvider client={client}>
    <div className='flex-column justify-flex-start min-100-vh'>
      <Header />
      <div className='container'>
        <Home />
      </div>
      <Footer />
    </div>
    </ApolloProvider>
  );
}

export default App;
