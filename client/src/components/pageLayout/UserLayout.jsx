import React from 'react';
import SidebarMenu from './SidebarMenu';

export default function UserLayout({children}) {

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
    <div className="userLayout   p-3">
      <h3 className="  mx-auto text-center w-100">
        User Settings
      </h3>
      <div className='row mt-5'>
        <div className='col-md-3 ms-5 mx-3  '>
            <SidebarMenu menuItems={menuItems} />
        </div>
        <div className='col-md-6  ms-5  '>
          {children}
        </div>
      </div>
    </div>
  );
}
