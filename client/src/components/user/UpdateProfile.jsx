import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUpdateProfileMutation } from "../../redux/api/userApi";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import UserLayout from "../pageLayout/UserLayout";
import MetaData from "../pageLayout/MetaData";

export default function UpdateProfile() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  const [updateProfile, { isLoading, error, isSuccess }] =
    useUpdateProfileMutation();

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      setName(user?.name);
      setEmail(user?.email);
    }

    if (error) {
      toast.error(error?.data.message);
    }

    if (isSuccess) {
      toast.success("User Updated");
      navigate("/me/profile");
    }
  }, [user, error, isSuccess]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = {
      name,
      email,
    };
    updateProfile(userData);
  };

  return (
    <>
      <MetaData title={"Update Profile"} />
      <UserLayout>
          <div className="row wrapper">
            <div className="col-10 col-lg-8">
              <form action="#" method="post" onSubmit={handleSubmit}>
                <h2>Update Profile</h2>
                <div className="">
                  <label htmlFor="old_password_field">Username</label>
                  <input
                    type="text"
                    id="name_field"
                    className="form-control"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="new_password_field">Email</label>
                  <input
                    type="email"
                    id="email_field"
                    className="form-control"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <button type="submit" className="updateProfile-btn btn w-100">
                  Update Password
                </button>
              </form>
            </div>
          </div>
      </UserLayout>
    </>
  );
}
