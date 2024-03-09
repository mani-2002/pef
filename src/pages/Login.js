import { Link } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Login = ({ onLogin }) => {
  const LoginGif =
    "https://content.presentermedia.com/content/animsp/00004000/4077/fall_asleep_at_computer_PA_md_nwm_v2.gif";
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://peb.onrender.com/api/login",
        formData
      );
      const { token } = response.data;

      localStorage.setItem("token", token);

      const decodedToken = jwtDecode(token);

      if (decodedToken.role === "admin") {
        navigate("/admin-dashboard");
      } else if (decodedToken.role === "user") {
        navigate("/user-dashboard");
      }
    } catch (error) {
      console.error("Login failed", error);
      setErrorMessage("Invalid credentials. User may not exist.");
    }
  };
  return (
    <div className="d-flex flex-row align-items-center justify-content-center vh-100">
      <div
        className="d-flex flex-row border align-items-center justify-content-center"
        style={{
          borderRadius: "5px",
          borderColor: "grey",
          padding: "2vh",
          fontFamily: "cursive",
        }}
      >
        <img
          src={LoginGif}
          alt=""
          className="img-fluid"
          style={{ width: "50vh", height: "50vh" }}
        />
        <div className="m-4 shadow-lg p-3">
          <h2>Login</h2>
          <form
            className="form-control d-flex flex-column align-items-center justify-content-center"
            onSubmit={handleLogin}
          >
            <input
              type="email"
              placeholder="Enter Email"
              className="form-control"
              autoComplete="email" // Provide a proper value for autoComplete
              required
              name="email"
              onChange={handleInputChange}
            />
            <br />
            <input
              type="password"
              placeholder="Enter Password"
              className="form-control"
              autoComplete="current-password" // Provide a proper value for autoComplete
              required
              name="password"
              onChange={handleInputChange}
            />
            <br />
            <button type="submit" className="btn btn-primary">
              Login
            </button>
          </form>
          {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
          <p style={{ textAlign: "center" }}>
            <a href="/">Forgot password?</a>
          </p>
          <span className="m-1">Does not have an account yet?</span>
          <Link to="/Signup" className="m-1">
            Signup
          </Link>
          <br />
          <div className="d-flex justify-content-center">
            <Link to="/">Back to Home</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
