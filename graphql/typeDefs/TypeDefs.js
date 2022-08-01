const { ApolloServer, gql } = require("apollo-server");

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  type Product {
    id: ID
    name: String!
    description: String!
    price: Int!
    createdAt: String
    updatedAt: String
  }
  type User {
    id: ID!
    name: String!
    email: String!
    password: String!
    role: String!
    friends: [User]
  }
  type Token {
    value: String
  }
  enum hasPhone {
    Yes
    No
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    getProducts: [Product]
    ProductById(id: String!): Product
    users(phone: hasPhone): [User]
    findUser(name: String!): User
    getUsers: [User]
    currentUser: User
  }
  type Mutation {
    addProduct(name: String!, description: String!, price: Int!): Product
    updateProduct(
      id: String!
      name: String
      description: String
      price: Int
    ): Product
    deleteProduct(id: String!): Product
    addSeedProducts: [Product]
    addSeedUsers: [User]
    registerUser(name: String!, email: String!, password: String!): User
    loginUser(email: String!, password: String!): Token
  }
`;

module.exports = typeDefs;
