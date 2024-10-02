
import React, { useEffect, useState } from "react";
import UserLayout from "../pageLayout/UserLayout";
import { useNavigate } from "react-router-dom";
import { useUploadAvatarMutation } from "../../redux/api/userApi";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import MetaData from "../pageLayout/MetaData";

export default function UploadAvatar() {
  const { user } = useSelector((state) => state.auth);
  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState(
    user?.avatar ? user?.avatar?.url : "../public/images/avatar.png"
  );

  const [uploadAvatar, { isLoading, error, isSuccess }] = useUploadAvatarMutation();
  const navigate = useNavigate();
  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }

    if (isSuccess) {
      toast.success("Avatar Uploaded");
      navigate("/me/profile");
    }
  }, [error, isSuccess]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const userData = {
      avatar,
    };

    uploadAvatar(userData);
  };

  const onChange = (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result);
        setAvatar(reader.result);
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };
 
  return (
    <>
      <MetaData title={"Update Avatar"} />
      <UserLayout>
        <div className="col-10 col-lg-8">
          <form
            className="border"
            action="#"
            method="post"
            encType="multipart/form-data"
            onSubmit={handleSubmit}
          >
            <h2 className="mb-4">Upload Avatar</h2>

            <div className="mb-3">
              <div className="d-flex align-items-center">
                <div className="me-3">
                  <figure className="avatar item-rtl">
                    {/* Ensure avatarPreview is correctly updated */}
                    <img
                      src={avatarPreview}
                      className="rounded-circle"
                      alt="avatar preview"
                      style={{ width: "100px", height: "100px" , objectFit: "cover"}} 
                    />
                  </figure>
                </div>
                <div className="input-foam">
                  <label className="form-label" htmlFor="customFile">
                    Choose Avatar
                  </label>
                  <input
                    type="file"
                    name="avatar"
                    className="form-control"
                    id="customFile"
                    accept="image/*"
                    onChange={onChange} 
                  />
                </div>
              </div>
            </div>

            <button
              id="register_button"
              type="submit"
              className="btn w-100 py-2 updateProfile-btn"
              disabled={isLoading}
            >
              {isLoading ? "Uploading..." : "Upload"}
            </button>
          </form>
        </div>
      </UserLayout>
    </>
  );
}
