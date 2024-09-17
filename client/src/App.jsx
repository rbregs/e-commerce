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
import Cart from "./components/cart/Cart.jsx";
import Shipping from "./components/cart/Shipping.jsx";
import ConfirmOrder from "./components/cart/ConfirmOrder.jsx";
import CheckOutSteps from "./components/cart/CheckOutSteps.jsx";
import PaymentMethod from "./components/cart/PaymentMethod.jsx";
import { MyOrders } from "./components/order/MyOrders.jsx";
import { OrderDetails } from "./components/order/orderDetails.jsx";
import Invoice from "./components/invoice/Invoice.jsx";

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
              <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
              <Route path="/shipping" element={<ProtectedRoute><Shipping /></ProtectedRoute>} />
              <Route path="/confirm_order" element={<ProtectedRoute><ConfirmOrder /></ProtectedRoute>} />
              <Route path="/payment_method" element={<ProtectedRoute><PaymentMethod /></ProtectedRoute>} />
              <Route path="/me/orders" element={<ProtectedRoute><MyOrders /></ProtectedRoute>} />
              <Route path="/me/order/:id" element={<ProtectedRoute><OrderDetails/></ProtectedRoute>} />
              <Route path="/invoice/order/:id" element={<ProtectedRoute><Invoice/></ProtectedRoute>} />
            </Routes>
          </div>

          <Footer />
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
