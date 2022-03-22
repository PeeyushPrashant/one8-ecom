import "./App.css";
import logo from "./logo.png";
import Mockman from "mockman-js";
import LandingPage from "./pages/LandingPage/Landingpage";
import ProductList from "./pages/ProductList/ProductList";
import Cart from "./pages/CartPage/Cart.jsx";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login/Login";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      {/* <Login /> */}
    </div>
  );
}

export default App;
