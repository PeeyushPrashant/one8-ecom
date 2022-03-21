import "./App.css";
import logo from "./logo.png";
import Mockman from "mockman-js";
import LandingPage from "./pages/LandingPage/Landingpage";
import ProductList from "./pages/ProductList/ProductList";

function App() {
  return (
    <div className="App">
      {/* <LandingPage /> */}
      <ProductList />
    </div>
  );
}

export default App;
