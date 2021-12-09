const jwt = require("jsonwebtoken");

const secret = "mysecretsshhhh";
const expiration = "2h";

// store JWT secrets in an env file
module.exports = {
    // middleware function to add header to query parameters
    authMiddleware: function({ req }) {
        // allows token to be sent via body.rq, req.query, or headers
        let token = req.body.token || req.query.token || req.headers.authorization;
        // console.log(token)
        // serparate "Bearer" from "<tokenvalue>"
        if (req.headers.authorization) {
            token = token
            .split(' ')
            .pop()
            .trim();
        }
        // if no token, return request object as is
        if(!token) {
            return req;
        }
        // try... catch statement to mute the error
        try {
            // decode and attach user data to request object
            const { data } = jwt.verify(token, secret, { maxAge: expiration })
            req.user = data;
        } catch {
            console.log('Invalid token');
        }
        // return updated request object
        return req;
    },
    // expects a user object and adds a token to the properties
  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };

    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
