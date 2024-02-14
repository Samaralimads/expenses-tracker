import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import TransactionsList from "../../components/TransactionsList/TransactionsList";
import myApi from "../../api/apiHandler";

function Dashboard() {
  const [transactions, setTransactions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [totalBalance, setTotalBalance] = useState(0);

  useEffect(() => {
    const fetchTransactionsAndCategories = async () => {
      try {
        // Fetch transactions
        const transactionsResponse = await myApi.get("/api/transactions");
        const transactionsData = transactionsResponse.data;
        setTransactions(transactionsData);

        // Fetch categories
        const categoriesResponse = await myApi.get("/api/categories");
        const categoriesData = categoriesResponse.data;
        setCategories(categoriesData);

        // Calculate total income, total expenses, and total balance
        let income = 0;
        let expenses = 0;

        transactionsData.forEach((transaction) => {
          if (transaction.type === "income") {
            income += transaction.amount;
          } else if (transaction.type === "expense") {
            expenses += transaction.amount;
          }
        });
        setTotalIncome(income);
        setTotalExpenses(expenses);
        setTotalBalance(income - expenses);
      } catch (error) {
        console.log(error);
      }
    };

    fetchTransactionsAndCategories();
  }, []);

  return (
    <div className="main-content">
      <section className="statistics">
        <div>Total Balance: €{totalBalance.toFixed(2)}</div>
        <div>Total Income: € {totalIncome.toFixed(2)}</div>
        <div>Total Expenses: €{totalExpenses.toFixed(2)}</div>
      </section>
      <TransactionsList
        transactions={transactions}
        categories={categories}
        setTransactions={setTransactions}
      />
    </div>
  );
}

export default Dashboard;
