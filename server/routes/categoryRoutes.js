const router = require("express").Router();
const Category = require("../models/Category");

// GET /api/categories
// Get all categories
router.get("/", async (req, res, next) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
