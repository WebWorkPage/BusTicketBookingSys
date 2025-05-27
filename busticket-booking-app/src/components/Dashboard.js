import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Dashboard = () => {

  const location = useLocation(); //to get the parameter passed when navigated to this (Dashboard) comp
  const query = new URLSearchParams(location.search);

  console.log("location ",query.get('user'),location);
  const{ User,Token, role } = location.state;
  let navigate = useNavigate();

  const[user, setUser] = useState(User);
  const[token,setToken] = useState(Token);

  const logOut = () => {
    setUser(null);
    setToken("");
    localStorage.removeItem("token");
    navigate("/page/login");
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">

      <div className="container">
        <a className="navbar-brand" href="#">Bus Ticket Booking</a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">

            {/* Bus Dropdown */}
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="busDropdown" data-bs-toggle="dropdown">
                Bus
              </a>
              <ul className="dropdown-menu">
                { role === "admin" && <li><a className="dropdown-item" href="#">Add Bus</a></li> }
                <li><a className="dropdown-item" href="#">Bus List</a></li>
              </ul>
            </li>

            {/* Users Dropdown */}
            {
              role != "user" && (
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="#" id="usersDropdown" data-bs-toggle="dropdown">
                    Users
                  </a>
                  <ul className="dropdown-menu">
                    <li><a className="dropdown-item" href="#">Add User</a></li>
                    <li><a className="dropdown-item" href="#">User List</a></li>
                  </ul>
                </li> )
            }

            {/* Booking Dropdown */}
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="bookingDropdown" data-bs-toggle="dropdown">
                Booking
              </a>
              <ul className="dropdown-menu">
                <li><a className="dropdown-item" href="#">Booking History</a></li>
              </ul>
            </li>

            {/* Payment Dropdown */}
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="paymentDropdown" data-bs-toggle="dropdown">
                Payment
              </a>
              <ul className="dropdown-menu">
                <li><a className="dropdown-item" href="#">Transaction History</a></li>
              </ul>
            </li>

            {/* Logout Button */}
            <li className="nav-item">
              <button type="button" className="btn btn-danger ms-3" onClick={logOut}>Logout</button>
            </li>
          </ul>
        </div>
      </div>

    </nav>
  );
};

export default Dashboard;
