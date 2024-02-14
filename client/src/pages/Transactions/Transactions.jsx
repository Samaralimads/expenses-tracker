import React, { useState, useEffect } from "react";
import "./Transactions.css";
import { Link } from "react-router-dom";
import myApi from "../../api/apiHandler";
import TransactionsList from "../../components/TransactionsList/TransactionsList";

function Transactions() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [transactions, setTransactions] = useState([]);

  const fetchCategories = async () => {
    try {
      const categoriesResponse = await myApi.get("/api/categories");
      setCategories(categoriesResponse.data);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchTransactions = async () => {
    try {
      const transactionsResponse = await myApi.get("/api/transactions");
      setTransactions(transactionsResponse.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchTransactions();
    fetchCategories();
  }, []);

  const handleCategoryClick = async (categoryId) => {
    try {
      if (categoryId === selectedCategory) {
        const transactionsResponse = await myApi.get("/api/transactions");
        setTransactions(transactionsResponse.data);
        setSelectedCategory(null);
      } else {
        const response = await myApi.get(
          `/api/transactions/category/${categoryId}`
        );
        setTransactions(response.data);
        setSelectedCategory(categoryId);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="main-content">
      <h2>Categories</h2>
      <div className="categories-container">
        {categories.length > 0 &&
          categories.map((category) => (
            <button
              className="category-button"
              key={category._id}
              onClick={() => handleCategoryClick(category._id)}
            >
              <img src={category.icon} alt={category.name} />
              {category.name}
            </button>
          ))}
        <Link to="/transactions/create" style={{ textDecoration: "none" }}>
          <button className="create-transaction-button">
            <img src="/add.png" alt="Create Transaction" />
            Add New Transaction
          </button>
        </Link>
      </div>

      {/* Transactions*/}
      <TransactionsList
        transactions={transactions}
        setTransactions={setTransactions}
        categories={categories}
      />
    </div>
  );
}

export default Transactions;
