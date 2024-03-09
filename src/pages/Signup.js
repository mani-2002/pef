import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faSquareInstagram } from "@fortawesome/free-brands-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css";

function Signup() {
  const LoginGif =
    "https://content.presentermedia.com/content/animsp/00004000/4077/fall_asleep_at_computer_PA_md_nwm_v2.gif";
  const [formData, setFormData] = useState({
    fullname: "",
    mobile_number: "",
    email: "",
    password: "",
  });
  const [errorMsg, setErrorMsg] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://peb.onrender.com/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("User registered successfully:", data.success);
        setSuccessMsg(data.success);
        // Reset form fields on successful registration
        setFormData({
          fullname: "",
          mobile_number: "",
          email: "",
          password: "",
        });

        // Optionally, redirect to a success page or update UI
      } else {
        console.error("Error registering user:", data.error);

        // Display error message to the user
        setErrorMsg(data.error);
      }
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };
  return (
    <div className="d-flex flex-row align-items-center justify-content-center vh-100">
      <div
        className="d-flex flex-row border align-items-center justify-content-center"
        style={{
          borderRadius: "5px",
          borderColor: "grey",
          fontFamily: "cursive",
        }}
      >
        <div>
          <img
            src={LoginGif}
            alt=""
            className="img-fluid"
            style={{ width: "50vh", height: "50vh" }}
          />
        </div>
        <div className="m-3 shadow-lg p-3 d-flex flex-column align-items-center">
          <h2>Create New Account</h2>
          <form
            className="form-control d-flex flex-column align-items-center justify-content-center"
            onSubmit={handleFormSubmit}
          >
            <input
              type="text"
              placeholder="Enter Fullname"
              className="form-control"
              autoComplete=""
              required
              style={{ height: "5vh" }}
              name="fullname"
              value={formData.fullname}
              onChange={handleInputChange}
            />
            <br />
            <input
              type="tel"
              placeholder="Enter Mobile number"
              maxLength={10}
              className="form-control"
              autoComplete=""
              required
              name="mobile_number"
              style={{ height: "5vh" }}
              value={formData.mobile_number}
              onChange={handleInputChange}
            />
            <br />
            <input
              type="email"
              placeholder="Enter Email"
              className="form-control"
              autoComplete=""
              name="email"
              required
              style={{ height: "5vh" }}
              value={formData.email}
              onChange={handleInputChange}
            />
            <br />
            <input
              type="password"
              placeholder="Enter Password"
              className="form-control"
              name="password"
              autoComplete=""
              required
              style={{ height: "5vh" }}
              value={formData.password}
              onChange={handleInputChange}
            />
            <br />
            <button type="submit" className="btn btn-primary">
              Register
            </button>
            {errorMsg && <div style={{ color: "red" }}>{errorMsg}</div>}
            {successMsg && <div style={{ color: "green" }}>{successMsg}</div>}
          </form>
          <div className="d-flex flex-column align-items-center justify-content-center">
            <b style={{ marginTop: "0.5vh" }}>or</b>
            <div>Continue with </div>
            <div className="d-flex flex-row">
              <span className="m-3" style={{ cursor: "pointer" }}>
                <FontAwesomeIcon icon={faFacebook} flip />
              </span>
              <span className="m-3" style={{ cursor: "pointer" }}>
                <FontAwesomeIcon icon={faGoogle} beat />
              </span>
              <span className="m-3" style={{ cursor: "pointer" }}>
                <FontAwesomeIcon icon={faLinkedin} bounce />
              </span>
              <span className="m-3" style={{ cursor: "pointer" }}>
                <FontAwesomeIcon icon={faSquareInstagram} beatFade />
              </span>
            </div>
          </div>
          <span>
            Already have an account?
            <Link to="/Login" className="m-1">
              Login
            </Link>
          </span>
          <div>
            <Link to="/">Back to Home</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
