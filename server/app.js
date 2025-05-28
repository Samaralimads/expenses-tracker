require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const PORT = process.env.PORT || 5001;
const cors = require("cors");
const mongoose = require("mongoose");
const helmet = require("helmet");
const errorHandler = require("./middlewares/errorHandlerMiddleware");
const authMiddleware = require("./middlewares/authMiddleware");

// Import routes
const authRoutes = require("./routes/authRoutes");
const transactionRoutes = require("./routes/transactionRoutes");
const categoryRoutes = require("./routes/categoryRoutes");

//Import the provided files with JSON data
const User = require("./models/User");
const Transaction = require("./models/Transaction");
const Category = require("./models/Category");

//CONNECT TO DATABASE
mongoose
  .connect(process.env.MONGO_URL)
  .then((x) => {
    console.log(`Connected to Database: "${x.connections[0].name}"`);

    // INITIALIZE EXPRESS APP
    const app = express();

    // MIDDLEWARE
    app.use(helmet());
    app.use(cors({ origin: [process.env.FRONTEND_ORIGIN_URL] }));
    app.use(express.json());
    app.use(morgan("dev"));
    app.use(express.static("public"));
    app.use(express.urlencoded({ extended: false }));
    app.use(cookieParser());

    //ROUTES
    app.use("/api/auth", authRoutes);
    app.use("/api/transactions", authMiddleware, transactionRoutes);
    app.use("/api/categories", categoryRoutes);

    //ERROR HANDLING
    app.use(errorHandler);

    // START SERVER
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });
