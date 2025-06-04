import React, { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";

const Dashboard = () => {

    const location = useLocation(); //to get the parameter passed when navigated to this (Dashboard) comp
    // const query = new URLSearchParams(location.search);

    // console.log("location ",query.get('user'),location);
    console.log("location ",location);
    let navigate = useNavigate();

    const[loginDetails, setLoginDetails] = useState({
      user : location.state.User,
      userId : location.state.UserId,
      token : location.state.token,
      role: location.state.Role
    });

    const logOut = () => {
      setLoginDetails((prevState) => {
        return {...prevState, user: "", userId: "", token: "", role: ""}
      })
      localStorage.removeItem("token");
      navigate("/page/login");
    }

    return (
      <>
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
                <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown">Bus</a>
                <ul className="dropdown-menu">
                  { loginDetails.role && loginDetails.role === "admin" && 
                      <li>
                        <Link to="/addbus" className="dropdown-item">Add Bus</Link>
                      </li> 
                  }
                  <li><Link to="/buslist" state={{userId:loginDetails.userId, role:loginDetails.role}} className="dropdown-item">Bus List</Link></li>
                </ul> 
              </li>

              {/* Users Dropdown */}
              {
                loginDetails.role && loginDetails.role != "user" && (
                  <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" id="usersDropdown" data-bs-toggle="dropdown">
                      Users
                    </a>
                    <ul className="dropdown-menu">
                      <li><Link to="/signup" className="dropdown-item"> Add User </Link></li>
                      <li><Link to="/userlist" className="dropdown-item"> User List </Link></li>
                    </ul>
                  </li> )
              }

              {/* Booking Dropdown */}
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" id="bookingDropdown" data-bs-toggle="dropdown">
                  Booking
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <Link to={loginDetails.role && loginDetails.role === "user" ? `/bookinghistory/${loginDetails.userId}` : "/bookinghistory"} className="dropdown-item">Booking History</Link>
                  </li>
                </ul>
              </li>

              {/* Payment Dropdown */}
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" id="paymentDropdown" data-bs-toggle="dropdown">
                  Payment
                </a>
                <ul className="dropdown-menu">
                  <li><Link to={loginDetails.role && loginDetails.role === "user" ? `/paymenthistory/${loginDetails.userId}` : "/paymenthistory"} className="dropdown-item">Transaction History</Link></li>
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
      <div className="d-flex justify-content-center align-items-center" style={{"min-height": "60vh"}}>
        <h2>{loginDetails.role === "admin" ? `Welcome, ${loginDetails.role}` : `Welcome, ${loginDetails.user}`}</h2>
      </div>
      </>
    );
};

export default Dashboard;
