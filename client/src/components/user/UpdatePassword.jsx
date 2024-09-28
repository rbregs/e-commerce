import React, { useEffect, useState } from "react";
import UserLayout from "../pageLayout/UserLayout";
import { useNavigate } from "react-router-dom";
import { useUpdatePasswordMutation } from "../../redux/api/userApi";
import toast from "react-hot-toast";
import MetaData from "../pageLayout/MetaData";

export default function UpdatePassword() {
  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const [updatePassword, { isLoading, error, isSuccess }] =
    useUpdatePasswordMutation();

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message || "Incorrect Password");
    }

    if (isSuccess) {
      toast.success("Password Updated");
      navigate("/me/profile");
    }
  }, [error, isSuccess]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const userData = {
      oldPassword,
      password,
    };
    updatePassword(userData);
  };

  return (
    <>
      <MetaData title={"Update Password"} />
      <UserLayout>
        <div className="updatePassword-wrapper">
          <div className="col-10 col-lg-8">
            <div className="updatePassword-title">
              <form onSubmit={handleSubmit}>
                <h2>Update Password</h2>
                <div className="">
                  <label htmlFor="old_password_field">Current Password</label>
                  <input
                    type="password"
                    id="old_password_field"
                    className="form-control"
                    onChange={(e) => setOldPassword(e.target.value)}
                    value={oldPassword}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="new_password_field">New Password</label>
                  <input
                    type="password"
                    id="new_password_field"
                    className="form-control"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                  />
                </div>

                <button
                  type="submit"
                   className="btn w-100 py-2 updateProfile-btn"
                  disabled={isLoading}
                >
                  {isLoading ? "Updating Password..." : "Update Password"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </UserLayout>
    </>
  );
}
