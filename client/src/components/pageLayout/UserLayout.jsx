import React from "react";
import SidebarMenu from "./SidebarMenu";

export default function UserLayout({ children }) {

  
  const menuItems = [
    {
        name:"Profile",
        url:"/me/profile",
        icon:"fas fa-user"
    },
    {
        name:"Update Profile",
        url:"/me/update_profile",
        icon:"fas fa-user"
    },
    {
        name:"Update Avatar",
        url:"/me/upload_avatar",
        icon:"fas fa-user-circle"
    },
    {
        name:"Update Password",
        url:"/me/update_password",
        icon:"fas fa-lock"
    },
]

  return (
    <div className="userLayout-container">
      <div className="userLayout-header">
        <h2 className="userLayout-title">User Settings</h2>
      </div>
      <div className="userLayout-content">
        <div className="userLayout-userDashboard">
          <div className="userLayout-sidebar">
            <SidebarMenu menuItems ={menuItems}/>
          </div>
          <div className="userLayout-cmainontent">{children}</div>
        </div>
      </div>
    </div>
  );
}
