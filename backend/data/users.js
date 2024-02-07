const bcrypt = require("bcryptjs");

const User = [
  {
    name: "admin",
    email: "admin@gmail.com",
    password: bcrypt.hashSync("12345465", 10),
    role: "Admin",
  },
  {
    name: "infoteck",
    email: "infoteck@gmail.com",
    password: bcrypt.hashSync("123243343", 10),
  },
  {
    name: "user",
    email: "user@gmail.com",
    password: bcrypt.hashSync("12424345", 10),
  },
];
module.exports = User;
