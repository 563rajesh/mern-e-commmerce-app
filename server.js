const express = require("express");
const path = require("path");
require("colors");
const { errorHandler } = require("./backend/middlewares/errorMiddleware");
const cookieParser = require("cookie-parser");
const connectDb = require("./backend/config/database");
const productsRoute = require("./backend/routes/productsRoute");
const usersRoute = require("./backend/routes/usersRoute");
const ordersRoute = require("./backend/routes/ordersRoute");
const fileUpload = require("express-fileupload");
const cloudinary = require("cloudinary");
const bodyParser = require("body-parser");

//dotenv config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config();
}

//connecting database
connectDb();
//connecting cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

app.use("/api", productsRoute);
app.use("/api", usersRoute);
app.use("/api", ordersRoute);

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
