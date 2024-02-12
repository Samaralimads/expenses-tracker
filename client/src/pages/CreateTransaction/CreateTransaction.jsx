import React, { useState, useEffect } from "react";
import "./CreateTransaction.css";
import myApi from "../../api/apiHandler";

function CreateTransaction() {
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [categories, setCategories] = useState([]);
  const [isExpense, setIsExpense] = useState(false);

  useEffect(() => {
    myApi
      .get("/api/categories")
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const transactionData = {
        description,
        category,
        amount: isExpense ? amount * -1 : amount, // Convert amount to negative value
        date,
      };
      await myApi.post("/api/transactions", transactionData);
      // Clear form after
      setDescription("");
      setCategory("");
      setAmount("");
      setDate("");
      //ADD LATER navigate the user to transactions page or show a success message
    } catch (error) {
      console.error("Error adding transaction:", error);
    }
  };

  return (
    <div className="create-transaction">
      <h2>Add New Transaction</h2>
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
            onChange={(e) => setIsExpense(!isExpense)}
          />
        </div>
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default CreateTransaction;
