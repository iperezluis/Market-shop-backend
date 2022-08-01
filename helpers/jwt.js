const jwt = require("jsonwebtoken");

const generateJWT = (uid) => {
  return new Promise((resolve, reject) => {
    const payload = { uid };
    jwt.sign(
      payload,
      process.env.JWT_KEY,
      {
        algorithm: "HS256",
        expiresIn: "3 days",
      },
      (err, token) => {
        if (err) {
          console.log(err);
          reject("No se puedo generar el JWT");
        } else {
          resolve(token);
        }
      }
    );
  });
};
const verifyJWT = (token = "") => {
  console.log("esto ews lo que recibe el verity", token);
  try {
    const { uid } = jwt.verify(token, process.env.JWT_KEY);
    console.log("esto es lo que devuelve el verify", uid);
    return uid;
  } catch (error) {
    console.log(error.message);
    return [false, null];
  }
};

module.exports = { generateJWT, verifyJWT };
