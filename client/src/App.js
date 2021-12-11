import React from "react";
// Provider sends data to all other components, Client is a constructor function/connect to GraphQL server, Cache response data for efficiency, Link controls how Client makes a req
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";

//  retrieve token from localStorage and include it with each API request
import { setContext } from "@apollo/client/link/context";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./pages/Login";
import NoMatch from "./pages/NoMatch";
import SingleThought from "./pages/SingleThought";
import Profile from "./pages/Profile";
import Signup from "./pages/Signup";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";

// this creates graphql endpoint
const httpLink = createHttpLink({
  uri: "/graphql",
});

const authLink = setContext((_, { header }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...header,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

// this creates Apollo Client instance and connection to graphql API endpoint
// combine authLink and httpLink so every request retrieves a token and sets the request headers before making an API request
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

// from snapcode
// const client = new ApolloClient({
//   uri: '/graphql'
// });

// passing the client variable in as the value for the client prop, everything between JSX tags will have access to the server's API data through client we set up.
function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="flex-column justify-flex-start min-100-vh">
          <Header />
          <div className="container">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/signup" component={Signup} />
              <Route exact path="/profile/:username?" component={Profile} />
              <Route exact path="/thought/:id" component={SingleThought} />

              <Route component={NoMatch} />
            </Switch>
          </div>
          <Footer />
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
