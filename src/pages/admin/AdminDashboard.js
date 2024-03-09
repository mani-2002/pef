import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const AdminDashboard = ({ onLogout }) => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    // Clear the token from localStorage
    localStorage.removeItem("token");
  };

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const getStyles = () => {
    return {
      container: {
        display: "flex",
        flexDirection: "row",
        overflowX: "hidden", // Hide the content overflow when the menu is closed
      },
      menuIcon: {
        cursor: "pointer",
        padding: "10px",
        height: "10.4vh",
        backgroundColor: isMenuOpen ? "black" : "grey",
        transition: "background-color 0.3s ease", // Smooth background color transition
      },
      line: {
        height: "4px",
        width: "25px",
        backgroundColor: "white",
        margin: "5px 0",
        transition: "background-color 0.3s ease", // Smooth line color transition
      },
      menu: {
        height: "78.5vh",
        backgroundColor: "black",
        padding: "0 6vh",
        transform: `translateX(${isMenuOpen ? 0 : "-100%"})`, // Slide menu in and out
        transition: "transform 0.3s ease",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      },
      content: {
        flex: 1,
        transition: "margin-left 0.3s ease",
      },
    };
  };

  const styles = getStyles();
  const notifGif =
    "https://assets.materialup.com/uploads/f2c413f2-ecbe-4104-bc73-7e9a8cbd4580/preview.gif";
  const profileGif =
    "https://assets-v2.lottiefiles.com/a/c8af26dc-116f-11ee-bc3e-cb8e42882cec/q2rENOJP4Y.gif";
  const searchIcon =
    "https://cdn3.iconfinder.com/data/icons/feather-5/24/search-512.png";
  const inputStyle = {
    width: "40vh",
    border: "none",
    ":select": {
      border: "none",
    },
  };
  const [currentContent, setCurrentContent] = useState("default");
  const handleButtonClick = (content) => {
    setCurrentContent(content);
  };
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchDistinctUsers();
  }, []);

  const fetchDistinctUsers = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        "https://peb-production.up.railway.app/distinct-users",
        {
          headers: {
            authorization: token,
          },
        }
      );
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching distinct users:", error);
    }
  };

  const deleteUserByEmail = async (email) => {
    try {
      const response = await fetch(
        `https://peb-production.up.railway.app/delete-users/${email}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        fetchDistinctUsers(); // Fetch users again after deletion
      } else {
        console.error("Failed to delete users");
      }
    } catch (error) {
      console.error("Error deleting users:", error);
    }
  };
  const [transactions, setTransactions] = useState([]);
  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch("https://peb-production.up.railway.app/transaction-history", {
      headers: {
        authorization: token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setTransactions(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const adminProfilePic =
    "https://i.pinimg.com/originals/6f/1f/ca/6f1fca4f4980a5f08cd45582487ac7f7.gif";
  const [popupVisible, setPopupVisible] = useState(false);
  const buttonRef = useRef(null);
  const popupRef = useRef(null);
  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });

  useEffect(() => {
    if (buttonRef.current) {
      const buttonRect = buttonRef.current.getBoundingClientRect();
      setPopupPosition({
        top: buttonRect.bottom + window.scrollY + 10,
        left: buttonRect.left + window.scrollX - 150,
      });
    }

    const handleOutsideClick = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setPopupVisible(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [popupVisible]);

  const togglePopup = () => {
    setPopupVisible(!popupVisible);
  };
  const [transactionList, setTransactionList] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch("https://peb-production.up.railway.app/transactions", {
      headers: {
        Authorization: token,
      },
    })
      .then((response) => response.json())
      .then((data) => setTransactionList(data))
      .catch((error) => console.error("Error fetching transactions:", error));
  }, []);
  //profile popup
  const [popupVisibleProf, setPopupVisibleProf] = useState(false);
  const buttonRefProf = useRef(null);
  const popupRefProf = useRef(null);
  const [popupPositionProf, setPopupPositionProf] = useState({
    top: 0,
    left: 0,
  });

  useEffect(() => {
    if (buttonRefProf.current) {
      const buttonRectProf = buttonRefProf.current.getBoundingClientRect();
      setPopupPositionProf({
        top: buttonRectProf.bottom + window.scrollY + 10,
        left: buttonRectProf.left + window.scrollX - 150,
      });
    }

    const handleOutsideClickProf = (event) => {
      if (
        popupRefProf.current &&
        !popupRefProf.current.contains(event.target)
      ) {
        setPopupVisibleProf(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClickProf);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClickProf);
    };
  }, [popupVisibleProf]);

  const togglePopupProf = () => {
    setPopupVisibleProf(!popupVisibleProf);
  };
  //profile popup

  const [email, setEmail] = useState("");
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(
    "Search to fetch Existing users..."
  );
  const [suggestions, setSuggestions] = useState([]);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1);
  const inputRef = useRef(null);

  const fetchSuggestions = async (input) => {
    if (!input) {
      setSuggestions([]);
      return;
    }
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `https://peb-production.up.railway.app/suggestions?email=${input}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch suggestions");
      }
      const data = await response.json();
      setSuggestions(data.suggestions);
      setSelectedSuggestionIndex(-1);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchSuggestions(email);
  }, [email]);

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `https://peb-production.up.railway.app/search?email=${email}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      if (!response.ok) {
        throw new Error("No user found");
      }
      const data = await response.json();
      setUser(data);
      setEmail("");
      setErrorMessage("");
    } catch (error) {
      setUser(null);
      setErrorMessage(error.message);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setEmail(suggestion);
    inputRef.current.focus();
    setSuggestions([]); // Clear suggestions when a suggestion is clicked
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      setSelectedSuggestionIndex((prevIndex) =>
        prevIndex < suggestions.length - 1 ? prevIndex + 1 : prevIndex
      );
    } else if (e.key === "ArrowUp") {
      setSelectedSuggestionIndex((prevIndex) =>
        prevIndex > 0 ? prevIndex - 1 : -1
      );
    } else if (e.key === "Enter") {
      if (selectedSuggestionIndex !== -1) {
        setEmail(suggestions[selectedSuggestionIndex]);
        inputRef.current.focus();
        setSuggestions([]); // Clear suggestions when Enter is pressed
      }
    }
  };

  return (
    <div style={styles.container}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "auto",
        }}
      >
        <div style={styles.menuIcon} onClick={toggleMenu}>
          <div style={styles.line}></div>
          <div style={styles.line}></div>
          <div style={styles.line}></div>
        </div>
        {isMenuOpen && (
          <div style={styles.menu}>
            <button
              style={{
                height: "10vh",
                width: "20vh",
                background: "black",
                border: "none",
                color: "white",
                margin: "0.5vh",
              }}
              onClick={() => {
                handleButtonClick("dashboard");
                setEmail("");
                setSuggestions([]);
              }}
            >
              Dashboard
            </button>
            <button
              style={{
                height: "10vh",
                width: "20vh",
                background: "black",
                border: "none",
                color: "white",
                margin: "0.5vh",
              }}
              onClick={() => {
                handleButtonClick("showUsers");
                setEmail("");
                setSuggestions([]);
              }}
            >
              show users
            </button>
            <button
              style={{
                height: "10vh",
                width: "20vh",
                background: "black",
                border: "none",
                color: "white",
                margin: "0.5vh",
              }}
              onClick={() => {
                handleButtonClick("showUserTransactionHistory");
                setEmail("");
                setSuggestions([]);
              }}
            >
              Show User Transaction History
            </button>
            <button
              style={{
                height: "10vh",
                width: "20vh",
                background: "black",
                border: "none",
                color: "white",
                margin: "0.5vh",
              }}
              onClick={() => {
                handleButtonClick("settings");
                setEmail("");
                setSuggestions([]);
              }}
            >
              Settings
            </button>
            <Link to="/">
              <button
                onClick={handleLogout}
                style={{
                  height: "10vh",
                  width: "20vh",
                  background: "black",
                  border: "none",
                  color: "white",
                  margin: "0.5vh",
                }}
              >
                Logout
              </button>
            </Link>
            <div
              style={{
                color: "white",
                fontFamily: "initial",
                marginTop: "auto",
                fontSize: "3vh",
              }}
            >
              Manipe
            </div>
          </div>
        )}
      </div>
      <div style={styles.content}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "grey",
            marginBottom: "3vh",
          }}
        >
          <div
            style={{ marginLeft: "5vh", fontSize: "4vh", color: "whitesmoke" }}
          >
            Welcome Manikanta...
          </div>
          <div
            style={{
              marginLeft: "auto",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              marginRight: "3vh",
            }}
          >
            <div>
              <form
                style={{
                  margin: "1vh",
                  border: "1px solid black",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: "15px",
                  padding: "0.5vh",
                  backgroundColor: "white",
                }}
                onSubmit={handleSearchSubmit}
              >
                <input
                  type="search"
                  style={inputStyle}
                  placeholder="Search User"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={handleKeyDown}
                  ref={inputRef}
                />
                <button
                  type="submit"
                  style={{ border: "none", background: "none" }}
                  onClick={() => {
                    handleButtonClick("searched");
                  }}
                >
                  <img
                    src={searchIcon}
                    alt=""
                    style={{ height: "5vh", width: "5vh" }}
                  />
                </button>
              </form>
              {suggestions.length > 0 && (
                <ul
                  style={{
                    listStyleType: "none",
                    padding: 0,
                    margin: 0,
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    borderRadius: "4px",
                    backgroundColor: "#fff",
                    position: "absolute",
                    zIndex: 1,
                    width: "50vh",
                  }}
                >
                  {suggestions.map((suggestion, index) => (
                    <li
                      key={index}
                      style={{
                        padding: "8px 16px",
                        borderBottom: "1px solid #ddd",
                        cursor: "pointer",
                        backgroundColor:
                          index === selectedSuggestionIndex
                            ? "#f0f0f0"
                            : "inherit",
                      }}
                      onClick={() => handleSuggestionClick(suggestion)}
                    >
                      {suggestion}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div style={{ margin: "1vh" }}>
              <button
                style={{
                  border: "none",
                  background: "none",
                  cursor: "pointer",
                }}
                ref={buttonRef}
                onClick={togglePopup}
              >
                <img
                  src={notifGif}
                  alt=""
                  style={{ width: "8vh", height: "8vh", borderRadius: "50%" }}
                />
              </button>
            </div>
            {popupVisible && (
              <div
                ref={popupRef}
                style={{
                  position: "absolute",
                  top: popupPosition.top,
                  left: popupPosition.left,
                  backgroundColor: "black",
                  padding: "1vh",
                  border: "1px solid #ccc",
                  zIndex: 999,
                  color: "white",
                  width: "35vh",
                }}
                className="shadow-lg"
              >
                <div>
                  {transactionList.map((transaction) => (
                    <div key={transaction.id} style={{ fontSize: "2vh" }}>
                      <p>{`${transaction.from_username} has paid ${transaction.amount} to ${transaction.to_username} via ${transaction.payment_method}`}</p>
                      <hr />
                    </div>
                  ))}
                </div>
                <div
                  style={{
                    position: "absolute",
                    top: "-10px",
                    left: "calc(80% - 5px)",
                    width: "0",
                    height: "0",
                    borderLeft: "10px solid transparent",
                    borderRight: "10px solid transparent",
                    borderBottom: "10px solid black",
                  }}
                />
              </div>
            )}
            <div style={{ margin: "1vh" }}>
              <button
                style={{ border: "none", background: "none" }}
                ref={buttonRefProf}
                onClick={togglePopupProf}
              >
                <img
                  src={profileGif}
                  alt=""
                  style={{ width: "8vh", height: "8vh", borderRadius: "50%" }}
                />
              </button>
            </div>
            {popupVisibleProf && (
              <div
                ref={popupRefProf}
                style={{
                  position: "absolute",
                  top: popupPositionProf.top,
                  left: popupPositionProf.left,
                  backgroundColor: "black",
                  padding: "1vh",
                  border: "1px solid #ccc",
                  zIndex: 999,
                  color: "white",
                  width: "35vh",
                }}
                className="shadow-lg"
              >
                <div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "auto",
                    }}
                  >
                    <div
                      style={{
                        border: "1px solid black",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexDirection: "column",
                        borderRadius: "5px",
                        padding: "3vh",
                      }}
                    >
                      <div
                        style={{
                          border: "none",
                          borderRadius: "50%",
                          fontSize: "6vh",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          padding: "1vh",
                          width: "10vh",
                          backgroundColor: "#0078D4",
                          color: "white",
                          fontFamily: "times new roman",
                          marginBottom: "3vh",
                        }}
                      >
                        M
                      </div>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          fontSize: "2vh",
                        }}
                      >
                        <div>
                          <b>Name :</b>
                          <span>Manikanta Vinjamuri</span>
                        </div>
                        <div>
                          <b>Contact :</b>
                          <span>+918522845343</span>
                        </div>
                        <div>
                          <b>Email :</b>
                          <span>mani@manipe.com</span>
                        </div>
                      </div>
                      <div style={{ marginTop: "2vh" }}>
                        <Link to="/">
                          <button
                            className="btn btn-danger"
                            onClick={handleLogout}
                          >
                            Logout
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    position: "absolute",
                    top: "-10px",
                    left: "calc(80% - 12px)",
                    width: "0",
                    height: "0",
                    borderLeft: "10px solid transparent",
                    borderRight: "10px solid transparent",
                    borderBottom: "10px solid black",
                  }}
                />
              </div>
            )}
          </div>
        </div>
        <div style={{ marginLeft: "5vh" }}>
          {currentContent === "searched" && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {errorMessage && <p>{errorMessage}</p>}
              {user && (
                <div>
                  <h2>User Information</h2>
                  <b>Full Name :</b>
                  <span>{user.fullname}</span>
                  <br />
                  <b>Email :</b>
                  <span>{user.email}</span>
                  <br />
                  <b>Mobile Number :</b>
                  <span>{user.mobile_number}</span>
                  <br />
                </div>
              )}
            </div>
          )}
          {currentContent === "default" && (
            <div>
              <div
                style={{
                  border: "1px solid black",
                  width: "70vw",
                  marginTop: "4vh",
                }}
              >
                <div style={{ margin: "2vh", display: "flex" }}>
                  <div style={{ width: "30%" }}>
                    <img
                      src={adminProfilePic}
                      style={{
                        width: "30vh",
                        height: "30vh",
                        borderRadius: "50%",
                      }}
                      alt=""
                    />
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      height: "auto",
                      flexDirection: "column",
                    }}
                  >
                    <div style={{ color: "red" }}>
                      <h2>Your Info...</h2>
                    </div>
                    <div>
                      <b>Full Name :</b> <span>Manikanta Vinjamuri</span> <br />
                      <b>Mobile Number :</b> <span>+918522845343</span> <br />
                      <b>Email :</b> <span>mani@manipe.com</span> <br />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {currentContent === "dashboard" && (
            <div>
              <div
                style={{
                  border: "1px solid black",
                  width: "70vw",
                  marginTop: "4vh",
                }}
              >
                <div style={{ margin: "2vh", display: "flex" }}>
                  <div style={{ width: "30%" }}>
                    <img
                      src={adminProfilePic}
                      style={{
                        width: "30vh",
                        height: "30vh",
                        borderRadius: "50%",
                      }}
                      alt=""
                    />
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      height: "auto",
                      flexDirection: "column",
                    }}
                  >
                    <div style={{ color: "red" }}>
                      <h2>Your Info...</h2>
                    </div>
                    <div>
                      <b>Full Name :</b> <span>Manikanta Vinjamuri</span> <br />
                      <b>Mobile Number :</b> <span>+918522845343</span> <br />
                      <b>Email :</b> <span>mani@manipe.com</span> <br />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {currentContent === "showUsers" && (
            <div>
              <h2>All Registered Users...</h2>
              <table style={{ borderCollapse: "collapse", width: "80%" }}>
                <thead>
                  <tr>
                    <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                      ID
                    </th>
                    <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                      Full Name
                    </th>
                    <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                      Mobile Number
                    </th>
                    <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                      Email
                    </th>
                    <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, index) => (
                    <tr key={index}>
                      <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                        {user.id}
                      </td>
                      <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                        {user.fullname}
                      </td>
                      <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                        {user.mobile_number}
                      </td>
                      <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                        {user.email}
                      </td>
                      <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                        <button
                          onClick={() => deleteUserByEmail(user.email)}
                          className="btn btn-danger"
                        >
                          Delete User
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {currentContent === "showUserTransactionHistory" && (
            <div>
              <h2 style={{ textAlign: "center" }}>
                User Transaction History...
              </h2>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "center",
                }}
              >
                {transactions.map((transaction) => (
                  <div
                    key={transaction.id}
                    style={{
                      border: "1px solid #ccc",
                      borderRadius: "5px",
                      padding: "10px",
                      margin: "10px",
                      width: "auto",
                      backgroundColor: "ButtonShadow",
                    }}
                  >
                    <div
                      style={{
                        borderBottom: "1px solid black",
                        marginBottom: "2vh",
                        fontSize: "3vh",
                      }}
                    >
                      <b>{transaction.from_username}</b>
                      <span> >>>> </span>
                      <b>{transaction.to_username}</b>
                    </div>
                    <div>
                      <b>ID:</b> {transaction.id}
                    </div>
                    <div>
                      <b>Transaction ID:</b> {transaction.transaction_id}
                    </div>
                    <div>
                      <b>Transaction Date:</b> {transaction.transaction_date}
                    </div>
                    <div>
                      <b>Amount:</b> {transaction.amount}
                    </div>
                    <div>
                      <b>Status:</b> {transaction.status}
                    </div>
                    <div>
                      <b>Currency:</b> {transaction.currency}
                    </div>
                    {transaction.payment_method === "tobank" && (
                      <>
                        <div>
                          <b>Account Number:</b> {transaction.account_number}
                        </div>
                        <div>
                          <b>IFSC Code:</b> {transaction.ifsc_code}
                        </div>
                        <div>
                          <b>Customer ID:</b> {transaction.customer_id}
                        </div>
                        <div>
                          <b>Payment Method:</b> {transaction.payment_method}
                        </div>
                      </>
                    )}
                    {transaction.payment_method === "tomobile" && (
                      <>
                        <div>
                          <b>Mobile Number:</b> {transaction.mobile_number}
                        </div>
                        <div>
                          <b>Payment Method:</b> {transaction.payment_method}
                        </div>
                      </>
                    )}
                    {transaction.payment_method === "to upi" && (
                      <>
                        <div>
                          <b>Upi ID:</b> {transaction.upi_id}
                        </div>
                        <div>
                          <b>Payment Method: </b>
                          {transaction.payment_method}
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
          {currentContent === "settings" && (
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "auto",
                }}
              >
                <div
                  style={{
                    border: "1px solid black",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                    borderRadius: "5px",
                    padding: "3vh",
                  }}
                >
                  <div
                    style={{
                      border: "none",
                      borderRadius: "50%",
                      fontSize: "10vh",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: "1vh",
                      width: "17vh",
                      backgroundColor: "#0078D4",
                      color: "white",
                      fontFamily: "times new roman",
                      marginBottom: "3vh",
                    }}
                  >
                    M
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <div>
                      <b>Full Name :</b>
                      <span>Manikanta Vinjamuri</span>
                    </div>
                    <div>
                      <b>Mobile Number :</b>
                      <span>+918522845343</span>
                    </div>
                    <div>
                      <b>Email :</b>
                      <span>mani@manipe.com</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
