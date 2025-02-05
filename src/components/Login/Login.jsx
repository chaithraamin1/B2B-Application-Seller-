import React, { useState } from "react";
import "../../components/Login/Login.css";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { url } from "../../assets/assets";
import { toast } from "react-toastify";


const Login = () => {
  // Set up state for username, password, and error message
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  localStorage.clear();

  // Handle form submissions
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple validation logic
    if (!email || !password) {
      setError("Please fill in both fields");
    } else {

      try {
        const body={
          email:email,
          password:password
        }
      const response = await axios.post(`${url}/api/login`,body);
       console.log('Login successful:', response.data);
       toast.success(response.data.success)
       localStorage.setItem("authToken",response.data.token)
       navigate("/add");

        } catch (error) {
          console.error('Error during login:', error);
          setError('Login failed. Please try again.');
        }
      }
  };

  return (
    <div className="container-fluid">
      <div className="login-container">
        <h2 className="heading">Login</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"

            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
            />
          </div>

          {error && <p className="error-message">{error}</p>}

          <button type="submit" className="btnLogin">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
