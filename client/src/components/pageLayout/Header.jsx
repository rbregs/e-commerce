import React, { useEffect } from "react";
import "../../index.css";
import { Link, useNavigate } from "react-router-dom";
import Search from "./Search";
import { useGetMeQuery } from "../../redux/api/userApi";
import { useSelector } from "react-redux";
import { useLazyLogoutQuery } from "../../redux/api/autApi";

export default function Header() {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const { isLoading } = useGetMeQuery();
  const navigate = useNavigate();
  const [logout, { isSuccess }] = useLazyLogoutQuery();


  useEffect(() => {
    if (isSuccess) navigate(0); 
  }, [isSuccess, navigate]);

  const logoutHandler = () => {
    logout();
  };

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
          {user ? (
            <div className="dropdown">
              <button className="dropdown-toggle" type="button">
                <figure className="avatar-nav">
                  <img
                    src={user?.avatar ? user?.avatar.url : "../public/images/avatar.png"}
                  />
                </figure>
                <span> {user?.name}</span>
              </button>
              <div className="dropdown-menu">
                <Link className="dropdown-item" to="/admin/dashboard">
                  Dashboard
                </Link>
                <Link className="dropdown-item" to="/me/orders">
                  Orders
                </Link>
                <Link className="dropdown-item" to="/me/profile">
                  Profile
                </Link>
                <Link className="dropdown-item text-danger" to="/" onClick={logoutHandler}>
                  Logout
                </Link>
              </div>
            </div>
          ) : (
            !isLoading && (
              <Link to="/login" className="btnLogin" id="login_btn">
                Login
              </Link>
            )
          )}
        </div>
      </nav>
    </>
  );
}
