import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/pageLayout/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./components/pageLayout/Footer";
import Home from "./components/Home/Home.jsx";
import toast, { Toaster } from "react-hot-toast";
import ProductDetails from "./components/product/ProductDetails.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <div className="App">
          <Toaster position="top-center" />
          <Header />
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/product/:id" element={<ProductDetails />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
