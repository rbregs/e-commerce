import React, { useEffect, useRef, useState } from "react";

import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useForgotPasswordMutation } from "../../redux/api/userApi";

export default function ForgetPassword() {
  const[email,setEmail] = useState('')
  const {isAuthenticated} = useSelector((state) => state.auth)


  const [forgotPassword,{isLoading,error, isSuccess}] = useForgotPasswordMutation()
  

  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }

    if (error) {
      toast.error(error?.data.message);
    }
    if(isSuccess) {
      toast.success("Email sent Please sent Inbox")
    }
  }, [error,isAuthenticated,isSuccess]);




  const submitDetails = (e) => {
    e.preventDefault();
   
    forgotPassword({email});
  };


  return (
    <>
      <form method="post" className="loginForm" onSubmit={submitDetails} >
        <h5>Forgot Password</h5>
        <div className="loginFields">
          <div className="userInput">
            <input
              type="text"
              className="username"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button type="submit">
            {isLoading ? "Sending Email. please wait" : "Send Email Notification"}

            
          </button>
          <p className="registerLink">
            Go to  <Link to="/login">Login</Link> page
          </p>
        </div>
      </form>
    </>
  );
}
