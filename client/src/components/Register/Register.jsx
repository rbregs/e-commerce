import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../../redux/api/autApi";
import toast from "react-hot-toast";
import MetaData from "../pageLayout/MetaData";
import { useSelector } from "react-redux";
import { Loader } from "../pageLayout/Loader";

export default function Register() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = user;
  const navigate = useNavigate();
  const [register, { isLoading, error }] = useRegisterMutation();
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }

    if (error) {
      toast.error(error?.data.message);
    }
  }, [error, isAuthenticated]);

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
      <MetaData title={"Register"} />
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4">
          <div className="card shadow-sm mt-5">
            <div className="card-body">
              <h3 className="card-title text-center mb-4">Register</h3>
              <form onSubmit={submitDetails}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Username</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    id="name" 
                    name="name"
                    placeholder="Enter your username"
                    value={name} 
                    onChange={onChange} 
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input 
                    type="email" 
                    className="form-control" 
                    id="email" 
                    name="email" 
                    placeholder="Enter your email"
                    value={email} 
                    onChange={onChange} 
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input 
                    type="password" 
                    className="form-control" 
                    id="password" 
                    name="password" 
                    placeholder="Enter your password"
                    value={password} 
                    onChange={onChange} 
                    required
                  />
                </div>
                <div className="d-grid">
                  <button type="submit" className="btn btn-block" disabled={isLoading}>
                    {isLoading ? "Loading.." : "Register"}
                  </button>
                </div>
                <div className="d-grid text-center mt-2">
                  <h6>Already have an account? <Link to="/login">Login</Link></h6>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
