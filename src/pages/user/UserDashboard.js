import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { jwtDecode } from "jwt-decode";

const UserDashboard = ({ onLogout }) => {
  const token = localStorage.getItem("token");
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [currentContent, setCurrentContent] = useState("default");
  const [userDetails, setUserDetails] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [balance, setBalance] = useState(null);
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
        height: "10.5vh",
        backgroundColor: isMenuOpen ? "black" : "grey",
        transition: "background-color 0.3s ease", // Smooth background color transition
      },
      line: {
        height: "3px",
        width: "25px",
        backgroundColor: isMenuOpen ? "white" : "black",
        margin: "5px 0",
        transition: "background-color 0.3s ease", // Smooth line color transition
      },
      menu: {
        height: "81.5vh",
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

  const [paymentContent, setPaymentContent] = useState("default");
  const handleButtonClick = (content) => {
    setCurrentContent(content);
  };
  const handlePaymentButton = (paymentType) => {
    setPaymentContent(paymentType);
  };
  const [username, setUsername] = useState("");
  useEffect(() => {
    const token = localStorage.getItem("token");
    const decodedToken = jwtDecode(token);
    setUsername(decodedToken.fullname);
  }, []);
  const [mobile, setMobile] = useState("");
  useEffect(() => {
    const token = localStorage.getItem("token");
    const decodedToken = jwtDecode(token);
    setMobile(decodedToken.mobile_number);
  }, []);
  const [email, setEmail] = useState("");
  useEffect(() => {
    const token = localStorage.getItem("token");
    const decodedToken = jwtDecode(token);
    setEmail(decodedToken.email);
  }, []);

  const [accountNumber, setAccountNumber] = useState("");
  const [customerId, setCustomerId] = useState("");
  const [ifscCode, setIfscCode] = useState("");
  const [message, setMessage] = useState(null);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Retrieve the JWT token from wherever you store it after user login
    const token = localStorage.getItem("token");

    // Prepare the request payload
    const requestBody = {
      account_number: accountNumber,
      customer_id: customerId,
      ifsc_code: ifscCode,
    };

    try {
      // Make the fetch request to the server
      const response = await fetch(
        "https://peb.onrender.com/api/link-bank-account",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token, // Include the JWT token in the Authorization header
          },
          body: JSON.stringify(requestBody),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setMessage({
          type: "success",
          text: "Bank account linked successfully",
        });
        setAccountNumber("");
        setCustomerId("");
        setIfscCode("");
        // Handle success, maybe redirect or show a success message
      } else {
        setMessage({
          type: "error",
          text: `Error linking bank account: ${data.error}`,
        });
        console.error("Error linking bank account:", data.error);
        // Handle error, maybe show an error message to the user
      }
    } catch (error) {
      setMessage({ type: "error", text: "An unexpected error occurred" });
      console.error("Fetch error:", error);
      // Handle fetch error, maybe show a general error message
    }
  };
  useEffect(() => {
    let timeoutId;

    if (message) {
      timeoutId = setTimeout(() => {
        setMessage(null);
      }, 3000);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [message]);

  useEffect(() => {
    // Fetch user details from the backend
    const token = localStorage.getItem("token");
    fetch("https://peb.onrender.com/api/user-details", {
      method: "GET",
      headers: {
        Authorization: token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setUserDetails(data);
      })
      .catch((error) => console.error("Error fetching user details:", error));
  }, []);

  const handleUnlink = (accountNumber) => {
    const token = localStorage.getItem("token");
    fetch(
      `https://peb.onrender.com/api/delete-account/${accountNumber}`,
      {
        method: "DELETE",
        headers: {
          Authorization: token,
        },
      }
    )
      .then((response) => {
        if (response.ok) {
          // If the deletion was successful, update user details state
          setUserDetails((prevDetails) =>
            prevDetails.filter((user) => user.account_number !== accountNumber)
          );
          console.log("Account successfully unlinked");
        } else {
          console.error("Failed to unlink account");
        }
      })
      .catch((error) => console.error("Error unlinking account:", error));
  };
  const handleRadioChange = async (event, accountNumber) => {
    setSelectedAccount(accountNumber);

    // Retrieve the JWT token from localStorage
    const token = localStorage.getItem("token");

    // Prepare the request payload
    const requestBody = {
      account_number: accountNumber,
    };

    try {
      // Make a fetch request to update the database
      const response = await fetch(
        "https://peb.onrender.com/api/set-primary-account",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify(requestBody),
        }
      );

      if (response.ok) {
        console.log("Primary account set successfully");
        // Fetch balance of the selected account after setting it as primary
        fetchBalance(accountNumber);
        window.location.reload();
        // Handle success if needed
      } else {
        console.error("Error setting primary account");
        // Handle error if needed
      }
    } catch (error) {
      console.error("Fetch error:", error);
      // Handle fetch error if needed
    }
  };

  const fetchBalance = async (accountNumber) => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        `https://peb.onrender.com/api/balance/${accountNumber}`,
        {
          method: "GET",
          headers: {
            Authorization: token,
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        setBalance(data.balance);
      } else {
        console.error("Error fetching balance");
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  useEffect(() => {
    // Fetch user details from the backend
    const token = localStorage.getItem("token");
    fetch("https://peb.onrender.com/api/user-details", {
      method: "GET",
      headers: {
        Authorization: token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setUserDetails(data);

        // Find the primary account and set it as selected
        const primaryAccount = data.find((account) => account.is_primary === 1);
        if (primaryAccount) {
          setSelectedAccount(primaryAccount.account_number);
          // Fetch balance of the primary account
          fetchBalance(primaryAccount.account_number);
        }
      })
      .catch((error) => console.error("Error fetching user details:", error));
  }, []);

  const userProfilePic =
    "https://i.pinimg.com/originals/6f/1f/ca/6f1fca4f4980a5f08cd45582487ac7f7.gif";
  const [userEmails, setUserEmails] = useState([]);
  const [selectedUser, setSelectedUser] = useState({});

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch("https://peb.onrender.com/api/user-emails", {
      method: "GET",
      headers: {
        Authorization: token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setUserEmails(data.emails);
      })
      .catch((error) => console.error("Error fetching user emails:", error));
  }, []);

  const handleUserSelect = async (event) => {
    const selectedEmail = event.target.value;

    if (selectedEmail === "") {
      setSelectedUser({});
      setFormData({
        accountNumber: "",
        customerId: "",
        ifscCode: "",
        amount: "",
      });
      setFormMobData({
        mobileNumber: "",
        amount: "",
      });
      setFormUpiData({
        upiId: "",
        amount: "",
      });
    } else {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `https://peb.onrender.com/api/user-details/${selectedEmail}`,
        {
          method: "GET",
          headers: {
            Authorization: token,
          },
        }
      );
      const userData = await response.json();
      setSelectedUser(userData);
      // Update formData with the selected user's details
      setFormData({
        accountNumber: userData.account_number || "",
        customerId: userData.customer_id || "",
        ifscCode: userData.ifsc_code || "",
        amount: "", // You may want to reset the amount or leave it as an empty string
      });
      setFormMobData({
        mobileNumber: userData.mobile_number,
        amount: "",
      });
      setFormUpiData({
        upiId: userData.upi_id,
        amount: "",
      });
    }
  };

  //bank payment
  const [formData, setFormData] = useState({
    accountNumber: "",
    customerId: "",
    ifscCode: "",
    amount: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const [paymentMessage, setPaymentMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://peb.onrender.com/transfer",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify({
            ...formData,
            amount: parseFloat(formData.amount),
          }),
        }
      );

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.error || "Server error");
      }

      console.log(responseData.message);
      setPaymentMessage({ text: "Payment successful", success: true });
      setSelectedUser({});
      setFormData((prevFormData) => ({
        ...prevFormData,
        amount: "",
      }));
    } catch (error) {
      setPaymentMessage({
        text: error.message || "Payment failed. Please try again later.",
        success: false,
      });
    }
  };

  //mobile payment
  const [formMobData, setFormMobData] = useState({
    mobileNumber: "",
    amount: "",
  });

  // Adjust form data handling to prevent overriding handleChange
  const handleMobChange = (e) => {
    const { name, value } = e.target;
    setFormMobData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const [paymentMobMessage, setPaymentMobMessage] = useState(null);

  // Modify form submission handler
  const handleMobSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://peb.onrender.com/mob-transfer",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify({
            ...formMobData,
            amount: parseFloat(formMobData.amount),
          }),
        }
      );

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.error || "Server error");
      }

      console.log(responseData.message);
      setPaymentMobMessage({ text: "Payment successful", success: true });
      setSelectedUser({});
      setFormMobData((prevFormData) => ({
        ...prevFormData,
        amount: "",
      }));
    } catch (error) {
      console.error("Error:", error); // Log any errors for debugging
      setPaymentMobMessage({
        text: error.message || "Payment failed. Please try again later.",
        success: false,
      });
    }
  };

  //upi payment
  const [formUpiData, setFormUpiData] = useState({
    upiId: "",
    amount: "",
  });

  // Adjust form data handling to prevent overriding handleChange
  const handleUpiChange = (e) => {
    const { name, value } = e.target;
    setFormUpiData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const [paymentUpiMessage, setPaymentUpiMessage] = useState(null);

  // Modify form submission handler
  const handleUpiSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://peb.onrender.com/upi-transfer",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify({
            ...formUpiData,
            amount: parseFloat(formUpiData.amount),
          }),
        }
      );

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.error || "Server error");
      }

      console.log(responseData.message);
      setPaymentUpiMessage({ text: "Payment successful", success: true });
      setSelectedUser({});
      setFormUpiData((prevFormData) => ({
        ...prevFormData,
        amount: "",
      }));
    } catch (error) {
      console.error("Error:", error); // Log any errors for debugging
      setPaymentUpiMessage({
        text: error.message || "Payment failed. Please try again later.",
        success: false,
      });
    }
  };
  const [backgroundColor, setBackgroundColor] = useState("");
  const colors = [
    "orange",
    "yellow",
    "blue",
    "grey",
    "green",
    "red",
    "violet",
    "cyan",
    "magenta",
    "lime",
    "pink",
    "teal",
    "indigo",
    "tan",
    "salmon",
    "skyblue",
    "plum",
    "olive",
    "gold",
    "steelblue",
    "peru",
    "coral",
    "darkslategray",
    "sienna",
    "thistle",
  ];
  const getRandomColor = () => {
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  };
  useState(() => {
    setBackgroundColor(getRandomColor());
  }, []);

  //notification popup
  const [popupVisible, setPopupVisible] = useState(false);
  const buttonRef = useRef(null);
  const popupRef = useRef(null);
  const [popupPosition, setPopupPosition] = useState({
    top: 0,
    left: 0,
  });

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
  const [userTransData, setUserTransData] = useState([]);
  const [userTransError, setError] = useState(null);
  const [userTransLoading, setuserTransLoading] = useState(true);
  useEffect(() => {
    const token = localStorage.getItem("token");
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://peb.onrender.com/user-transactions`,
          {
            method: "GET",
            headers: {
              Authorization: token,
            },
          }
        );
        if (!response.ok) {
          throw new Error("No user found");
        }
        const jsonData = await response.json();
        setUserTransData(jsonData);
        setuserTransLoading(false);
      } catch (userTransError) {
        setError(userTransError.message);
        setuserTransLoading(false);
      }
    };

    fetchData();
  }, []);
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
                border: "1px solid white",
                color: "white",
                margin: "0.5vh",
              }}
              onClick={() => {
                handleButtonClick("dashboard");
              }}
            >
              Dashboard
            </button>
            <button
              style={{
                height: "10vh",
                width: "20vh",
                background: "black",
                border: "1px solid white",
                color: "white",
                margin: "0.5vh",
              }}
              onClick={() => {
                handleButtonClick("newPayment");
              }}
            >
              New payment
            </button>
            <button
              style={{
                height: "10vh",
                width: "20vh",
                background: "black",
                border: "1px solid white",
                color: "white",
                margin: "0.5vh",
              }}
              onClick={() => {
                handleButtonClick("linkBankAccount");
              }}
            >
              Link Bank Account
            </button>
            <button
              style={{
                height: "10vh",
                width: "20vh",
                background: "black",
                border: "1px solid white",
                color: "white",
                margin: "0.5vh",
              }}
              onClick={() => {
                handleButtonClick("showAllBanks");
              }}
            >
              All Linked Bank Accounts
            </button>
            <button
              style={{
                height: "10vh",
                width: "20vh",
                background: "black",
                border: "1px solid white",
                color: "white",
                margin: "0.5vh",
              }}
              onClick={() => {
                handleButtonClick("transactionHistory");
              }}
            >
              Transaction History
            </button>
            <button
              style={{
                height: "10vh",
                width: "20vh",
                background: "black",
                border: "1px solid white",
                color: "white",
                margin: "0.5vh",
              }}
              onClick={() => {
                handleButtonClick("settings");
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
                  border: "1px solid white",
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
          }}
        >
          <div
            style={{ marginLeft: "5vh", fontSize: "4vh", color: "whitesmoke" }}
          >
            Welcome {username}...
          </div>
          <div
            style={{
              marginLeft: "auto",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              marginRight: "5vh",
            }}
          >
            <div style={{ margin: "1vh" }}>
              <button
                style={{ border: "none", background: "none" }}
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
                  {userTransData.map((transaction) => (
                    <div style={{ fontSize: "2vh" }} key={transaction.id}>
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
                style={{
                  border: "none",
                  borderRadius: "50%",
                  background: backgroundColor,
                  width: "8.5vh",
                  height: "8.5vh",
                  fontFamily: "times new roman",
                  fontWeight: "bold",
                  fontSize: "5vh",
                  color: "whitesmoke",
                }}
                ref={buttonRefProf}
                onClick={togglePopupProf}
              >
                {username[0]}
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
                  width: "38vh",
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
                    <div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <div
                          style={{
                            border: "1px solid black",
                            borderRadius: "5px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexDirection: "column",
                            padding: "3vh",
                            width: "auto",
                          }}
                        >
                          <div
                            style={{
                              margin: "3vh",
                              borderRadius: "50%",
                              fontSize: "10vh",
                              width: "15vh",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              height: "auto",
                              backgroundColor: backgroundColor,
                              color: "whitesmoke",
                              fontFamily: "times new roman",
                            }}
                          >
                            {username[0]}
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
                              {username}
                            </div>
                            <div>
                              <b>Mobile Number :</b>
                              {mobile}
                            </div>
                            <div>
                              <b>Email :</b>
                              {email}
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
                  </div>
                </div>
                <div
                  style={{
                    position: "absolute",
                    top: "-10px",
                    left: "calc(80% - 25px)",
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
        <div style={{ marginLeft: "5vh", marginTop: "5vh" }}>
          {currentContent === "default" && (
            <div>
              <div style={{ border: "1px solid black", width: "70vw" }}>
                <div
                  style={{ fontSize: "3vh", margin: "2vh", fontWeight: "bold" }}
                >
                  Set Primary Account
                </div>
                <hr />
                <div
                  style={{
                    display: "flex",
                    width: "auto",
                    justifyContent: "space-around",
                  }}
                >
                  {userDetails.map((account) => (
                    <div key={account.account_number}>
                      {account.ifsc_code ? (
                        <>
                          <input
                            type="radio"
                            id={account.account_number}
                            name="ifsc_code"
                            value={account.account_number}
                            checked={selectedAccount === account.account_number}
                            onChange={(event) =>
                              handleRadioChange(event, account.account_number)
                            }
                          />
                          <label htmlFor={account.account_number}>
                            {account.ifsc_code}
                          </label>
                        </>
                      ) : (
                        <div>Link your bank account first.</div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
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
                      src={userProfilePic}
                      style={{
                        width: "30vh",
                        height: "30vh",
                        borderRadius: "50%",
                      }}
                      alt=""
                    />
                  </div>
                  <div>
                    <h1>Your Info...</h1>
                    <div>
                      <b>Full Name :</b> <span>{username}</span> <br />
                      <b>Mobile Number :</b> <span>{mobile}</span> <br />
                      <b>Email :</b> <span>{email}</span> <br />
                      {selectedAccount && (
                        <>
                          <b>Selected Account Balance :</b>{" "}
                          <span>{balance}</span> <br />
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {currentContent === "dashboard" && (
            <div>
              <div style={{ border: "1px solid black", width: "70vw" }}>
                <div
                  style={{ fontSize: "3vh", margin: "2vh", fontWeight: "bold" }}
                >
                  Set Primary Account
                </div>
                <hr />
                <div
                  style={{
                    display: "flex",
                    width: "auto",
                    justifyContent: "space-around",
                  }}
                >
                  {userDetails.map((account) => (
                    <div key={account.account_number}>
                      {account.ifsc_code ? (
                        <>
                          <input
                            type="radio"
                            id={account.account_number}
                            name="ifsc_code"
                            value={account.account_number}
                            checked={selectedAccount === account.account_number}
                            onChange={(event) =>
                              handleRadioChange(event, account.account_number)
                            }
                          />
                          <label htmlFor={account.account_number}>
                            {account.ifsc_code}
                          </label>
                        </>
                      ) : (
                        <div>Link your bank account first.</div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
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
                      src={userProfilePic}
                      style={{
                        width: "30vh",
                        height: "30vh",
                        borderRadius: "50%",
                      }}
                      alt=""
                    />
                  </div>
                  <div>
                    <h1>Your Info...</h1>
                    <div>
                      <b>Full Name :</b> <span>{username}</span> <br />
                      <b>Mobile Number :</b> <span>{mobile}</span> <br />
                      <b>Email :</b> <span>{email}</span> <br />
                      {selectedAccount && (
                        <>
                          <b>Selected Account Balance :</b>{" "}
                          <span>{balance}</span> <br />
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {currentContent === "newPayment" && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <div className="shadow-lg">
                <div
                  style={{
                    border: "1px solid black",
                    width: "60vh",
                    borderBottom: "none",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "1vh",
                  }}
                >
                  <div>Select an Existing User :</div>
                  <div>
                    <select onChange={handleUserSelect}>
                      <option value="">Select User</option>
                      {userEmails.map((email, index) => (
                        <option key={index} value={email}>
                          {email}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div
                  style={{
                    border: "1px solid black",
                    display: "flex",
                    flexDirection: "row",
                    width: "60vh",
                  }}
                >
                  <div
                    style={{
                      borderRight: "1px solid black",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <button
                      className="btn btn-secondary m-2"
                      onClick={() => {
                        handlePaymentButton("tobank");
                      }}
                    >
                      To Bank
                    </button>
                    <button
                      className="btn btn-secondary m-2"
                      onClick={() => {
                        handlePaymentButton("tomobile");
                      }}
                    >
                      To Mobile
                    </button>
                    <button
                      className="btn btn-secondary m-2"
                      onClick={() => {
                        handlePaymentButton("toupi");
                      }}
                    >
                      To Upi
                    </button>
                  </div>
                  <div>
                    {paymentContent === "default" && (
                      <div
                        style={{
                          height: "60vh",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {selectedUser !== null && (
                          <form
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                              justifyContent: "center",
                              margin: "1vh",
                            }}
                            onSubmit={handleSubmit}
                          >
                            <h4 style={{ textAlign: "center" }}>
                              Pay via Bank
                            </h4>
                            <input
                              type="text"
                              name="accountNumber"
                              required
                              onChange={handleChange}
                              placeholder="Enter Account Number"
                              className="form-control"
                              defaultValue={selectedUser.account_number || ""}
                            />
                            <br />
                            <input
                              type="text"
                              required
                              onChange={handleChange}
                              name="customerId"
                              placeholder="Enter Customer ID"
                              className="form-control"
                              defaultValue={selectedUser.customer_id || ""}
                            />
                            <br />
                            <input
                              type="text"
                              required
                              onChange={handleChange}
                              name="ifscCode"
                              placeholder="Enter IFSC Code"
                              className="form-control"
                              defaultValue={selectedUser.ifsc_code || ""}
                            />
                            <br />
                            <input
                              type="number"
                              required
                              name="amount"
                              onChange={handleChange}
                              placeholder="Enter Amount"
                              className="form-control"
                            />
                            <br />
                            <button type="submit" className="btn btn-primary">
                              Pay
                            </button>
                            {paymentMessage && (
                              <div
                                style={{
                                  marginTop: "1rem",
                                  color: paymentMessage.success
                                    ? "green"
                                    : "red",
                                }}
                              >
                                {paymentMessage.text}
                              </div>
                            )}
                          </form>
                        )}
                      </div>
                    )}
                    {paymentContent === "tobank" && (
                      <div
                        style={{
                          height: "60vh",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {selectedUser !== null && (
                          <form
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                              justifyContent: "center",
                              margin: "1vh",
                            }}
                            onSubmit={handleSubmit}
                          >
                            <h4 style={{ textAlign: "center" }}>
                              Pay via Bank
                            </h4>
                            <input
                              type="text"
                              name="accountNumber"
                              required
                              onChange={handleChange}
                              placeholder="Enter Account Number"
                              className="form-control"
                              defaultValue={selectedUser.account_number || ""}
                            />
                            <br />
                            <input
                              type="text"
                              required
                              onChange={handleChange}
                              name="customerId"
                              placeholder="Enter Customer ID"
                              className="form-control"
                              defaultValue={selectedUser.customer_id || ""}
                            />
                            <br />
                            <input
                              type="text"
                              required
                              onChange={handleChange}
                              name="ifscCode"
                              placeholder="Enter IFSC Code"
                              className="form-control"
                              defaultValue={selectedUser.ifsc_code || ""}
                            />
                            <br />
                            <input
                              type="number"
                              required
                              name="amount"
                              onChange={handleChange}
                              placeholder="Enter Amount"
                              className="form-control"
                            />
                            <br />
                            <button type="submit" className="btn btn-primary">
                              Pay
                            </button>
                            {paymentMessage && (
                              <div
                                style={{
                                  marginTop: "1rem",
                                  color: paymentMessage.success
                                    ? "green"
                                    : "red",
                                }}
                              >
                                {paymentMessage.text}
                              </div>
                            )}
                          </form>
                        )}
                      </div>
                    )}
                    {paymentContent === "tomobile" && (
                      <div
                        style={{
                          height: "60vh",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {selectedUser !== null && (
                          <form
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                              justifyContent: "center",
                              margin: "1vh",
                              height: "30vh",
                            }}
                            onSubmit={handleMobSubmit}
                          >
                            <h4 style={{ textAlign: "center" }}>
                              Pay via Mobile
                            </h4>
                            <input
                              type="text"
                              name="mobileNumber"
                              required
                              onChange={handleMobChange}
                              placeholder="Enter Mobile Number"
                              className="form-control"
                              defaultValue={selectedUser.mobile_number || ""}
                            />
                            <br />
                            <input
                              type="text"
                              onChange={handleMobChange}
                              placeholder="Enter Amount"
                              required
                              className="form-control"
                              name="amount"
                            />
                            <br />
                            <button type="submit" className="btn btn-primary">
                              Pay
                            </button>
                            {paymentMobMessage && (
                              <div
                                style={{
                                  marginTop: "1rem",
                                  color: paymentMobMessage.success
                                    ? "green"
                                    : "red",
                                }}
                              >
                                {paymentMobMessage.text}
                              </div>
                            )}
                          </form>
                        )}
                      </div>
                    )}
                    {paymentContent === "toupi" && (
                      <div
                        style={{
                          height: "60vh",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {selectedUser !== null && (
                          <form
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                              justifyContent: "center",
                              margin: "1vh",
                              height: "30vh",
                            }}
                            onSubmit={handleUpiSubmit}
                          >
                            <h4 style={{ textAlign: "center" }}>Pay via Upi</h4>
                            <input
                              type="text"
                              placeholder="Enter Upi ID"
                              defaultValue={selectedUser.upi_id || ""}
                              className="form-control"
                              required
                              name="upiId"
                              onChange={handleUpiChange}
                            />
                            <br />
                            <input
                              type="number"
                              placeholder="Enter Amount"
                              required
                              className="form-control"
                              name="amount"
                              onChange={handleUpiChange}
                            />
                            <br />
                            <button type="submit" className="btn btn-primary">
                              Pay
                            </button>
                            {paymentUpiMessage && (
                              <div
                                style={{
                                  marginTop: "1rem",
                                  color: paymentUpiMessage.success
                                    ? "green"
                                    : "red",
                                }}
                              >
                                {paymentUpiMessage.text}
                              </div>
                            )}
                          </form>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
          {currentContent === "linkBankAccount" && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  border: "1px solid black",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div
                  style={{
                    fontSize: "3vh",
                    marginBottom: "2vh",
                    backgroundColor: "grey",
                    width: "40vh",
                    padding: "2vh",
                    borderBottom: "1px solid black",
                  }}
                >
                  Link Bank Account
                </div>
                <form
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  onSubmit={handleFormSubmit}
                >
                  <input
                    type="text"
                    placeholder="Enter Account Number"
                    value={accountNumber}
                    onChange={(e) => setAccountNumber(e.target.value)}
                    required
                  />
                  <br />
                  <input
                    type="text"
                    placeholder="Enter Customer ID"
                    value={customerId}
                    onChange={(e) => setCustomerId(e.target.value)}
                    required
                  />
                  <br />
                  <input
                    type="text"
                    placeholder="Enter IFSC code"
                    value={ifscCode}
                    onChange={(e) => setIfscCode(e.target.value)}
                    required
                  />
                  <br />
                  <button type="submit" className="btn btn-primary mb-2">
                    Link Account
                  </button>
                  {message && (
                    <div
                      style={{
                        color: message.type === "success" ? "green" : "red",
                      }}
                    >
                      {message.text}
                    </div>
                  )}
                </form>
              </div>
            </div>
          )}
          {currentContent === "transactionHistory" && (
            <div>
              {userTransLoading ? (
                <div>Loading...</div>
              ) : userTransError ? (
                <div>Error: {userTransError}</div>
              ) : (
                <div
                  className="tiles-container"
                  style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}
                >
                  {userTransData.map((transaction) => (
                    <div
                      key={transaction.id}
                      className="tile"
                      style={{
                        border: "1px solid black",
                        padding: "10px",
                        borderRadius: "5px",
                        backgroundColor: "#f0f0f0",
                        width: "auto",
                      }}
                    >
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
                      <div>
                        <b>From Username:</b> {transaction.from_username}
                      </div>
                      <div>
                        <b>To Username:</b> {transaction.to_username}
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
              )}
            </div>
          )}
          {currentContent === "showAllBanks" && (
            <div>
              <h1>User Details</h1>
              {userDetails.length > 0 ? (
                <table
                  style={{
                    border: "1px solid black",
                    borderCollapse: "collapse",
                  }}
                >
                  <thead>
                    <tr>
                      <th style={{ border: "1px solid black" }}>IFSC code</th>
                      <th style={{ border: "1px solid black" }}>
                        Account Number
                      </th>
                      <th style={{ border: "1px solid black" }}>Customer ID</th>
                      <th style={{ border: "1px solid black" }}>Upi ID</th>
                      <th style={{ border: "1px solid black" }}>Balance</th>
                      <th style={{ border: "1px solid black" }}>
                        Primary Account
                      </th>
                      <th style={{ border: "1px solid black" }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userDetails.map((user, index) => (
                      <tr key={index}>
                        <td
                          style={{ border: "1px solid black", padding: "8px" }}
                        >
                          {user.ifsc_code}
                        </td>
                        <td
                          style={{ border: "1px solid black", padding: "8px" }}
                        >
                          {user.account_number}
                        </td>
                        <td
                          style={{ border: "1px solid black", padding: "8px" }}
                        >
                          {user.customer_id}
                        </td>
                        <td
                          style={{ border: "1px solid black", padding: "8px" }}
                        >
                          {user.upi_id}
                        </td>
                        <td
                          style={{ border: "1px solid black", padding: "8px" }}
                        >
                          {user.balance}
                        </td>
                        <td
                          style={{ border: "1px solid black", padding: "8px" }}
                        >
                          {user.is_primary ? "Yes" : "No"}
                        </td>
                        <td
                          style={{ border: "1px solid black", padding: "8px" }}
                        >
                          <button
                            onClick={() => handleUnlink(user.account_number)}
                            className="btn btn-danger"
                          >
                            Unlink
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div>No Linked Bank Accounts</div>
              )}
            </div>
          )}
          {currentContent === "settings" && (
            <div>
              <div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <div
                    style={{
                      border: "1px solid black",
                      borderRadius: "5px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexDirection: "column",
                      padding: "3vh",
                      width: "auto",
                    }}
                  >
                    <div
                      style={{
                        margin: "3vh",
                        borderRadius: "50%",
                        fontSize: "10vh",
                        width: "15vh",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        height: "auto",
                        backgroundColor: backgroundColor,
                        color: "whitesmoke",
                        fontFamily: "times new roman",
                      }}
                    >
                      {username[0]}
                    </div>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <div>
                        <b>Full Name :</b>
                        {username}
                      </div>
                      <div>
                        <b>Mobile Number :</b>
                        {mobile}
                      </div>
                      <div>
                        <b>Email :</b>
                        {email}
                      </div>
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

export default UserDashboard;
