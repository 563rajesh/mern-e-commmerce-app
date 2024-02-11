const express = require("express");
const path = require("path");
require("colors");
const { errorHandler } = require("./backend/middlewares/errorMiddleware");
const cookieParser = require("cookie-parser");
const connectDb = require("./backend/config/database");
const productRoutes = require("./backend/routes/ProductsRoute");
const usersController = require("./backend/routes/usersRoutes");
const orderRoute = require("./backend/routes/orderRoute");

//dotenv config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config();
}

//connecting database
connectDb();

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use("/api", productRoutes);
app.use("/api", usersController);
app.use("/api", orderRoute);

//payment api
app.get("/api/config/paypal", (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID);
});

app.use(express.static(path.join(__dirname, "./frontend/build")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./frontend/build/index.html"));
});

//Middleware for error
app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log(
    `server running in ${process.env.NODE_ENV} mode on ${process.env.PORT} port`
      .inverse
  );
});