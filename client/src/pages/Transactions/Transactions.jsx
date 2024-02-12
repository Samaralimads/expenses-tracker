import React, { useState, useEffect } from "react";
import "./Transactions.css";
import myApi from "../../api/apiHandler";
import { Link } from "react-router-dom";

function Transactions() {
  const [categories, setCategories] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [transactionsPerPage] = useState(10);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriesResponse = await myApi.get("/api/categories");
        setCategories(categoriesResponse.data);

        const transactionsResponse = await myApi.get("/api/transactions");
        setTransactions(transactionsResponse.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const handleCategoryClick = async (categoryId) => {
    try {
      const response = await myApi.get(`/api/transactions/${categoryId}`);
      setTransactions(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getCategoryIcon = (categoryId) => {
    const category = categories.find((cat) => cat._id === categoryId);
    return category ? category.icon : "";
  };

  // Pagination
  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
  const currentTransactions = transactions.slice(
    indexOfFirstTransaction,
    indexOfLastTransaction
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
            <img src="/plus.png" alt="Create Transaction" />
            Add New Transaction
          </button>
        </Link>
      </div>

      <h2>Transactions</h2>
      <div className="transaction-container">
        {currentTransactions.map((transaction) => (
          <div className="transaction-item" key={transaction._id}>
            <img
              src={getCategoryIcon(transaction.category)}
              alt={transaction.description}
            />
            <div>{transaction.description}</div>
            <div>{new Date(transaction.date).toLocaleDateString()}</div>
            <div>€ {transaction.amount}</div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div>
        {transactions.length > transactionsPerPage && (
          <ul className="pagination">
            {Array.from({
              length: Math.ceil(transactions.length / transactionsPerPage),
            }).map((_, index) => (
              <li
                key={index}
                className={currentPage === index + 1 ? "active" : null}
              >
                <button onClick={() => paginate(index + 1)}>{index + 1}</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Transactions;
