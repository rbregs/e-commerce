import React, { useEffect, useState } from "react";
import { useResetPasswordMutation } from "../../redux/api/userApi";
import { Link, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import MetaData from "../pageLayout/MetaData";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const params = useParams();
  const navigate = useNavigate();

  const { isAuthenticated } = useSelector((state) => state.auth);
  const [resetPassword, { isLoading, error, isSuccess }] = useResetPasswordMutation();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }

    if (error) {
      toast.error(error?.data.message);
    }

    if (isSuccess) {
      toast.success("Password reset successfully");
      navigate("/login"); 
    }
  }, [error, isSuccess, isAuthenticated]);

  const submitDetails = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    const data = { password, confirmPassword };
    resetPassword({ token: params?.token, body: data });
  };

  return (
    <>
      <MetaData title={"Reset Password"} />
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4">
          <div className="card shadow-sm mt-5">
            <div className="card-body">
              <h3 className="card-title text-center mb-4">Reset Password</h3>
              <form onSubmit={submitDetails}>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Enter your new password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="confirmPassword"
                    placeholder="Confirm your new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="d-grid">
                  <button type="submit" className="btn btn-block" disabled={isLoading}>
                    {isLoading ? "Resetting password... please wait" : "Reset Password"}
                  </button>
                </div>
                <div className="d-grid text-center mt-2">
                  <p className="registerLink">
                  Cancel? go to  <Link to="/login">Login</Link> page
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
