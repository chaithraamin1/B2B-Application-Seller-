import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import { Route, Routes } from "react-router-dom";
import Add from "./pages/Add/Add";
import List from "./pages/List/List";
import Orders from "./pages/Orders/Orders";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import Login from "./components/Login/Login";
import Profile from "./components/Profile/Profile";

const App = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [showProfilepage,handleClick]=useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (token) {
      setAuthenticated(true);
    } else {
      setAuthenticated(false);
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className="app">
      <ToastContainer />
      {authenticated && <Navbar />}
      {showProfilepage && ( <Profile handleClick={handleClick} />)}
      <hr />
      <div className="app-content">
        {authenticated && <Sidebar />}
        <Routes>
          <Route path="/" element={<Login />} />

          <Route
            path="/add"
            element={<Add />}
            setAuthenticated={setAuthenticated}
          />
          <Route
            path="/list"
            element={<List />}
            setAuthenticated={setAuthenticated}
          />
          <Route
            path="/orders"
            element={<Orders />}
            setAuthenticated={setAuthenticated}
          />
        </Routes>
      </div>
    </div>
  );
};

export default App;
