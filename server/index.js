const { ApolloServer, gql, UserInputError } = require("apollo-server");
// const { v1: uuid } = require("uuid");

const {
  startRegister,
  startFillUserDB,
  startLogin,
} = require("../graphql/resolvers/authResolvers");
const {
  startFillDB,
  startGetProducts,
  startGetUsers,
  getUserByName,
  startAddProduct,
  startDeleteProduct,
  startUpdateProduct,
  getProductById,
} = require("../graphql/resolvers/productResolvers");
const typeDefs = require("../graphql/typeDefs/TypeDefs");
const getBearerToken = require("../helpers/getToken");

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
  Query: {
    getProducts: async (root, args) => {
      const allProducts = await startGetProducts(root, args);
      return allProducts;
    },
    ProductById: async (root, args) => {
      const product = await getProductById(root, args);
      return product;
    },
    getUsers: async (root, args) => {
      const allUsers = await startGetUsers(root, args);
      return allUsers;
    },
    findUser: async (root, args) => {
      const userByname = await getUserByName(root, args);
      return userByname;
    },
    currentUser: (root, args, context) => {
      return context.user;
    },
  },
  Mutation: {
    addProduct: async (root, args, context) => {
      const newProduct = await startAddProduct(root, args, context);
      return newProduct;
    },
    updateProduct: async (root, args, context) => {
      const newUpdatedProduct = await startUpdateProduct(root, args, context);
      return newUpdatedProduct;
    },
    deleteProduct: async (root, args, context) => {
      await startDeleteProduct(root, args, context);
    },
    addSeedProducts: async () => {
      const seedProducts = await startFillDB();
      return seedProducts;
    },
    addSeedUsers: async () => {
      const seedUsers = await startFillUserDB();
      return seedUsers;
    },
    registerUser: async (root, args) => {
      const user = await startRegister(root, args);
      return user;
    },
    loginUser: async (root, args) => {
      const user = await startLogin(root, args);
      return user;
    },
  },
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  typeDefs,
  resolvers,
  //con esta request vamos a soliciatrla ne cada post delele y put de los resolvers igual que axios.config() solo que ahora usamoscontext de graphQL
  context: async ({ req }) => {
    // const { user } = await getBearerToken(req);
    // return user;
  },
  csrfPrevention: true,
  cache: "bounded",
});
// The `listen` method launches a web server.
server.listen(5000).then(() => {
  console.log(`🚀  Server ready at http://localhost:5000`);
});
