import React, { useState, useEffect } from "react";
import myApi from "../../api/apiHandler";
import { useNavigate, useParams } from "react-router-dom";
import CheckIcon from "@mui/icons-material/Check";
import Alert from "@mui/material/Alert";

function EditTransaction() {
  const [formState, setFormState] = useState({
    description: "",
    amount: "",
    date: "",
    category: "",
    type: "",
  });

  const [categories, setCategories] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const { transactionId } = useParams();
  const navigate = useNavigate();

  const fetchTransaction = async () => {
    try {
      const response = await myApi.get(`/api/transactions/${transactionId}`);
      const { description, amount, category, type, date } = response.data;
      // Convert date to the expected format
      const formattedDate = date.split("T")[0]; // Extracting yyyy-MM-dd from ISO string
      setFormState({
        description,
        amount,
        category,
        type,
        date: formattedDate,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await myApi.get("/api/categories");
      setCategories(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTransaction();
    fetchCategories();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await myApi.put(
        "/api/transactions/" + transactionId,
        formState
      );
      setSuccessMessage("Transaction has been successfully updated.");
      setTimeout(() => {
        setSuccessMessage("");
        navigate(`/transactions`);
      }, 3000);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await myApi.delete(`/api/transactions/${transactionId}`);
      setSuccessMessage("Transaction has been successfully deleted.");
      setTimeout(() => {
        setSuccessMessage("");
        navigate(`/transactions`);
      }, 2000);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (event) => {
    const { id, value } = event.target;
    setFormState({ ...formState, [id]: value });
  };

  return (
    <div className="main-content">
      <h2>Edit Transaction</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <input
            type="text"
            value={formState.description}
            onChange={handleChange}
            id="description"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="category">Category:</label>
          <select
            value={formState.category}
            onChange={handleChange}
            id="category"
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
          <label htmlFor="amount">Amount:</label>
          <input
            type="number"
            value={formState.amount}
            onChange={handleChange}
            id="amount"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="date">Date:</label>
          <input
            type="date"
            value={formState.date}
            onChange={handleChange}
            id="date"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="type">Type:</label>
          <select
            value={formState.type}
            onChange={handleChange}
            id="type"
            required
          >
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
        </div>
        <button type="submit">Save</button>
        <button type="button" onClick={handleDelete}>
          Delete
        </button>
      </form>
      <div className="Sucess-alert">
        {successMessage && (
          <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
            {successMessage}
          </Alert>
        )}
      </div>
    </div>
  );
}

export default EditTransaction;
