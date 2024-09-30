import React from "react";
import SidebarMenu from "./SidebarMenu";

export default function AdminLayout({ children }) {
  const menuItems = [
    {
      name: "Dashboard",
      url: "/admin/dashboard",
      icon: "fas fa-tachometer-alt",
    },
    {
      name: "New Product",
      url: "/admin/product/new",
      icon: "fas fa-plus",
    },
    {
      name: "Products",
      url: "/admin/products",
      icon: "fab fa-product-hunt",
    },
    {
      name: "Orders",
      url: "/admin/orders",
      icon: "fas fa-receipt",
    },
    {
      name: "Users",
      url: "/admin/users",
      icon: "fas fa-user",
    },

    {
      name: "Reviews",
      url: "/admin/reviews",
      icon: "fas fa-star",
    },
  ];

  return (
    <div className="">
      <h2 className="d-flex justify-content-center">Admin Dashboard</h2>
      <div className="row px-5">
        <div className="col-md-3">
          <SidebarMenu menuItems={menuItems} />
        </div>
        <div className="col-md-7">{children}</div>
      </div>
    </div>
  );
}
