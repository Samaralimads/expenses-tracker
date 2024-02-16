const router = require("express").Router();
const Transaction = require("../models/Transaction");
const Category = require("../models/Category");

// GET /api/transactions
// Get all transactions of the current user, sorted by date
router.get("/", async (req, res, next) => {
  try {
    //look in transaction collectionif userId matches ID of authenticated user
    const transactions = await Transaction.find({ userId: req.user.id }).sort({
      date: "desc",
    });
    res.json(transactions);
  } catch (err) {
    next(err);
  }
});

// GET /api/transactions/:categoryId
// Get transactions filtered by category
router.get("/category/:categoryId", async (req, res, next) => {
  try {
    const categoryId = req.params.categoryId;
    const transactions = await Transaction.find({
      userId: req.user._id,
      category: categoryId,
    });
    res.json(transactions);
  } catch (err) {
    next(err);
  }
});

// GET /api/transactions/:id
// Get a specific transaction of the current user
router.get("/:id", async (req, res) => {
  try {
    const transaction = await Transaction.findOne({
      _id: req.params.id,
      userId: req.user.id,
    });
    if (!transaction) {
      return res.status(404).json({ msg: "Transaction not found" });
    }
    res.json(transaction);
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ error: "Failed to retrieve one transaction" });
  }
});

// POST /api/transactions
// Add a new transaction
router.post("/", async (req, res, next) => {
  try {
    // Extract transaction data from request body
    const { description, amount, date, category, type } = req.body;

    //Find and extract the category ID from the category object
    const categoryObject = await Category.findOne({ _id: category });
    if (!categoryObject) {
      return res.status(400).json({ message: "Invalid category" });
    }
    const categoryId = categoryObject._id;

    // Create a new transaction object
    const newTransaction = new Transaction({
      description,
      amount,
      date,
      category,
      type,
      userId: req.user.id,
    });

    // Save the transaction to the database
    const transaction = await newTransaction.save();
    res.status(201).json({
      message: "New transaction created",
    });
  } catch (err) {
    next(err);
  }
});

// PUT /api/transactions/:id
// Updates a specific transaction
router.put("/:id", async (req, res, next) => {
  // Extract data from request body
  const { description, amount, date, category, type } = req.body;
  try {
    let transaction = await Transaction.findById(req.params.id);
    if (!transaction) {
      return res.status(404).json({ msg: "Transaction not found" });
    }
    if (transaction.userId.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }
    // Update the transaction with the provided data
    transaction = await Transaction.findByIdAndUpdate(
      req.params.id,
      { description, amount, date, category, type },
      { new: true } // Return the updated document
    );
    res.json(transaction);
  } catch (err) {
    next(err);
  }
});

// DELETE /api/transactions/:id
// Delete a transaction
router.delete("/:id", async (req, res, next) => {
  try {
    // Find the transaction by ID
    let transaction = await Transaction.findById(req.params.id);
    // Check if exists
    if (!transaction) {
      return res.status(404).json({ msg: "Transaction not found" });
    }
    // Check if belongs to the authenticated user
    if (transaction.userId.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }
    await Transaction.findByIdAndDelete(req.params.id);
    res.json({ msg: "Transaction deleted" });
  } catch (err) {
    console.error(err.message);
    next(err);
  }
});

module.exports = router;
