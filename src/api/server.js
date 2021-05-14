const { ApolloServer } = require("apollo-server");
const schema = require("./schema");
const resolvers = require("./resolvers");

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  subscriptions: {
    path: "/subscriptions",
    onConnect: () => {
      console.log("Connected!");
    },
    onDisconnect: () => {
      console.log("Disconnected!");
    },
  },
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
