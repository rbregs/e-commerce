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
    <div className="userLayout-container">
      <div className="userLayout-header">
        <h2 className="userLayout-title">Admin Dashboard</h2>
      </div>
      <div className="userLayout-userDashboard">
        <div className="userLayout-sidebar">
          <SidebarMenu menuItems={menuItems} />
        </div>
        <div className="userLayout-cmainontent">{children}</div>
      </div>
   </div>
  );
}
