const data = require("./data.json");
const { generateId } = require("../utilities/helpers");
const { PubSub } = require("apollo-server");

const pubsub = new PubSub();

const resolvers = {
  Query: {
    grudges: () => {
      return data.grudges;
    },
    grudgeById: (_, { id }) => {
      return data.grudges.find(d => id === d.id);
    },
  },
  Mutation: {
    addGrudge: (_, { input }) => {
      const newGrudge = { ...input };
      newGrudge.id = generateId();
      newGrudge.when = 0;
      newGrudge.forgiven = false;

      data.grudges.push(newGrudge);
      pubsub.publish("GRUDGE_ADDED", {
        added: newGrudge,
      });
      return newGrudge;
    },
    forgive: (_, { input }) => {
      const grudge = data.grudges.find(d => input.id === d.id);
      grudge.forgiven = input.forgiven;
      grudge.when = grudge.forgiven ? new Date().getTime() : 0;

      pubsub.publish("GRUDGE_FORGIVEN", {
        forgiven: grudge,
      });

      return grudge;
    },
    delete: (_, { id }) => {
      data.grudges = data.grudges.filter(f => f.id !== id);
      pubsub.publish("GRUDGE_DELETED", {
        deleted: id,
      });
      return id;
    },
  },
  Subscription: {
    deleted: {
      subscribe: () => pubsub.asyncIterator(["GRUDGE_DELETED"]),
    },
    forgiven: {
      // More on pubsub below
      subscribe: () => pubsub.asyncIterator(["GRUDGE_FORGIVEN"]),
    },
    added: {
      // More on pubsub below
      subscribe: () => pubsub.asyncIterator(["GRUDGE_ADDED"]),
    },
  },
};

module.exports = resolvers;
