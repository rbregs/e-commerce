import React, { useState } from 'react'
import {Link, useLocation} from 'react-router-dom'

export default function SidebarMenu() {

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

    const location = useLocation()
    
    const [activeMenuItem,setActiveMenuItem] = useState(location.pathname)
    
    const handleMenuItemClick =(menuItemUrl) => {
                                                    setActiveMenuItem(menuItemUrl);
                                                }

    return (
        <div className="list-group mt-3 pl-4">
          {menuItems?.map((menuItem, index) => (
            <Link
              key={index}
              to={menuItem.url}
              className="fw-bold list-group-item list-group-item-action"
              style={activeMenuItem.includes(menuItem.url)
                ? { backgroundColor: '#f0f0f0', color: ' #8721d4' }  
                : {}
              }
              onClick={() => handleMenuItemClick(menuItem.url)}
              aria-current ={activeMenuItem.includes(menuItem.url) ? "true" : "false"}
            >
              <i className={`${menuItem.icon} fa-fw pe-2`}></i> {menuItem.name}
            </Link>
          ))}
        </div>
      );
    }  
