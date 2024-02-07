require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const PORT = 5005;
const cors = require("cors");
const mongoose = require("mongoose");
const helmet = require("helmet");
const errorHandler = require("./middlewares/errorHandlerMiddleware");
const authMiddleware = require("./middlewares/authMiddleware");

// Import routes
const authRoutes = require("./routes/authRoutes");
const transactionRoutes = require("./routes/transactionRoutes");

//Import the provided files with JSON data
const User = require("./models/User");
const Transaction = require("./models/Transaction");
const Category = require("./models/Category");

//CONNECT TO DATABASE
mongoose
  .connect("mongodb://127.0.0.1:27017/expense-tracker-db")
  .then((x) => console.log(`Connected to Database: "${x.connections[0].name}"`))
  .catch((err) => console.error("Error connecting to MongoDB", err));

// INITIALIZE EXPRESS APP
const app = express();

// MIDDLEWARE
app.use(helmet());
app.use(cors({ origin: ["http://localhost:5173"] }));
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//ROUTES
app.use("/api/auth", authRoutes); // Authentication routes
app.use("/api/transactions", authMiddleware, transactionRoutes); // Protected transaction routes (require authentication)

//ERROR HANDLING
app.use(errorHandler);

// START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
