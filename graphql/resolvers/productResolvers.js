const { UserInputError, AuthenticationError } = require("apollo-server");
const { isValidObjectId } = require("mongoose");
const { connect, disconnect } = require("../../db/dbconfig");
const { products } = require("../../db/seed");
const Product = require("../../models/Product");
const User = require("../../models/User");

const startFillDB = async () => {
  await connect();
  await Product.deleteMany();
  const seedProducts = await Product.insertMany(products);
  await disconnect();
  return seedProducts;
};

const startGetProducts = async (root, args) => {
  try {
    await connect();
    const allProducts = await Product.find();
    await disconnect();

    return allProducts;
  } catch (error) {
    await disconnect();
    console.log(error);
    throw new Error(error.message);
  }
};
const startGetUsers = async (root, args, context) => {
  const { user } = context;
  if (!user) throw new AuthenticationError("Not authenticated");
  try {
    await connect();
    const alUsers = await User.find();
    await disconnect();

    return alUsers;
  } catch (error) {
    await disconnect();
    console.log(error);
    throw new Error(error.message);
  }
};
const getUserByName = async (root, args) => {
  const { name } = args;
  try {
    await connect();
    const user = await User.findOne({ name }).lean();
    if (!user) {
      await disconnect();
      throw new Error("No existe un ususario con ese nombre");
    }
    await disconnect();
    console.log(user);
    return user;
  } catch (error) {
    await disconnect();
    console.log(error);
    return new Error(error.message);
  }
};
const startAddProduct = async (root, args, context) => {
  const { user } = context;
  if (!user) throw new AuthenticationError("Not authenticated");

  const { name, description, price = 0 } = args;
  if (name.length < 3) {
    throw new UserInputError(
      "Error: field name should have minimum charactere threes",
      {
        invalidArgs: args.name,
      }
    );
  }
  if (description.length < 7) {
    throw new UserInputError(
      "Error: field description should have minimum charactere sevens",
      {
        invalidArgs: args.description,
      }
    );
  }

  try {
    await connect();
    const product = new Product({ name, description, price });
    await product.save();
    await disconnect();
    console.log(product);
    return product;
  } catch (error) {
    await disconnect();
    console.log(error);
    return new Error(error.message);
  }
};
const startUpdateProduct = async (root, args, context) => {
  const { user } = context;
  if (!user) throw new AuthenticationError("Not authenticated");

  try {
    await connect();
    const { id, name, description, price } = args;

    if (!isValidObjectId(id)) {
      await disconnect();
      return new Error("No es un ID mongo valido");
    }

    const product = await Product.findById(id);
    product.name = name || product.name;
    product.description = description || product.description;
    product.price = price || product.price;
    await product.save();
    await disconnect();
    console.log(product);
    return product;
  } catch (error) {
    await disconnect();
    console.log(error.message);
    return new Error(error.message);
  }
};
const startDeleteProduct = async (root, args, context) => {
  const { user } = context;
  if (!user) throw new AuthenticationError("Not authenticated");

  const { id } = args;
  try {
    await connect();
    if (!isValidObjectId(id)) {
      await disconnect();
      return new Error("No es un ID mongo valido");
    }

    await Product.findByIdAndDelete(id);
    await disconnect();
  } catch (error) {
    await disconnect();
    console.log(error);
    return new Error(error.message);
  }
};
const getProductById = async (root, args, context) => {
  const { user } = context;
  if (!user) throw new AuthenticationError("Not authenticated");

  const { id } = args;
  try {
    await connect();
    if (!isValidObjectId(id)) {
      await disconnect();
      return new Error("No es un ID mongo valido");
    }

    const product = await Product.findById(id);
    if (!product) {
      await disconnect();
      throw new Error("No existe un product con ese nombre");
    }
    await disconnect();
    console.log(product);
    return product;
  } catch (error) {
    await disconnect();
    console.log(error);
    return new Error(error.message);
  }
};

module.exports = {
  startFillDB,
  startGetProducts,
  startGetUsers,
  getUserByName,
  startAddProduct,
  startUpdateProduct,
  startDeleteProduct,
  getProductById,
};
