import React from "react";
import "../../index.css";
import { Link } from "react-router-dom";
import Search from "./Search";

export default function Header() {
  return (
    <>
      <nav className="nav-container">
        <div className="navbar-brand">
          <Link to="/" className="Logo">
            Logo
          </Link>
        </div>
        <div className="formContainer">
          <Search />
        </div>
        <div className="nav-right">
          <a href="/cart">
            <span id="cart" className="ms-3">
              Cart
            </span>
            <span className="Count" id="cart_count">
              0
            </span>
          </a>
          <div className="dropdown">
            <button className="dropdown-toggle" type="button">
              <figure className="avatar-nav">
                <img
                  src="../images/avatar.png"
                  className="rounded-circle"
                  alt="User Avatar"
                />
              </figure>
              <span>User</span>
            </button>
            <div className="dropdown-menu">
              <a className="dropdown-item" href="/admin/dashboard">
                Dashboard
              </a>
              <a className="dropdown-item" href="/me/orders">
                Orders
              </a>
              <a className="dropdown-item" href="/me/profile">
                Profile
              </a>
              <a className="dropdown-item text-danger" href="/">
                Logout
              </a>
            </div>
          </div>
          <a href="/login" className="btnLogin" id="login_btn">
            Login
          </a>
        </div>
      </nav>
    </>
  );
}
