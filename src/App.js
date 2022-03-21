import "./App.css";
import logo from "./logo.png";
import Mockman from "mockman-js";
import LandingPage from "./pages/LandingPage/Landingpage";
import ProductList from "./pages/ProductList/ProductList";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/products" element={<ProductList />} />
      </Routes>
    </div>
  );
}

export default App;
