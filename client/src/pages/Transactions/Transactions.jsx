import React, { useState, useEffect } from "react";
import "./Transactions.css";
import myApi from "../../api/apiHandler";

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
    <div>
      <div>
        {categories.length > 0 &&
          categories.map((category) => (
            <button
              key={category._id}
              onClick={() => handleCategoryClick(category._id)}
            >
              <img src={category.icon} alt={category.name} />
              {category.name}
            </button>
          ))}
      </div>

      <div>
        {/* Display transactions */}
        {currentTransactions.map((transaction) => (
          <div key={transaction._id}>
            <img
              src={getCategoryIcon(transaction.category)}
              alt={transaction.description}
            />
            <div>{transaction.description}</div>
            <div>{new Date(transaction.date).toLocaleDateString()}</div>
            <div>$ {transaction.amount}</div>
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
