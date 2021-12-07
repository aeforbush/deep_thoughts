const jwt = require("jsonwebtoken");

const secret = "mysecretsshhhh";
const expiration = "2h";

// store JWT secrets in an env file
module.exports = {
    // expects a user object and adds a token to the properties
  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };

    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
