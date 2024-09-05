import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/pageLayout/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./components/pageLayout/Footer";
import Home from "./components/Home/Home.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <div className="App">
          <Header />
          <div className="container">
            <Routes>
              <Route path="/" element = {<Home />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
