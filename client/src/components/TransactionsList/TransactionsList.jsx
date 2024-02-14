import "./TransactionsList.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Fab from "@mui/material/Fab";
import EditIcon from "@mui/icons-material/Edit";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDropDown";
import ArrowUpwardIcon from "@mui/icons-material/ArrowDropUp";

function TransactionsList({ categories, transactions, setTransactions }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [transactionsPerPage] = useState(10);
  const [sortDateAsc, setSortDateAsc] = useState(true);
  const [sortAmountAsc, setSortAmountAsc] = useState(true);
  const navigate = useNavigate();

  const getCategoryIcon = (categoryId) => {
    const category = categories.find((cat) => cat._id === categoryId);
    return category ? category.icon : "";
  };

  const handleEditClick = (transactionId) => {
    navigate(`/transactions/edit/${transactionId}`);
  };

  const sortByDate = () => {
    const sortedTransactions = [...transactions].sort((a, b) => {
      if (sortDateAsc) {
        return new Date(a.date) - new Date(b.date);
      } else {
        return new Date(b.date) - new Date(a.date);
      }
    });
    setTransactions(sortedTransactions);
    setSortDateAsc(!sortDateAsc);
  };

  const sortByAmount = () => {
    const sortedTransactions = [...transactions].sort((a, b) => {
      if (sortAmountAsc) {
        return a.amount - b.amount;
      } else {
        return b.amount - a.amount;
      }
    });
    setTransactions(sortedTransactions);
    setSortAmountAsc(!sortAmountAsc);
  };

  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
  const currentTransactions = transactions.slice(
    indexOfFirstTransaction,
    indexOfLastTransaction
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="transactions-container">
      <table className="transactions-table">
        <thead>
          <tr>
            <th>Category</th>
            <th>Description</th>
            <th onClick={sortByDate}>
              Date {sortDateAsc ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />}
            </th>
            <th>Type</th>
            <th onClick={sortByAmount}>
              Amount{" "}
              {sortAmountAsc ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />}
            </th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {currentTransactions.map((transaction) => (
            <tr key={transaction._id}>
              <td>
                <img
                  src={getCategoryIcon(transaction.category)}
                  alt={transaction.description}
                />
              </td>
              <td>{transaction.description}</td>
              <td>{new Date(transaction.date).toLocaleDateString()}</td>
              <td>{transaction.type}</td>
              <td>€ {transaction.amount.toFixed(2)}</td>
              <td>
                <Fab
                  size="small"
                  color="action"
                  aria-label="edit"
                  onClick={() => handleEditClick(transaction._id)}
                >
                  <EditIcon />
                </Fab>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

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

export default TransactionsList;
