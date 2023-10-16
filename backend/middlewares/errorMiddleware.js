const errorHandler = (error, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : statusCode;
  res.json({
    message: error.message,
    stack: process.env.NODE_ENV === "Production" ? null : error.stack,
  });
};

module.exports = { errorHandler };
