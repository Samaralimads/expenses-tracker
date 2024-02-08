const router = require("express").Router();
const authMiddleware = require("../middlewares/authMiddleware");
const Transaction = require("../models/Transaction");

// GET /api/transactions
// Get all transactions of the current user
router.get("/transactions", authMiddleware, async (req, res, next) => {
  try {
    const transactions = await Transaction.find({ userId: req.user.id });
    res.json(transactions);
  } catch (err) {
    next(err);
  }
});

// GET /api/transactions/:id
// Get a specific transaction of the current user
router.get("/transactions/:id", authMiddleware, async (req, res) => {
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
router.post("/transactions", authMiddleware, async (req, res, next) => {
  try {
    const { description, amount, date, category } = req.body;
    const newTransaction = new Transaction({
      description,
      amount,
      date,
      category,
      userId: req.user.id,
    });
    const transaction = await newTransaction.save();
    res.status(201).json({
      message: "New transaction created",
    });
  } catch (err) {
    next(err);
  }
});

// PUT /api/transactions/:id
// Updates transaction
router.put("/transactions/:id", authMiddleware, async (req, res, next) => {
  const { description, amount, date, category } = req.body;
  try {
    let transaction = await Transaction.findById(req.params.id);
    if (!transaction) {
      return res.status(404).json({ msg: "Transaction not found" });
    }
    if (transaction.userId.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }
    transaction = await Transaction.findByIdAndUpdate(
      req.params.id,
      { $set: { description, amount, date, category } },
      { new: true }
    );
    res.json(transaction);
  } catch (err) {
    next(err);
  }
});

// DELETE /api/transactions/:id
// Delete a transaction
router.delete("/transactions/:id", authMiddleware, async (req, res, next) => {
  try {
    let transaction = await Transaction.findById(req.params.id);
    if (!transaction) {
      return res.status(404).json({ msg: "Transaction not found" });
    }
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
