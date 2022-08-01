const bcrypt = require("bcryptjs");

const products = [
  {
    id: "1",
    name: "steamroller",
    description: "steamroller's for bakery industries",
    price: 500,
  },
  {
    id: "2",
    name: "steamroller",
    description: "steamroller's for bakery industries",
    price: 350,
  },
  {
    id: "3",
    name: "steamroller",
    description: "steamroller's for bakery industries",
    price: 70,
  },
  {
    id: "4",
    name: "steamroller",
    description: "steamroller's for bakery industries",
    price: 800,
  },
  {
    id: "5",
    name: "steamroller",
    description: "steamroller's for bakery industries",
    price: 50,
  },
  {
    id: "6",
    name: "steamroller",
    description: "steamroller's for bakery industries",
    price: 100,
  },
];

const users = [
  {
    id: "1",
    name: "Luis perez",
    email: "perezluis@google.com",
    password: bcrypt.hashSync("123456"),
    friends: [],
    role: "admin",
    phone: "+1 4587 2458 1254",
  },
  {
    id: "2",

    name: "Dessiret Almeida",
    email: "dessiret@google.com",
    password: bcrypt.hashSync("123456"),
    friends: [],
    friends: [],
    role: "client",
    phone: "+56 7458 5458",
  },
  {
    id: "3",
    name: "Vanessa Galicia",
    email: "vanessa@google.com",
    password: bcrypt.hashSync("123456"),
    friends: [],
    role: "client",
    phone: "",
  },
  {
    id: "4",
    name: "Stefanny Rosales",
    email: "stefanny@google.com",
    password: bcrypt.hashSync("123456"),
    friends: [],
    role: "client",
    phone: "",
  },
];

module.exports = { products, users };
