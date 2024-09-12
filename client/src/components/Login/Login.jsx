import React, { useEffect, useRef, useState } from "react";
import { useLoginMutation } from "../../redux/api/autApi";
import { Loader } from "../pageLayout/Loader";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ForgetPassword from "../user/ForgetPassword";

export default function Login() {
  //inputField
  const passwordInputRef = useRef(null);
  const forgetPassRef = useRef(null);

  useEffect(() => {
    const passwordInput = passwordInputRef.current;
    const forgetPassLink = forgetPassRef.current;

    const handleFocus = () => {
      forgetPassLink.style.opacity = "0";
      forgetPassLink.style.visibility = "hidden";
    };

    const handleBlur = () => {
      forgetPassLink.style.opacity = "1";
      forgetPassLink.style.visibility = "visible";
    };

    passwordInput.addEventListener("focus", handleFocus);
    passwordInput.addEventListener("blur", handleBlur);

    return () => {
      passwordInput.removeEventListener("focus", handleFocus);
      passwordInput.removeEventListener("blur", handleBlur);
    };
  }, []);

  //getting credentials
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {isAuthenticated} = useSelector((state) => state.auth)
  const navigate = useNavigate()

  const userNameChange = (e) => {
    setEmail(e.target.value);
  };

  const passwordChange = (e) => {
    setPassword(e.target.value);
  };

  const [login, { isLoading, error, data }] = useLoginMutation();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }

    if (error) {
      toast.error(error?.data.message);
    }
  }, [error,isAuthenticated]);




  const submitDetails = (e) => {
    e.preventDefault();
    const loginData = {
      email,
      password,
    };
    login(loginData);
  };


  return (
    <>
      <form method="post" className="loginForm" onSubmit={submitDetails}>
        <h5>Login</h5>
        <div className="loginFields">
          <div className="userInput">
            <input
              type="text"
              className="username"
              placeholder="Email"
              value={email}
              onChange={userNameChange}
            />
          </div>
          <div className="passwordWrapper">
            <input
              type="password"
              className="username"
              placeholder="Password"
              ref={passwordInputRef}
              value={password}
              onChange={passwordChange}
            />
            <p className="forgetPass" ref={forgetPassRef}>
              <Link to="/password/forgot">Forgot Password?</Link>
            </p>
          </div>
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Authenticating.. please wait" : "Login"}
          </button>
          <p className="registerLink">
            Don't have an account? <Link to="/register">Register</Link>
          </p>
        </div>
      </form>
    </>
  );
}
