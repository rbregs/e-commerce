import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/pageLayout/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./components/pageLayout/Footer";
import Home from "./components/Home/Home.jsx";
import toast, { Toaster } from "react-hot-toast";
import ProductDetails from "./components/product/ProductDetails.jsx";
import Login from "./components/Login/Login.jsx";
import Register from "./components/Register/Register.jsx";
import Profile from "./components/user/Profile.jsx";
import UpdateProfile from "./components/user/UpdateProfile.jsx";
import ProtectedRoute from "./components/auth/ProtectedRoute.jsx";
import UploadAvatar from "./components/user/UploadAvatar.jsx";
import UpdatePassword from "./components/user/UpdatePassword.jsx";
import ForgetPassword from "./components/user/ForgetPassword.jsx";
import ResetPassword from "./components/auth/ResetPassword.jsx";

function App() {
  
  return (
    <>
      <BrowserRouter>
        <div className="App">
          <Toaster position="top-center" />
          <Header />
          <div className="app-container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/me/profile" element={<ProtectedRoute><Profile/></ProtectedRoute>} />
              <Route path="/me/upload_avatar" element={<ProtectedRoute><UploadAvatar/></ProtectedRoute>} />
              <Route path="/me/update_profile" element={<ProtectedRoute><UpdateProfile/></ProtectedRoute>} />
              <Route path="/me/update_password" element={<ProtectedRoute><UpdatePassword/></ProtectedRoute>} />
              <Route path="/password/forgot" element={<ForgetPassword />} />
              <Route path="/password/reset/:token" element={<ResetPassword />} />
            </Routes>
          </div>

          <Footer />
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
