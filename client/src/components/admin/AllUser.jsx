import React, { useEffect } from "react";
import { Loader } from "../pageLayout/Loader";
import toast from "react-hot-toast";
import { MDBDataTable } from "mdbreact";
import { Link } from "react-router-dom";
import MetaData from "../pageLayout/MetaData";
import AdminLayout from "../pageLayout/AdminLayout";
import {
  useDeleteOrderMutation,
  useGetAdminOrdersQuery,
} from "../../redux/api/orderApi";
import { setUser } from "../../redux/features/userSlice";
import {
  useDeleteUserMutation,
  useGetAdminUsersQuery,
} from "../../redux/api/userApi";

export const AllUser = () => {
  const { data, isLoading, error } = useGetAdminUsersQuery();
  const [
    deleteUser,
    { error: deleteError, isLoading: isDeleteLoading, isSuccess },
  ] = useDeleteUserMutation();

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }
    if (deleteError) {
      toast.error(deleteError?.data?.message);
    }

    if (isSuccess) {
      toast.success("User Deleted");
    }
  }, [error, deleteError, isSuccess]);

  if (isLoading) return <Loader />;

  const deleteUserHandle = (id) => {
    // deleteUser(id);
    console.log(id);
    if (window.confirm(`Are you sure you want to delete this user ${id}?`)) {
      deleteUser(id);
    }
  };

  const setUser = () => {
    const users = {
      columns: [
        {
          label: "ID",
          field: "id",
          sort: "asc",
        },

        {
          label: "Name",
          field: "name",
          sort: "asc",
        },

        {
          label: "Email",
          field: "email",
          sort: "asc",
        },

        {
          label: "Role",
          field: "role",
          sort: "asc",
        },

        {
          label: "Actions",
          field: "actions",
          sort: "asc",
        },
      ],
      rows: [],
    };

 
    data?.users?.forEach((user) => {
      users.rows.push({
        id: user?._id,
        name: user?.name,
        email: user?.email,
        role: user?.role,

        actions: (
          <>
            <Link
              to={`/admin/users/${user?._id}`}
              className="btn btn-outline-primary"
            >
              {" "}
              <i className="fa fa-pencil"></i>{" "}
            </Link>
            <button
              className="btn btn-outline-success ms-2"
              onClick={() => deleteUserHandle(user?._id)}
              disabled={isDeleteLoading}
            >
              <i className="fa fa-trash"></i>{" "}
            </button>
          </>
        ),
      });
    });

    return users;
  };

  return (
    <>
      <MetaData title={"All Orders"} />
      <AdminLayout>
        <div>
          <h1 className="my-3">{data?.users?.length} Users</h1>
          <MDBDataTable
            data={setUser()}
            className="px-3"
            bordered
            striped
            hover
          />
        </div>
      </AdminLayout>
    </>
  );
};
