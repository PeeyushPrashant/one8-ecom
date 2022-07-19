import "./App.css";
import Mockman from "mockman-js";
import {
  LandingPage,
  Cart,
  Login,
  ProductList,
  WishList,
  SignUp,
  LogOut,
  ProductDetails,
  ProfilePage,
  CheckOut,
  Orders,
  Error,
} from "./pages";
import Loader from "./components/Loader/Loader";
import { useProductList } from "./hooks/useProductList";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const { loader } = useProductList();

  return (
    <div className="App">
      {loader && <Loader />}
      <ToastContainer
        position="bottom-right"
        autoClose={1000}
        newestOnTop={false}
        closeOnClick
        theme="colored"
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        className="toastify"
      />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/products/:productId" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<WishList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/user_profile" element={<ProfilePage />} />
        <Route path="/checkout" element={<CheckOut />} />
        <Route path="/order" element={<Orders />} />
        <Route path="/logout" element={<LogOut />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
