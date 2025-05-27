const mongoose = require("mongoose");
const Category = require("./models/Category");

mongoose.connect(
  process.env.MONGO_URL || "mongodb://localhost:27017/expense-tracker-db"
);

const categories = [
  { name: "Housing", icon: "/home1.png" },
  { name: "Utilities", icon: "/tools.png" },
  { name: "Groceries", icon: "ingredients.png" },
  { name: "Shopping", icon: "/shoppingBag.png" },
  { name: "Transportation", icon: "/car.png" },
  { name: "Entertainment", icon: "/entertainment.png" },
  { name: "Others", icon: "/other.png" },
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
