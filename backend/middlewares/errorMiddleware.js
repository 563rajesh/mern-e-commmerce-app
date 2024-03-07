const errorHandler = (err, req, res, next) => {
  res.statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.statusCode = res.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  //wrong mongodb Id Error
  if (err.name === "CastError") {
    res.statusCode = 400;
    err.message = `Resource not found. Invalid: ${err.path}`;
  }

  // Duplicate Key Error
  if (err.code === 11000) {
    res.statusCode = 400;
    err.message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
  }

  // Wrong JWT error
  if (err.name === "JsonWebTokenError") {
    res.statusCode = 400;
    err.message = `Json Web Token is invalid, Try again `;
  }

  // JWT EXPIRE error
  if (err.name === "TokenExpiredError") {
    res.statusCode = 400;
    err.message = `Json Web Token is Expired, Try again `;
  }

  res.status(res.statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};
module.exports = { errorHandler };
