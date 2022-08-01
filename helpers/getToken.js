const { TokenExpiredError } = require("jsonwebtoken");
const { connect, disconnect } = require("../db/dbconfig");
const User = require("../models/User");
const { verifyJWT } = require("./jwt");

const getBearerToken = async (req) => {
  const auth = req ? req.headers.authorization : null;
  if (auth && auth.startsWith("Bearer")) {
    const token = auth.split(" ")[1];
    console.log({ token });
    const id = verifyJWT(token);
    try {
      await connect();
      const user = await User.findById(id);
      if (!user) throw new Error("no existe un usuario con ese id");
      await disconnect();
      console.log({ user });
      return { user };
    } catch (error) {
      await disconnect();
      console.log(error);
      return false;
    }
  }
};

module.exports = getBearerToken;
