// serve the response for the query here
const { User, Thought } = require("../models");

// built in error handling
const { AuthenticationError } = require("apollo-server-express");

// import signToken function
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    // get all users
    users: async () => {
      return User.find()
        .select("-__v -password")
        .populate("friends")
        .populate("thoughts");
    },
    // get user by username
    user: async (parent, { username }) => {
      return (
        User.findOne({ username })
          // Both of them will omit the Mongoose-specific __v property and the user's password information, which doesn't ever have to return anyway.
          .select("-__v -password")
          .populate("friends")
          .populate("thoughts")
      );
    },
    // parent is used as a placeholder to access the name argument from the second parameter
    thoughts: async (parent, { username }) => {
      // We use a ternary operator to check if username exists. If it does, we set params to an object with a username key set to that value.
      const params = username ? { username } : {};
      // then pass object , if there's data it'll be looked up by a specific username
      return Thought.find(params).sort({ createdAt: -1 });
    },
    // function to find a single thought
    thought: async (parent, { _id }) => {
      return Thought.findOne({ _id });
    },
  },
  Mutation: {
    // Mongoose User model creates a new user in db with whatever is passed in as the args
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("Incorrect credentials");
      }
      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);
      return { token, user };
    },
  },
};

module.exports = resolvers;

// // With this updated resolver function, we are now using the parameters to which the apollo-server library passes argument data so we can have a more dynamic interaction with our server. A resolver can accept four arguments in the following order:

// parent: This is if we used nested resolvers to handle more complicated actions, as it would hold the reference to the resolver that executed the nested resolver function. We won't need this throughout the project, but we need to include it as the first argument.

// args: This is an object of all of the values passed into a query or mutation request as parameters. In our case, we destructure the username parameter out to be used.

// context: This will come into play later. If we were to need the same data to be accessible by all resolvers, such as a logged-in user's status or API access token, this data will come through this context parameter as an object.

// info: This will contain extra information about an operation's current state. This isn't used as frequently, but it can be implemented for more advanced uses.
