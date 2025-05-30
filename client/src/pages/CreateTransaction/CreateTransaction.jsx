import React, { useState, useEffect } from "react";
import myApi from "../../api/apiHandler";
import Alert from "@mui/material/Alert";
import CheckIcon from "@mui/icons-material/Check";

function CreateTransaction() {
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [categories, setCategories] = useState([]);
  const [isExpense, setIsExpense] = useState(false);
  const [isIncome, setIsIncome] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    myApi
      .get("/api/categories")
      .then((response) => {
        console.log("Fetched categories:", response.data); // ← Add this
        setCategories(response.data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  const handleExpenseChange = (checked) => {
    setIsExpense(checked);
    if (checked) {
      setIsIncome(false);
    }
  };

  const handleIncomeChange = (checked) => {
    setIsIncome(checked);
    if (checked) {
      setIsExpense(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let amountValue = parseFloat(amount);
      if (isExpense) {
        amountValue *= -1;
      }

      const transactionData = {
        description,
        category,
        amount: amountValue,
        date,
        type: isExpense ? "expense" : isIncome ? "income" : "unknown",
      };
      await myApi.post("/api/transactions", transactionData);

      // Clear form after
      setDescription("");
      setCategory("");
      setAmount("");
      setDate("");
      setIsExpense(false);
      setIsIncome(false);

      setSuccessMessage("Transaction has been successfully created.");
      setTimeout(() => {
        setSuccessMessage("");
      }, 4000);
    } catch (error) {
      console.error("Error adding transaction:", error);
    }
  };

  return (
    <div className="main-content">
      <div className="form-container">
        <h2 className="form-title">Add New Transaction</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Description:</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Category:</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Amount:</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Date:</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="expense">Is it an expense?</label>
            <input
              type="checkbox"
              checked={isExpense}
              id="expense"
              onChange={(e) => handleExpenseChange(e.target.checked)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="income">Is it an income?</label>
            <input
              type="checkbox"
              checked={isIncome}
              id="income"
              onChange={(e) => handleIncomeChange(e.target.checked)}
            />
          </div>
          <button type="submit" className="form-button">
            Add
          </button>
        </form>
        {successMessage && (
          <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
            {successMessage}
          </Alert>
        )}
      </div>
    </div>
  );
}

export default CreateTransaction;
