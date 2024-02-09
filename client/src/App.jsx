import "./App.css";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import Footer from "./components/Footer/Footer";
import LandingPage from "./pages/LandingPage/LandingPage";
import Transactions from "./pages/Transactions/Transactions";
import Dashboard from "./pages/Dashboard/Dashboard";
import EditTransaction from "./pages/EditTransaction/EditTransaction";
import CreateTransaction from "./pages/CreateTransaction/CreateTransaction";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";

import IsAuthenticated from "./components/Routing/IsAuthenticated";
import IsNotAuthenticated from "./components/Routing/IsNotAuthenticated";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route element={<IsNotAuthenticated />}>
          <Route element={<Header />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
          </Route>
        </Route>

        <Route element={<IsAuthenticated />}>
          <Route element={<Sidebar />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route
              path="/transactions/edit/:transactionId"
              element={<EditTransaction />}
            />
            <Route
              path="/transactions/create"
              element={<CreateTransaction />}
            />
          </Route>
        </Route>
      </Routes>
      <Footer />
    </div>
  );
}
export default App;
