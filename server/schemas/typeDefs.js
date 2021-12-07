// import the gql tagged template function
const { gql } = require('apollo-server-express');

// create our typeDefs Tagged templates are an advanced use of temperate literals
const typeDefs = gql `
type Query {
    helloWorld: String
}`;

// export the typeDefs
module.exports = typeDefs;