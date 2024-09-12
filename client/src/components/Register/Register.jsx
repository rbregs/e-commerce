import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../../redux/api/autApi";
import toast from "react-hot-toast";

export default function Register() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = user;
  const navigate = useNavigate()

  const [register, { isLoading, error, data }] = useRegisterMutation();
  const {isAuthenticated} = useSelector((state) => state.auth)

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

    const registerData = {
      name,
      email,
      password,
    };

    register(registerData);
  };

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <>
      <form method="post" className="loginForm" onSubmit={submitDetails}>
        <h5>Register</h5>
        <div className="loginFields">
          <div className="Name">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={name}
              onChange={onChange}
            />
          </div>
          <div className="userInput">
            <input
              type="text"
              name="email"
              placeholder="Email"
              value={email}
              onChange={onChange}
            />
          </div>
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={onChange}
          />
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Creating account" : "Register"}
          </button>
          <p className="registerLink">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </form>
    </>
  );
}
