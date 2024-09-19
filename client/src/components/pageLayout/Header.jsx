import React, { useEffect, useState } from "react";
import "../../index.css";
import { Link, useNavigate } from "react-router-dom";
import Search from "./Search";
import { useGetMeQuery } from "../../redux/api/userApi";
import { useSelector } from "react-redux";
import { useLazyLogoutQuery } from "../../redux/api/autApi";

export default function Header() {
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);
  const { isLoading } = useGetMeQuery();
  const navigate = useNavigate();
  const [logout, { isSuccess }] = useLazyLogoutQuery();
  const [navbar,setNavbar] = useState(false)


  useEffect(() => {
    if (isSuccess) navigate(0); 
  }, [isSuccess, navigate]);

  const logoutHandler = () => {
    logout();
  };

  // const changeBg = () => {
  //   if (window.scrollY >= 80) {
  //     setNavbar(true) 
  //   }else{
  //     setNavbar(false)
  //   }
  // }

  // window.addEventListener('scroll',changeBg);

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
          <Link to="/cart">
            <span id="cart" className="ms-3">
              Cart
            </span>
            <span className="Count" id="cart_count">
              {cartItems?.length}
            </span>
          </Link>
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
                
                  {user?.role === 'admin' &&(<Link className="dropdown-item" to="/admin/dashboard">Dashboard</Link>)}
                
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
