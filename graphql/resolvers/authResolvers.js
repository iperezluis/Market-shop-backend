const { UserInputError } = require("apollo-server");
const { connect, disconnect } = require("../../db/dbconfig");
const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const { users } = require("../../db/seed");
const { generateJWT } = require("../../helpers/jwt");

const startRegister = async (root, args) => {
  try {
    const { name, email, password } = args;
    if (name.trim().length < 3) {
      throw new UserInputError("Error: name should have at leats 3 words", {
        invalidArgs: args.name,
      });
    }
    if (password.trim().length < 5) {
      throw new UserInputError("Error: password should have minimum digit 5", {
        invalidArgs: args.password,
      });
    }
    await connect();
    const checkMail = await User.findOne({ email });
    if (checkMail) {
      await disconnect();
      throw new UserInputError("Ese email ya existe", {
        invalidArgs: args.email,
      });
    }
    const user = new User({ ...args, role: "client" });
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);

    await user.save();
    //let's generate jwt
    const token = await generateJWT(user.id);

    await disconnect();
    return user;
  } catch (error) {
    console.log(error);
    throw new UserInputError(error.message);
  }
};
const startLogin = async (root, args) => {
  try {
    const { email, password } = args;
    if (!email.trim()) {
      throw new UserInputError("Error: field name is emphty", {
        invalidArgs: args.name,
      });
    }
    if (!password.trim()) {
      throw new UserInputError("Error: field password is emphty", {
        invalidArgs: args.password,
      });
    }
    await connect();
    const user = await User.findOne({ email });
    if (!user) {
      await disconnect();
      throw new UserInputError("Ese email no existe", {
        invalidArgs: args.email,
      });
    }
    const verifyPass = bcrypt.compareSync(password, user.password);
    if (!verifyPass) {
      throw new UserInputError("Datos incorrectos", {
        invalidArgs: args.password,
      });
    }
    await disconnect();
    const token = await generateJWT(user.id);
    console.log(token);
    return {
      value: token,
    };
  } catch (error) {
    await disconnect();
    console.log(error);
    throw new Error(error.message);
  }
};

const startFillUserDB = async () => {
  try {
    await connect();
    await User.deleteMany();
    const seedUsers = await User.insertMany(users);
    await disconnect();
    return seedUsers;
  } catch (error) {
    await disconnect();
    console.log(error);
  }
};
module.exports = { startRegister, startLogin, startFillUserDB };
