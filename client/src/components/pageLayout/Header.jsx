import React from "react";
import "../../index.css";

export default function Header() {
  return (
    <>
      <nav className="nav-container">
        <div className="navbar-brand">
          <a href="" className="Logo">
            Logo
          </a>
        </div>
        <div className="formContainer">
          <form action="" method="get">
            <div className="input-group">
              <input
                type="text"
                id="search_field"
                aria-describedby="search_btn"
                className="form-control"
                placeholder="Enter Product Name ..."
                name="keyword"
              />
              <button id="search_btn" className="btn" type="submit">
                <i className="fa fa-search" aria-hidden="true"></i>
              </button>
            </div>
          </form>
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
