import React, { useEffect, useState } from "react";
import { useLoginMutation } from "../../redux/api/autApi";
import { Loader } from "../pageLayout/Loader";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import MetaData from "../pageLayout/MetaData";

export default function Login() {
  // State for credentials
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  // Redux state and navigate
  const { isAuthenticated } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  // Login mutation
  const [login, { isLoading, error }] = useLoginMutation();

  // Redirect if authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }

    if (error) {
      toast.error(error?.data.message);
    }
  }, [error, isAuthenticated]);

  // Handle form submission
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
      <MetaData title={"Login"} />
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4">
          <div className="card shadow-sm mt-5">
            <div className="card-body">
              <h3 className="card-title text-center mb-4">Login</h3>
              <form onSubmit={submitDetails}>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">Username</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    id="username" 
                    placeholder="Enter your username"
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input 
                    type="password" 
                    className="form-control" 
                    id="password" 
                    placeholder="Enter your password"
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required
                  />
                </div>
                <div className="d-grid">
                  <button type="submit" className="btn btn-block" disabled={isLoading}>
                    {isLoading ? <Loader /> : "Login"}
                  </button>
                </div>
                <div className="d-grid text-center mt-2">
                  <h6>don't have an account? <Link to="/register">Register</Link></h6>
                  <h6><Link to="/password/forgot">Forgot Password?</Link></h6> {/* Added Forgot Password link */}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
