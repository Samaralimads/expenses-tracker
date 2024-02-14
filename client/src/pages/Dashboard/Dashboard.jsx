import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import TransactionsList from "../../components/TransactionsList/TransactionsList";
import myApi from "../../api/apiHandler";

function Dashboard() {
  const [transactions, setTransactions] = useState([]);
  const [categories, setCategories] = useState([]);

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
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchTransactionsAndCategories();
  }, []);

  return (
    <div>
      <TransactionsList
        transactions={transactions}
        categories={categories}
        setTransactions={setTransactions}
      />
    </div>
  );
}

export default Dashboard;
