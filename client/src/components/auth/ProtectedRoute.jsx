import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { Loader } from "../pageLayout/Loader";



export default function ProtectedRoute({ children }) {
    const{isAuthenticated,loading} =useSelector((state) =>state.auth)

    if(loading) return<Loader/>

    if(!isAuthenticated) {
        return <Navigate to ="/login" replace />
    }


  return children;
}
