const data = require("./data.json");
const { generateId } = require("../utilities/helpers");

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
      return newGrudge;
    },
    forgive: (_, { input }) => {
      const grudge = data.grudges.find(d => input.id === d.id);
      grudge.forgiven = input.forgiven;
      grudge.when = grudge.forgiven ? new Date().getTime() : 0;
      return grudge;
    },
    delete: (_, { id }) => {
      data.grudges = data.grudges.filter(f => f.id !== id);
      return id;
    },
  },
};

module.exports = resolvers;
