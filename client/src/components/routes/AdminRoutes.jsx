import React from 'react'
import { Route } from "react-router-dom";
import ProtectedRoute from "../auth/ProtectedRoute.jsx";
import Dashboard from '../admin/Dashboard';

export default function AdminRoutes() {
  return (
    <>
    <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
    </>
  )
}
