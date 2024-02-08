const errorHandler = (err, req, res, next) => {
  console.error("Error:", err.stack);

  // Check if the error is a custom application error with a defined status code
  if (err.statusCode) {
    return res.status(err.statusCode).json({ message: err.message });
  }

  // If the error is not a custom application error, return a generic 500 status code
  res.status(500).json({ message: "Internal Server Error" });
};

module.exports = errorHandler;
