const bcrypt = require("bcryptjs");

const User = [
  {
    name: "admin",
    email: "admin@gmail.com",
    password: bcrypt.hashSync("1234546", 10),
    isAdmin: true,
  },
  {
    name: "infoteck",
    email: "infoteck@gmail.com",
    password: bcrypt.hashSync("123243", 10),
  },
  {
    name: "user",
    email: "user@gmail.com",
    password: bcrypt.hashSync("124243", 10),
  },
];
module.exports = User;
