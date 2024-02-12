const mongoose = require("mongoose");
const Category = require("./models/Category");

mongoose.connect("mongodb://localhost:27017/expense-tracker-db");

const categories = [
  { name: "Housing", icon: "/home.png" },
  { name: "Utilities", icon: "/bill.png" },
  { name: "Groceries", icon: "/groceries.png" },
  { name: "Shopping", icon: "/shopping-bag.png" },
];

Category.deleteMany({})
  .then((cat) => {
    Category.insertMany(categories)
      .then((cat) => {
        console.log(cat);
        mongoose.connection.close();
      })
      .catch((err) => {
        console.error("Error populating categories:", err);
        mongoose.connection.close();
      });
  })
  .catch((err) => {
    console.error("Error populating categories:", err);
    mongoose.connection.close();
  });
