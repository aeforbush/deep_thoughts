// import the gql tagged template function
const { gql } = require("apollo-server-express");

// create our typeDefs Tagged templates are an advanced use of temperate literals
// custome data type with type Thoughts
const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    friendCount: Int
    thoughts: [Thought]
    friends: [User]
  }
  type Thought {
    _id: ID
    thoughtText: String
    createdAt: String
    username: String
    reactionCount: Int
    reactions: [Reaction]
  }
  type Reaction {
    _id: ID
    reactionBody: String
    createdAt: String
    username: String
  }

  type Query {
    users: [User]
    user(username: String!): User
    thoughts(username: String): [Thought]
    thought(_id: ID!): Thought
  }
`;

// export the typeDefs
module.exports = typeDefs;

//With this type, we define that a user will return all the data in their Mongoose model. Note that the friends field is an array that will be populated with data that also adheres to the User type, as a user's friends should follow the same data pattern as that user. Also notice the thoughts field is an array of Thought types. While we do in fact have to explicitly define most—if not all—data a GraphQL server works with, it isn't terribly hard for us to be able to share and reuse data types after we've created them.
