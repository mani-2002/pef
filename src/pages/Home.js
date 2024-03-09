import React from "react";
import logo from "../images/logo.jpeg";
import home_img from "../images/home_img.png";
import active1 from "../images/active1.jpg";
import active2 from "../images/active2.jpg";
import active3 from "../images/active3.jpg";
import active4 from "../images/active4.jpg";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import client1 from "../images/client1.png";
import client2 from "../images/client2.png";
import client3 from "../images/client3.png";
import client4 from "../images/client4.png";
import client5 from "../images/client5.jpeg";
import client6 from "../images/client6.jpeg";
import client7 from "../images/client7.png";
import client8 from "../images/client8.jpeg";
import client9 from "../images/client9.jpg";
import client10 from "../images/client10.png";
import { Carousel } from "react-bootstrap";
import rightImg from "../images/rightImg.png";
import adverVideo from "../images/adver_video.mp4";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faSquareInstagram } from "@fortawesome/free-brands-svg-icons";

function Home() {
  const imageUrl =
    "https://www.checkmark.com/images/payroll/payroll-software-for-smal-business.gif.gif";
  const easyPayment =
    "https://media.giphy.com/media/EopV0wKH3USE9F7fhe/giphy.gif";
  const featurePayment =
    "https://cdn.dribbble.com/users/690781/screenshots/11486982/media/2a27567015101f3fb547a9021908d7fb.gif";
  const secureTransactions =
    "https://cdn.dribbble.com/users/2514124/screenshots/5474610/crypto6_3.gif";
  const appStore =
    "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Download_on_the_App_Store_Badge.svg/800px-Download_on_the_App_Store_Badge.svg.png";
  const playStore =
    "https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png";
  const securePayment =
    "https://i.pinimg.com/originals/6c/59/8b/6c598b8cb38df244eda78f8eb2f6c425.gif";
  const fastTrasactions =
    "https://i.pinimg.com/originals/f8/c4/22/f8c422a0a0e6793b3f9113d419c5143a.gif";
  const customerSupport =
    "https://upload.wikimedia.org/wikipedia/commons/5/5f/Logo_%281%29.gif";
  const instantPay =
    "https://media2.giphy.com/media/dXA3PWmKrnEg65XVfO/giphy.gif";
  const invoice =
    "https://cdn.dribbble.com/users/846207/screenshots/6637248/invoice_receipt_animation.gif";
  const contactLess =
    "https://assets-v2.lottiefiles.com/a/e783536a-1162-11ee-94c6-3f7443c11520/t2e1bTg3GI.gif";
  const integratedPayment =
    "https://www.aalpha.net/wp-content/uploads/2021/05/integrate-payment-gateway.gif";
  const safeAndSecure =
    "https://media1.tenor.com/m/9AOxsBcTwyQAAAAC/safety-security.gif";
  const deviceCompatible =
    "https://cdn.dribbble.com/users/346181/screenshots/2332642/media/1fbb93c904c24d89ec0ae7b3e013360e.gif";
  const reliableAndOrganized =
    "https://mysaralpay.com/images/Utility-Payment-centre.gif";
  const fastProcess =
    "https://www.cashlesso.com/wp-content/uploads/2020/03/19-March-Final-animation.gif";
  return (
    <div>
      <div style={{ padding: "5vh 5vh 5vh 5vh" }}>
        <div className="d-flex">
          <div>
            <div style={{ fontSize: "8.5vh" }}>
              Offering Convenience And Hassle-Free Transactions...
            </div>
            <div style={{ padding: "0 3vh 0 1vh" }}>
              An RBI Authorized Payment Aggregator, we ensure your transactions
              are secure.
            </div>
            <div style={{ margin: "3vh 0 3vh 1vh" }}>
              <button className="btn btn-primary">
                <Link
                  to="/login"
                  style={{ textDecoration: "none", color: "white" }}
                >
                  Login
                </Link>
              </button>
              <button
                style={{ marginLeft: "2vh" }}
                className="btn btn-secondary"
              >
                <Link
                  to="/signup"
                  style={{ textDecoration: "none", color: "white" }}
                >
                  Signup
                </Link>
              </button>
            </div>
            <div style={{ display: "flex" }}>
              <div style={{ margin: "1vh 0 0 0" }}>
                <img
                  src={active1}
                  alt=""
                  style={{ width: "8vh", height: "8vh", borderRadius: "50%" }}
                />
                <img
                  src={active2}
                  alt=""
                  style={{
                    width: "8vh",
                    height: "8vh",
                    borderRadius: "50%",
                    marginLeft: "-2vh",
                  }}
                />
                <img
                  src={active3}
                  alt=""
                  style={{
                    width: "8vh",
                    height: "8vh",
                    borderRadius: "50%",
                    marginLeft: "-2vh",
                  }}
                />
                <img
                  src={active4}
                  alt=""
                  style={{
                    width: "8vh",
                    height: "8vh",
                    borderRadius: "50%",
                    marginLeft: "-2vh",
                  }}
                />
              </div>
              <div style={{ marginTop: "1vh", marginLeft: "1vh" }}>
                <div>140k+</div>
                <div>Active users</div>
              </div>
            </div>
          </div>
          <div>
            <img
              src={home_img}
              alt=""
              style={{ height: "80vh", width: "120vh" }}
            />
          </div>
        </div>
        <div
          style={{
            marginTop: "5vh",
            fontWeight: "bold",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div style={{ fontSize: "4vh", marginTop: "7vh" }}>
            Some of our Trusted Partners
          </div>
          <Carousel
            interval={2000}
            pause={false}
            wrap={true}
            touch={true}
            indicators={false}
            controls={false}
            fade={false}
            style={{ cursor: "pointer", marginTop: "2vh" }}
          >
            <Carousel.Item>
              <div style={{ display: "flex" }}>
                <img
                  className="d-block w-10"
                  src={client1}
                  alt=""
                  style={{ width: "31vh", height: "18vh", margin: "0 3vh" }}
                />
                <img
                  className="d-block w-10"
                  src={client2}
                  alt=""
                  style={{ width: "31vh", height: "18vh", margin: "0 3vh" }}
                />
                <img
                  className="d-block w-10"
                  src={client3}
                  alt=""
                  style={{ width: "31vh", height: "18vh", margin: "0 3vh" }}
                />
                <img
                  className="d-block w-10"
                  src={client4}
                  alt=""
                  style={{ width: "31vh", height: "18vh", margin: "0 3vh" }}
                />
                <img
                  className="d-block w-10"
                  src={client5}
                  alt=""
                  style={{ width: "31vh", height: "18vh", margin: "0 3vh" }}
                />
              </div>
            </Carousel.Item>
            <Carousel.Item>
              <div style={{ display: "flex" }}>
                <img
                  className="d-block w-10"
                  src={client6}
                  alt=""
                  style={{ width: "31vh", height: "18vh", margin: "0 3vh" }}
                />
                <img
                  className="d-block w-10"
                  src={client7}
                  alt=""
                  style={{ width: "31vh", height: "18vh", margin: "0 3vh" }}
                />
                <img
                  className="d-block w-10"
                  src={client8}
                  alt=""
                  style={{ width: "31vh", height: "18vh", margin: "0 3vh" }}
                />
                <img
                  className="d-block w-10"
                  src={client9}
                  alt=""
                  style={{ width: "31vh", height: "18vh", margin: "0 3vh" }}
                />
                <img
                  className="d-block w-10"
                  src={client10}
                  alt=""
                  style={{ width: "31vh", height: "18vh", margin: "0 3vh" }}
                />
              </div>
            </Carousel.Item>
          </Carousel>
        </div>
        <div
          style={{
            margin: "15vh 0 0 5vh",
            display: "flex",
            flexDirection: "row",
          }}
        >
          <div>
            <img src={imageUrl} alt="" />
          </div>
          <div style={{ marginLeft: "5vh" }}>
            <div style={{ fontSize: "4vh" }}>About MANIPE...</div>
            <div style={{ fontSize: "9vh" }}>
              Make Your Transactions Quick and Easy...
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-around",
              }}
            >
              <div
                style={{
                  padding: "1vh",
                  width: "30vh",
                  background: "orange",
                  overflow: "auto",
                  wordWrap: "break-word",
                  height: "29vh",
                }}
                className="shadow-lg"
              >
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <img
                    src={easyPayment}
                    alt=""
                    style={{ height: "15vh", width: "15vh" }}
                  />
                </div>
                <div style={{ textAlign: "center" }}>Easy Payment</div>
              </div>
              <div
                style={{
                  padding: "1vh",
                  width: "30vh",
                  background: "orange",
                  overflow: "auto",
                  wordWrap: "break-word",
                  height: "29vh",
                }}
                className="shadow-lg"
              >
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <img
                    src={featurePayment}
                    alt=""
                    style={{ height: "12vh", width: "12vh", margin: "1.5vh 0" }}
                  />
                </div>
                <div style={{ textAlign: "center" }}>Amazing Features</div>
              </div>
              <div
                style={{
                  padding: "1vh",
                  width: "30vh",
                  background: "orange",
                  overflow: "auto",
                  wordWrap: "break-word",
                  height: "29vh",
                }}
                className="shadow-lg"
              >
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <img
                    src={secureTransactions}
                    alt=""
                    style={{ height: "12vh", width: "12vh", margin: "1.5vh 0" }}
                  />
                </div>
                <div style={{ textAlign: "center" }}>Secure Transactions</div>
              </div>
            </div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "6vh 0 6vh 0",
          }}
        >
          <div style={{ padding: "0 13vh" }}>
            <div style={{ fontSize: "5vh" }}>140K+</div>
            <div>Active users</div>
          </div>
          <div style={{ borderLeft: "1px solid black", padding: "0 13vh" }}>
            <div style={{ fontSize: "5vh" }}>12K+</div>
            <div>Total Downloads</div>
          </div>
          <div style={{ borderLeft: "1px solid black", padding: "0 13vh" }}>
            <div style={{ fontSize: "5vh" }}>99.5%</div>
            <div>Positive Feedback</div>
          </div>
          <div style={{ borderLeft: "1px solid black", padding: "0 13vh" }}>
            <div style={{ fontSize: "5vh" }}>₹ 12M+</div>
            <div>Total Transaction</div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div style={{ margin: "5vh" }}>
            <div style={{ fontSize: "3vh" }}>Mindful Design</div>
            <div style={{ fontSize: "10vh" }}>
              The New Way of Doing Business
            </div>
            <div style={{ margin: "0 10vh 0 1vh" }}>
              A web-based payment service that allows users to recharge their
              phone, pay bills, and make purchases online.
            </div>
            <div
              style={{
                display: "flex",
                marginTop: "1vh",
                marginLeft: "1vh",
                alignItems: "center",
              }}
            >
              <div>
                <img
                  src={appStore}
                  alt=""
                  style={{ height: "10vh", width: "30vh" }}
                />
              </div>
              <div>
                <img
                  src={playStore}
                  alt=""
                  style={{ height: "15vh", width: "30vh" }}
                />
              </div>
            </div>
          </div>
          <div>
            <img src={rightImg} alt="" />
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "5vh",
          }}
        >
          <div style={{ fontSize: "3vh" }}>Our Features</div>
          <div style={{ fontSize: "7vh" }}>Cashless Payments Made Possible</div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gridTemplateRows: "repeat(2)",
              paddingTop: "5vh",
            }}
          >
            <div
              style={{
                display: "flex",
                border: "1px solid black",
                margin: "2vh",
                justifyContent: "center",
                padding: "1vh",
                width: "60vh",
                height: "50vh",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <img
                src={securePayment}
                alt=""
                style={{ width: "30vh", height: "30vh" }}
              />
              100% Secure
            </div>
            <div
              style={{
                display: "flex",
                border: "1px solid black",
                margin: "2vh",
                justifyContent: "center",
                padding: "1vh",
                width: "60vh",
                height: "50vh",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <img
                src={fastTrasactions}
                alt=""
                style={{ width: "30vh", height: "30vh" }}
              />
              Faster Transactions
            </div>
            <div
              style={{
                display: "flex",
                border: "1px solid black",
                margin: "2vh",
                justifyContent: "center",
                padding: "1vh",
                width: "60vh",
                height: "50vh",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <img
                src={customerSupport}
                alt=""
                style={{ width: "30vh", height: "30vh" }}
              />
              24/7 Customer Service
            </div>
            <div
              style={{
                display: "flex",
                border: "1px solid black",
                margin: "2vh",
                justifyContent: "center",
                padding: "1vh",
                width: "60vh",
                height: "50vh",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <img
                src={instantPay}
                alt=""
                style={{ width: "30vh", height: "30vh" }}
              />
              Instant Pay
            </div>
            <div
              style={{
                display: "flex",
                border: "1px solid black",
                margin: "2vh",
                justifyContent: "center",
                padding: "1vh",
                width: "60vh",
                height: "50vh",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <img
                src={invoice}
                alt=""
                style={{ width: "30vh", height: "30vh" }}
              />
              Invoicing
            </div>
            <div
              style={{
                display: "flex",
                border: "1px solid black",
                margin: "2vh",
                justifyContent: "center",
                padding: "1vh",
                width: "60vh",
                height: "50vh",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <img
                src={contactLess}
                alt=""
                style={{ width: "30vh", height: "30vh" }}
              />
              Contactless technology payments
            </div>
          </div>
        </div>
        <div style={{ margin: "5vh", marginBottom: "5vh" }}>
          <div style={{ fontSize: "4vh" }}>Why Choose us</div>
          <div style={{ display: "flex" }}>
            <div style={{ fontSize: "7vh" }}>
              Best Trust Rating and Satisfaction
            </div>
            <div style={{ marginLeft: "auto" }}>
              <button className="btn btn-dark p-2">
                <Link
                  to="/login"
                  style={{ color: "white", textDecoration: "none" }}
                >
                  Get Started
                </Link>
              </button>
            </div>
          </div>
          <div>
            <div style={{ width: "100%", display: "flex", margin: "1vh" }}>
              <div
                style={{
                  border: "1px solid black",
                  width: "64%",
                  margin: "2vh",
                  display: "flex",
                  padding: "5vh",
                  alignItems: "center",
                }}
              >
                <div>
                  <b>Integrated Payment</b>
                  <div>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut
                    elit tellus, luctus nec ullamcorper mattis.
                    <br />
                    <button className="btn">
                      Learn More
                      <big> →</big>
                    </button>
                  </div>
                </div>
                <div>
                  <img
                    src={integratedPayment}
                    alt=""
                    style={{ width: "40vh", height: "25vh" }}
                  />
                </div>
              </div>
              <div
                style={{
                  border: "1px solid black",
                  width: "31%",
                  margin: "2vh",
                  padding: "5vh",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                }}
              >
                <div style={{ fontWeight: "bold" }}>safe and secure</div>
                <div>
                  <img
                    src={safeAndSecure}
                    alt=""
                    style={{ width: "40vh", height: "25vh" }}
                  />
                </div>
              </div>
            </div>
            <div style={{ width: "100%", display: "flex", margin: "1vh" }}>
              <div
                style={{
                  border: "1px solid black",
                  width: "31%",
                  margin: "2vh",
                  padding: "5vh",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                }}
              >
                <div style={{ fontWeight: "bold" }}>Device Compatible</div>
                <div>
                  <img
                    src={deviceCompatible}
                    alt=""
                    style={{ width: "40vh", height: "25vh" }}
                  />
                </div>
              </div>
              <div
                style={{
                  border: "1px solid black",
                  width: "31%",
                  margin: "2vh",
                  padding: "5vh",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                }}
              >
                <div style={{ fontWeight: "bold" }}>Reliable And Organized</div>
                <div>
                  <img
                    src={reliableAndOrganized}
                    alt=""
                    style={{ width: "40vh", height: "25vh" }}
                  />
                </div>
              </div>
              <div
                style={{
                  border: "1px solid black",
                  width: "31%",
                  margin: "2vh",
                  padding: "5vh",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                }}
              >
                <div style={{ fontWeight: "bold" }}>Fast Process</div>
                <div>
                  <img
                    src={fastProcess}
                    alt=""
                    style={{ width: "40vh", height: "25vh" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          style={{
            margin: "5vh",
            padding: "5vh 0",
            display: "flex",
            border: "1px solid black",
          }}
        >
          <video
            style={{ height: "50vh", width: "100vh", margin: "0 0 0 5vh" }}
            autoPlay
            loop
            muted
          >
            <source src={adverVideo} type="video/mp4" />
            Your browser does not support the video tag
          </video>
          <div style={{ margin: "0 0 0 5vh" }}>
            <div
              style={{
                fontWeight: "bold",
                fontSize: "3vh",
                display: "flex",
                flexDirection: "column",
              }}
            >
              How It Works ?
            </div>
            <div>
              The New Way of Money Transfer Fusce porta, felis et facilisis
              tincidunt, metus eros mollis nibh, venenatis tempor arcu massa a
              augue. Suspendisse mattis arcu mi, id fringilla urna accumsan in.
              Nam ornare nunc metus.
            </div>
          </div>
        </div>
        <div style={{ margin: "5vh", display: "flex", flexDirection: "row" }}>
          <div>PRICING PLAN</div>
          <div style={{ marginLeft: "auto" }}>
            <Link to="/contact">
              <button className="btn btn-dark">Contact us</button>
            </Link>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gridTemplateRows: "repeat(1)",
            }}
          >
            <div
              style={{
                border: "1px solid black",
                margin: "0 2vh",
                width: "60vh",
                padding: "4vh",
                borderRadius: "5px",
              }}
            >
              <div style={{ fontSize: "6vh" }}>
                <b>$9.50</b>
                <sub>/user</sub>
              </div>
              <div style={{ fontSize: "3vh" }}>Basic Plan</div>
              <div>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
                tellus.
              </div>
              <hr />
            </div>
            <div
              style={{
                border: "1px solid black",
                margin: "0 2vh",
                width: "60vh",
                borderRadius: "5px",
                padding: "4vh",
              }}
            >
              <div style={{ fontSize: "6vh" }}>
                <b>$10.50</b>
                <sub>/user</sub>
              </div>
              <div style={{ fontSize: "3vh" }}>Startup Plan</div>
              <div>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
                tellus.
              </div>
              <hr />
            </div>
            <div
              style={{
                border: "1px solid black",
                margin: "0 2vh",
                width: "60vh",
                borderRadius: "5px",
                padding: "4vh",
              }}
            >
              <div style={{ fontSize: "6vh" }}>
                <b>$12.00</b>
                <sub>/user</sub>
              </div>
              <div style={{ fontSize: "3vh" }}>Deluxe Plan</div>
              <div>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
                tellus.
              </div>
              <hr />
            </div>
          </div>
        </div>
      </div>
      <div
        style={{
          margin: "0",
          top: "0",
          left: "0",
          right: "0",
          backgroundColor: "black",
          color: "white",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            padding: "10vh",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "10px",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                width: "40vh",
                margin: "0 5vh 0 5vh",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  color: "white",
                  justifyContent: "left",
                }}
              >
                <img
                  src={logo}
                  alt="this is manipe logo"
                  style={{
                    width: "17vh",
                    height: "11vh",
                    cursor: "pointer",
                  }}
                />
                <span style={{ fontSize: "5vh" }}>Manipe</span>
              </div>
              <div>
                <p>Lorem ipsum dolor sit amet, consec tetur adipiscing elit.</p>
              </div>
              <div className="d-flex flex-row">
                <span
                  className="m-2"
                  style={{
                    cursor: "pointer",
                    border: "1px solid white",
                    borderRadius: "50%",
                    padding: "1vh",
                    backgroundColor: "lightblue",
                  }}
                >
                  <FontAwesomeIcon
                    icon={faFacebook}
                    style={{ width: "3.5vh", color: "black" }}
                    flip
                  />
                </span>
                <span
                  className="m-2"
                  style={{
                    cursor: "pointer",
                    border: "1px solid white",
                    borderRadius: "50%",
                    padding: "1vh",
                    backgroundColor: "lightblue",
                  }}
                >
                  <FontAwesomeIcon
                    icon={faGoogle}
                    style={{ width: "3.5vh", color: "black" }}
                    beat
                  />
                </span>
                <span
                  className="m-2"
                  style={{
                    cursor: "pointer",
                    border: "1px solid white",
                    borderRadius: "50%",
                    padding: "1vh",
                    backgroundColor: "lightblue",
                  }}
                >
                  <FontAwesomeIcon
                    icon={faLinkedin}
                    style={{ width: "3.5vh", color: "black" }}
                    bounce
                  />
                </span>
                <span
                  className="m-2"
                  style={{
                    cursor: "pointer",
                    border: "1px solid white",
                    borderRadius: "50%",
                    padding: "1vh",
                    backgroundColor: "lightblue",
                  }}
                >
                  <FontAwesomeIcon
                    icon={faSquareInstagram}
                    beatFade
                    style={{ width: "3.5vh", color: "black" }}
                  />
                </span>
              </div>
            </div>
            <div
              style={{
                width: "45vh",
                margin: "0 5vh 0 5vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: "3vh",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <h3 style={{ fontWeight: "bold" }}>Contact</h3>
                <div style={{ color: "grey" }}>+918522845343</div>
                <div style={{ color: "grey" }}>
                  manikantavinjamuri8522@gmail.com
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <h3 style={{ fontWeight: "bold" }}>Address</h3>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                    color: "grey",
                  }}
                >
                  <div>Plot No: 40, Rock Hills Colony,</div>
                  <div>Nalgonda(M), Nalgonda(D),</div>
                  <div>Telangana, India, 508001</div>
                </div>
              </div>
            </div>
            <div
              style={{
                width: "40vh",
                margin: "0 5vh 0 5vh",
                textAlign: "center",
                padding: "3vh",
              }}
            >
              <h3>Explore</h3>
            </div>
            <div
              style={{
                width: "40vh",
                margin: "0 5vh 0 5vh",
                display: "flex",
                flexDirection: "column",
                padding: "3vh",
              }}
            >
              <h3>Support</h3>
              <div>Help Center</div>
              <div>Privacy Policy</div>
              <div>Disclaimer</div>
              <div>FAQs</div>
              <div>Contact</div>
            </div>
          </div>
          <div style={{ padding: "3vh" }}>
            <div
              style={{
                width: "70vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                padding: "4vh",
              }}
            >
              <div style={{ fontSize: "4vh" }}>Download Manipe</div>
              <div style={{ color: "grey" }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
                tellus, luctus nec.
              </div>
              <div
                style={{
                  display: "flex",
                  marginTop: "1vh",
                  marginLeft: "1vh",
                  alignItems: "center",
                }}
              >
                <div>
                  <img
                    src={appStore}
                    alt=""
                    style={{ height: "10vh", width: "30vh" }}
                  />
                </div>
                <div>
                  <img
                    src={playStore}
                    alt=""
                    style={{ height: "15vh", width: "30vh" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            padding: "0 10vh 2.5vh 10vh",
          }}
        >
          <div>Copyright © 2024 Manipe</div>
          <div style={{ display: "flex", marginLeft: "auto" }}>
            <div>
              <Link to="/" style={{ textDecoration: "none", color: "white" }}>
                Privacy Policy
              </Link>
            </div>
            <div style={{ marginLeft: "3vh" }}>
              <Link to="/" style={{ textDecoration: "none", color: "white" }}>
                Terms & Services
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
