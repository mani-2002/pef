import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Product from "./pages/Product";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import logo from "./images/logo.jpeg";
import AdminDashboard from "./pages/admin/AdminDashboard";
import UserDashboard from "./pages/user/UserDashboard";
import Sponsers from "./pages/Sponsers";
import Pricing from "./pages/Pricing";
import Team from "./pages/Team";
import FAQS from "./pages/FAQS";
import Testimonal from "./pages/Testimonal";
import Blog from "./pages/Blog";
import SinglePost from "./pages/SinglePost";
import NotFoundPage from "./pages/NotFoundPage";
const App = () => {
  const PrivateRoute = ({ element }) => {
    const isAuthenticated = () => {
      return localStorage.getItem("token") !== null;
    };

    // Check if user is logged in
    if (isAuthenticated()) {
      return element;
    } else {
      // If not logged in, redirect to login and show a message
      return (
        <Navigate
          to="/login"
          state={{ message: "Please login first." }}
          replace
        />
      );
    }
  };
  return (
    <div>
      <Router>
        <div style={{ fontFamily: "cursive" }}>
          <nav
            style={{
              paddingTop: "3vh",
              borderBottom: "1px solid black",
              backgroundColor: "#10898d",
            }}
          >
            <ol
              style={{
                listStyleType: "none",
                display: "flex",
                height: "5vh",
                top: "0",
                justifyContent: "space-between",
                zIndex: "1000",
                alignItems: "center",
              }}
            >
              <li>
                <Link
                  to="/"
                  style={{
                    textDecoration: "none",
                    color: "black",
                    fontSize: "5vh",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <img
                      src={logo}
                      alt="this is manipe logo"
                      style={{
                        width: "15vh",
                        height: "9vh",
                        cursor: "pointer",
                      }}
                    />
                    <span style={{ fontSize: "6vh" }}>Manipe</span>
                  </div>
                </Link>
              </li>
              <div
                style={{
                  display: "flex",
                  marginLeft: "auto",
                  alignItems: "center",
                }}
              >
                <li style={{ padding: "2vh", marginLeft: "auto" }}>
                  <Link
                    to="/"
                    style={{
                      textDecoration: "none",
                      color: "black",
                      textDecorationLine: "underline",
                    }}
                  >
                    Home
                  </Link>
                </li>
                <li style={{ padding: "2vh", marginLeft: "auto" }}>
                  <Link
                    to="/about"
                    style={{
                      textDecoration: "none",
                      color: "black",
                      textDecorationLine: "underline",
                    }}
                  >
                    About us
                  </Link>
                </li>
                <li style={{ padding: "2vh", marginLeft: "auto" }}>
                  <Link
                    to="/product"
                    style={{
                      textDecoration: "none",
                      color: "black",
                      textDecorationLine: "underline",
                    }}
                  >
                    Product
                  </Link>
                </li>
                <li style={{ padding: "2vh", marginLeft: "auto" }}>
                  <select
                    className="dropdown"
                    style={{
                      fontSize: "16px",
                      cursor: "pointer",
                      background: "none",
                      border: "none",
                      width: "14vh",
                      fontFamily: "cursive",
                      textDecorationLine: "underline",
                    }}
                  >
                    <option style={{ display: "none" }} value="pages">
                      Pages
                    </option>
                    <option
                      value="sponsers"
                      style={{ width: "20vh", margin: "1vh" }}
                    >
                      Sponsers
                    </option>
                    <option
                      value="pricing"
                      style={{ width: "20vh", margin: "1vh" }}
                    >
                      Pricing
                    </option>
                    <option
                      value="team"
                      style={{ width: "20vh", margin: "1vh" }}
                    >
                      Team
                    </option>
                    <option
                      value="faqs"
                      style={{ width: "20vh", margin: "1vh" }}
                    >
                      FAQs
                    </option>
                    <option
                      value="testimonial"
                      style={{ width: "20vh", margin: "1vh" }}
                    >
                      Testimonial
                    </option>
                    <option
                      value="blog"
                      style={{ width: "20vh", margin: "1vh" }}
                    >
                      Blog
                    </option>
                    <option
                      value="single-post"
                      style={{ width: "20vh", margin: "1vh" }}
                    >
                      Single Post
                    </option>
                    <option
                      value="404-page"
                      style={{ width: "20vh", margin: "1vh" }}
                    >
                      404 Page
                    </option>
                  </select>
                </li>
                <li style={{ padding: "2vh", marginLeft: "auto" }}>
                  <Link
                    to="/contact"
                    style={{
                      textDecoration: "none",
                      color: "black",
                      textDecorationLine: "underline",
                    }}
                  >
                    Contact
                  </Link>
                </li>
              </div>
            </ol>
          </nav>
          <div>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/product" element={<Product />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route
                path="/admin-dashboard"
                element={<PrivateRoute element={<AdminDashboard />} />}
              />
              <Route
                path="/user-dashboard"
                element={<PrivateRoute element={<UserDashboard />} />}
              />
              <Route path="/sponsers" element={<Sponsers />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/team" element={<Team />} />
              <Route path="/faqs" element={<FAQS />} />
              <Route path="/testimonal" element={<Testimonal />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/singlepost" element={<SinglePost />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </div>
        </div>
      </Router>
    </div>
  );
};

export default App;
