const dotenv = require("dotenv");
const Order = require("./models/OrderModel");
const User = require("./models/UserModel");
const Product = require("./models/ProductModel");
const connectDb = require("./config/config");
const products = require("./data/products");
const users = require("./data/users");
require("colors");

dotenv.config();
connectDb();

const importData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    const createUser = await User.insertMany(users);
    const adminUser = createUser[0]._id;
    const sampleData = products.map((product) => {
      return { ...product, user: adminUser };
    });
    await Product.insertMany(sampleData);
    console.log("data imported".green.inverse);
    process.exit();
  } catch (error) {
    console.log(`${error}`.red.inverse);
    process.exit(-1);
  }
};

const dataDestroy = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();
    console.log("data destroyed".green.inverse);
    process.exit();
  } catch (error) {}
  console.log(`${error}`.red.inverse);
  process.exit(-1);
};

if (process.argv[2] === "-d") {
  dataDestroy();
} else {
  importData();
}
