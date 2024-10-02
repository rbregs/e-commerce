import React, { useEffect, useState, useRef } from "react";
import "../../index.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Search from "./Search";
import { useGetMeQuery } from "../../redux/api/userApi";
import { useSelector } from "react-redux";
import { useLazyLogoutQuery } from "../../redux/api/autApi";
import { NavLink } from "react-router-dom";

export default function Header() {
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);
  const { isLoading } = useGetMeQuery();
  const navigate = useNavigate();
  const location = useLocation();
  const [logout, { isSuccess }] = useLazyLogoutQuery();
  const [navbar, setNavbar] = useState(false);

  const [showSearch, setShowSearch] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const searchContainerRef = useRef(null);
  const searchIconRef = useRef(null);

  useEffect(() => {
    if (isSuccess) navigate(0);
  }, [isSuccess, navigate]);

  const logoutHandler = () => {
    logout();
  };

  const handleClickOutside = (e) => {
    if (
      searchContainerRef.current &&
      !searchContainerRef.current.contains(e.target) &&
      searchIconRef.current &&
      !searchIconRef.current.contains(e.target)
    ) {
      setShowSearch(false);
      console.log("clicked outside");
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // const isAuthPage = location.pathname === "/login" || location.pathname === "/register";

  return (
    <>
      <nav className="navbar navbar-expand-lg ">
        <button
          className="navbar-toggler"
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-controls="navbarNav"
          aria-expanded={menuOpen}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <Link to="/" className="navbar-brand mx-auto ms-5">
          Logo
        </Link>

        <div
          className={`collapse navbar-collapse ${menuOpen ? "show" : ""}`}
          id="navbarNav"
        >
          <div className="navbar-nav">
            <NavLink
              to="/"
              className="nav-link ms-2"
              activeclassname="active"
              exact="true"
              style={({ isActive }) => {
                return {
                  fontWeight: isActive ? "bold" : "",
                  color: isActive ? "#EC407A" : "black",
                };
              }}
            >
              Home
            </NavLink>
            <NavLink
              to="/about"
              className="nav-link ms-2"
              activeclassname="active"
              style={({ isActive }) => {
                return {
                  fontWeight: isActive ? "bold" : "",
                  color: isActive ? "#EC407A" : "black",
                };
              }}
            >
              About
            </NavLink>
            <NavLink
              to="/products"
              className="nav-link ms-2"
              activeclassname="active"
              style={({ isActive }) => {
                return {
                  fontWeight: isActive ? "bold" : "",
                  color: isActive ? "#EC407A" : "black",
                };
              }}
            >
              Products
            </NavLink>
            <NavLink
              to="/blogs"
              className="nav-link ms-2"
              activeclassname="active"
              style={({ isActive }) => {
                return {
                  fontWeight: isActive ? "bold" : "",
                  color: isActive ? "#EC407A" : "black",
                };
              }}
            >
              Blog
            </NavLink>
          </div>
        </div>

        <div className=" d-flex align-items-center">
          <span className="shoppingCartSpan p-2 m-0">
            <Link to ="/cart" className="shoppingCart">
              <i className="fa-solid fa-cart-shopping"></i> {cartItems?.length}
            </Link>
          </span>

          {user ? (
            <div className="dropdown">
              <button
                className="btn dropdown-toggle d-flex align-items-center"
                type="button"
                id="dropDownMenuButton"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <figure className="avatar avatar-nav me-2 mb-0">
                  <img
                    src={
                      user?.avatar
                        ? user?.avatar.url
                        : "../public/images/avatar.png"
                    }
                    className="rounded-circle"
                    style={{
                      width: "40px",
                      height: "40px",
                      objectFit: "cover",
                    }}
                    // alt="User Avatar"
                  />
                </figure>
                <span className="p-2">{user?.name}</span>
              </button>
              <ul
                className="dropdown-menu"
                aria-labelledby="dropDownMenuButton"
              >
                {user?.role === "admin" && (
                  <li>
                    <a className="dropdown-item" href="/admin/dashboard">
                      Dashboard
                    </a>
                  </li>
                )}

                <li>
                  <a className="dropdown-item" href="/me/orders">
                    Orders
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="/me/profile">
                    Profile
                  </a>
                </li>
                <li>
                  <Link
                    to="/"
                    className="dropdown-item text-danger"
                    onClick={logoutHandler}
                  >
                    Logout
                  </Link>
                </li>
              </ul>
            </div>
          ) : (
            <Link to="/login" className="btn" id="login_btn">
              <i className="addPadding fa-regular fa-user"></i>
            </Link>
          )}

          <i
            ref={searchIconRef}
            className="addPadding fa-solid fa-magnifying-glass me-5"
            onClick={(e) => {
              console.log("clicked search");
              e.stopPropagation();
              setShowSearch(true);
            }}
          ></i>
        </div>
      </nav>

      {showSearch && (
        <div
          ref={searchContainerRef}
          className="search-container container-fluid m-0 p-0"
        >
          <div className="row">
            <div className="col-12">
              <form className="search my-2" action="" method="get">
                <div className="input-group">
                  <button id="search_btn" className="btn" type="submit">
                    <i className="fa fa-search" aria-hidden="true"></i>
                  </button>
                  <input
                    type="text"
                    id="search_field"
                    aria-describedby="search_btn"
                    className="form-control"
                    placeholder="Enter Product Name ..."
                    name="keyword"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
