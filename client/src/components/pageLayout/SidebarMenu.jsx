import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

export default function SidebarMenu({ menuItems }) {
  const location = useLocation();
  const [activeMenuItem, setActiveMenuItem] = useState(location.pathname);

  const handleMenuItemClick = (menuItemUrl) => {
    setActiveMenuItem(menuItemUrl);
  };

  // // useEffect to log the active menu item when it changes
  // useEffect(() => {
  //   console.log("Active menu item:", activeMenuItem);
  // }, [activeMenuItem]);

  return (
    <div className="sidemenu list-group mt-3 pl-4">
    {menuItems?.map((menuItem, index) => (
      <Link
        key={index}
        to={menuItem.url}
        className={`fw-bold my-3 p-1 text-decoration-none ${
          activeMenuItem.includes(menuItem.url) ? "active-link" : ""
        }`}
        onClick={() => handleMenuItemClick(menuItem.url)}
        aria-current={activeMenuItem.includes(menuItem.url) ? "true" : "false"}
      >
        <i
          className={`${menuItem.icon} fa-fw pe-2`}
          style={
            activeMenuItem.includes(menuItem.url) ? { color: "#FB6F92" } : {}
          }
        ></i>{" "}
        {menuItem.name}
      </Link>
    ))}
  </div>
  );
}
