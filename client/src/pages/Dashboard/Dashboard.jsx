import "./Dashboard.css";
import React, { useState, useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import TransactionsList from "../../components/TransactionsList/TransactionsList";
import myApi from "../../api/apiHandler";

function Dashboard() {
  const [transactions, setTransactions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [totalBalance, setTotalBalance] = useState(0);
  const lineChartRef = useRef(null);
  const pieChartRef = useRef(null);

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

  //CHARTS
  const prepareLineChartData = () => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const incomeByMonth = Array(12).fill(0);

    transactions.forEach((transaction) => {
      if (transaction.type === "income") {
        const monthIndex = new Date(transaction.date).getMonth();
        incomeByMonth[monthIndex] += transaction.amount;
      }
    });

    return {
      labels: months,
      datasets: [
        {
          label: "Income",
          data: incomeByMonth,
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },
      ],
    };
  };

  const preparePieChartData = () => {
    const expensesByCategory = {};
    categories.forEach((category) => {
      expensesByCategory[category.name] = 0;
    });

    transactions.forEach((transaction) => {
      if (transaction.type === "expense") {
        const categoryName = categories.find(
          (cat) => cat._id === transaction.category
        )?.name;
        if (categoryName) {
          expensesByCategory[categoryName] += transaction.amount;
        }
      }
    });

    return {
      labels: Object.keys(expensesByCategory),
      datasets: [
        {
          label: "Expenses",
          data: Object.values(expensesByCategory),
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
            "rgba(255, 99, 132, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
            "rgba(255, 99, 132, 1)",
          ],
          borderWidth: 1.5,
        },
      ],
    };
  };

  useEffect(() => {
    const lineChartContext = lineChartRef.current.getContext("2d");
    if (lineChartRef.current.chart) {
      lineChartRef.current.chart.destroy(); // Destroy existing chart
    }
    lineChartRef.current.chart = new Chart(lineChartContext, {
      type: "line",
      data: prepareLineChartData(),
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });

    const pieChartContext = pieChartRef.current.getContext("2d");
    if (pieChartRef.current.chart) {
      pieChartRef.current.chart.destroy(); // Destroy existing chart instance
    }
    pieChartRef.current.chart = new Chart(pieChartContext, {
      type: "pie",
      data: preparePieChartData(),
    });
  }, [transactions, categories]);

  return (
    <div className="main-content">
      <div className="statistics">
        <div className="statistic-card">
          Total Balance: €{totalBalance.toFixed(2)}
        </div>
        <div className="statistic-card">
          Total Income: €{totalIncome.toFixed(2)}
        </div>
        <div className="statistic-card">
          Total Expenses: €{totalExpenses.toFixed(2)}
        </div>
      </div>
      <div className="charts">
        <div className="chart-container">
          <canvas ref={lineChartRef} />
        </div>
        <div className="chart-container">
          <canvas ref={pieChartRef} />
        </div>
      </div>
      <TransactionsList
        transactions={transactions}
        categories={categories}
        setTransactions={setTransactions}
      />
    </div>
  );
}

export default Dashboard;
