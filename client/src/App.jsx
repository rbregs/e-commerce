import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/pageLayout/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./components/pageLayout/Footer";
import toast, { Toaster } from "react-hot-toast";
import useUserRoutes from './components/routes/UserRoutes'
import useAdminRoutes from './components/routes/AdminRoutes'
import NotFOund from "./components/notfound/NotFOund";

function App() {

  const userRoutes = useUserRoutes();
  const adminRoutes = useAdminRoutes();
  
  return (
    <>
      <BrowserRouter>
        <div className="container-fluid d-flex flex-column min-vh-100 ">
          <Toaster position="top-center" />
          <Header />
          <div className="app-container">
            <Routes>
              {userRoutes}
              {adminRoutes}
              <Route path="*" element ={<NotFOund/>} />
            </Routes>
          </div>

          <Footer />
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
