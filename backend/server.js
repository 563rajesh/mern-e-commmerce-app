const exprees = require("express");
const { errorHandler } = require("./middlewares/errorMiddleware");
require("colors");
const dotenv = require("dotenv");
const connectDb = require("./config/config");
const productRoutes = require("./routes/ProductsRoute");
const usersController = require("./routes/usersRoutes");
const orderRoute = require("./routes/orderRoute");

//dotenv config
dotenv.config();
//connecting database
connectDb();

const app = exprees();
app.use(exprees.json());
app.get("/", (req, res) => {
  res.json("welcom to node server");
});
app.use("/api", productRoutes);
app.use("/api/users", usersController);
app.use("/api/orders", orderRoute);
app.get("/api/config/paypal", (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID);
});
app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log(
    `server running in ${process.env.NODE_ENV} mode on ${process.env.PORT} port`
      .inverse
  );
});
