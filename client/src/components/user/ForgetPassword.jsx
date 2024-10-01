import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useForgotPasswordMutation } from "../../redux/api/userApi";
import MetaData from "../pageLayout/MetaData";

export default function ForgetPassword() {
  const [email, setEmail] = useState("");
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [forgotPassword, { isLoading, error, isSuccess }] = useForgotPasswordMutation();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }

    if (error) {
      toast.error(error?.data.message);
    }

    if (isSuccess) {
      toast.success("Email sent! Please check your inbox.");
    }
  }, [error, isAuthenticated, isSuccess]);

  const submitDetails = (e) => {
    e.preventDefault();
    forgotPassword({ email });
  };

  return (
    <>
      <MetaData title="Forgot Password" />
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4">
          <div className="card shadow-sm mt-5">
            <div className="card-body">
              <h3 className="card-title text-center mb-4">Forgot Password</h3>
              <form onSubmit={submitDetails}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input
                    type="text"
                    className="form-control"
                    id="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="d-grid">
                  <button type="submit" className="btn btn-block" disabled={isLoading}>
                    {isLoading ? "Sending Email. Please wait..." : "Send Email Notification"}
                  </button>
                </div>
                <div className="d-grid text-center mt-2">
                  <p className="registerLink">
                    Go to <Link to="/login">Login</Link> page
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
