import React from "react";
import SidebarMenu from "./SidebarMenu";

export default function UserLayout({ children }) {
  return (
    <div className="userLayout-container">
      <div className="userLayout-header">
        <h2 className="userLayout-title">User Settings</h2>
      </div>
      <div className="userLayout-content">
        <div className="userLayout-userDashboard">
          <div className="userLayout-sidebar">
            <SidebarMenu />
          </div>
          <div className="userLayout-cmainontent">{children}</div>
        </div>
      </div>
    </div>
  );
}
