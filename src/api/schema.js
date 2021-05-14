const { gql } = require("apollo-server");

const schema = gql`
  type Grudge {
    id: String!
    title: String!
    who: String!
    when: Float
    forgiven: Boolean
  }

  input ForgiveInput {
    id: String
    forgiven: Boolean
  }

  input AddGrudgeInput {
    title: String!
    who: String!
  }

  type Query {
    grudges: [Grudge]
    grudgeById(id: String!): Grudge
  }

  type Mutation {
    addGrudge(input: AddGrudgeInput): Grudge
    forgive(input: ForgiveInput): Grudge
    delete(id: String): String
  }

  type Subscription {
    forgiven: Grudge
    added: Grudge
    deleted: String
  }
`;

module.exports = schema;
