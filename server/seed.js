const mongoose = require("mongoose");
const Category = require("./models/Category");

mongoose.connect("mongodb://localhost:27017/expense-tracker-db");

const categories = [
  { name: "Housing", icon: "house_icon.png" },
  { name: "Utilities", icon: "bills_icon.png" },
  { name: "Groceries", icon: "groceries_icon.png" },
];

// Populate categories
Category.insertMany(categories)
  .then((cat) => {
    console.log(cat);
    console.log("Categories populated");
    mongoose.connection.close();
  })
  .catch((err) => {
    console.error("Error populating categories:", err);
    mongoose.connection.close();
  });
