import React, { useEffect, useState } from "react";
import UserLayout from "../pageLayout/UserLayout";
import { useNavigate } from "react-router-dom";
import { useUploadAvatarMutation } from "../../redux/api/userApi";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import MetaData from "../pageLayout/MetaData";

export default function UploadAvatar() {
  // Redux selector
  const { user } = useSelector((state) => state.auth);

  //  avatar and its preview
  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState(
    user?.avatar ? user?.avatar?.url : "../public/images/avatar.png"
  );

  //  file upload mutation
  const [upload, { isLoading, error, isSuccess }] = useUploadAvatarMutation();
  const navigate = useNavigate();

  // handle success and error
  useEffect(() => {
    if (error) {
      toast.error(error?.data.message);
    }

    if (isSuccess) {
      toast.success("Avatar Uploaded");
      navigate("/me/profile");
    }
  }, [error, isSuccess, navigate]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!avatar) {
      toast.error("Please select an avatar.");
      return;
    }

    try {
      const response = await upload({ avatar });
      console.log("Upload Response:", response);
      if (response?.data) {
        toast.success("Avatar Uploaded");
        navigate("/me/profile");
      } else {
        toast.error("Upload failed.");
      }
    } catch (err) {
      toast.error("An error occurred during upload.");
      console.error("Upload Error:", err);
    }
  };
  // Handle file input change
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
        <div className="uploadA-wrapper">
          <div className="uploadA-container">
            <form
              action="#"
              method="post"
              encType="multipart/form-data"
              onSubmit={handleSubmit}
            >
              <h2 className="uploadA-title">Upload Avatar</h2>

              <div className="uploadA-details">
                <div className="uploadA-detailsContainer">
                  <div className="uploadA-imageContainer">
                    <figure className="uploadA-figure">
                      <img src={avatarPreview} alt="Avatar Preview" />
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
                disabled={isLoading}
                className="uploadA-btn"
              >
                {isLoading ? "Uploading.." : "Upload"}
              </button>
            </form>
          </div>
        </div>
      </UserLayout>
    </>
  );
}
