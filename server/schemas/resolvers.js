// serve the response for the query here

const resolvers = {
    Query: {
        helloWorld: () => {
            return "Hello World!";
        }
    }
};

module.exports = resolvers;