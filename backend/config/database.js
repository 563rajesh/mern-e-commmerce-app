const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    mongoose.connect(
      process.env.DATABASE_URI,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      },
      () =>
        console.log(
          `Mongodb connected with server: ${mongoose.connection.host}`.yellow
        )
    );
  } catch (error) {
    console.error(`Error:${error.message}`.red);
    process.exit(-1);
  }
};

module.exports = connectDb;
