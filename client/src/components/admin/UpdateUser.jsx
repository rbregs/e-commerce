import React, { useEffect, useState } from "react";
import MetaData from "../pageLayout/MetaData";
import AdminLayout from "../pageLayout/AdminLayout";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import {
  useDeleteUserMutation,
  useGetUserDetailsQuery,
  useUpdateUserMutation,
} from "../../redux/api/userApi";

export default function UpdateUser() {
  const params = useParams();

  const [updateUser, { data: updateResponse, error, isSuccess }] =
    useUpdateUserMutation();

    const [deleteUser, {error:deleteError,isLoading:isErrorLoading,is}] = useDeleteUserMutation()
  const { data } = useGetUserDetailsQuery(params.id);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (data?.user) {
      setName(data.user?.name);
      setEmail(data.user?.email);
      setRole(data.user?.role);
    }

    if (error) {
      toast.error(error?.data.message);
    }

    if (isSuccess) {
      toast.success("User Updated");
      navigate("/admin/users");
    }
  }, [data, error, isSuccess]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const userDetails = {
      name,
      email,
      role,
    };
    updateUser({ id: params?.id, body: userDetails });
  };

  return (
    <>
      <MetaData title={"Update User"} />
      <AdminLayout>
        <div className="row wrapper">
          <div className="col-10 col-lg-8">
            <form className="shadow-lg p-5" onSubmit={handleSubmit}>
              <h2 className="mb-4">Update User</h2>

              <div className="mb-3">
                <label htmlFor="name_field" className="form-label">
                  Name
                </label>
                <input
                  type="name"
                  id="name_field"
                  className="form-control"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="email_field" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  id="email_field"
                  className="form-control"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="role_field" className="form-label">
                  Role
                </label>
                <select
                  id="role_field"
                  className="form-select"
                  name="role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="user">user</option>
                  <option value="admin">admin</option>
                </select>
              </div>

              <button
                type="submit"
                className="createNewProduct btn w-100 py-2
"
                disabled={isErrorLoading}
              >
                {isErrorLoading ? "Updating.." : "Update"}
              </button>
            </form>
          </div>
        </div>
      </AdminLayout>
    </>
  );
}
