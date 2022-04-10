import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { makeServer } from "./server";
import { ProductDataProvider } from "./contexts/Product-context.js";
import { FilterProvider } from "./contexts/Filter-context.js";
import { AuthProvider } from "./contexts/Auth-context";
import { CartProvider } from "./contexts/Cart-context";
import { WishListProvider } from "./contexts/WishList-context";
import { OrderProvider } from "./contexts/Order-Context";
import { BrowserRouter } from "react-router-dom";

// Call make Server
makeServer();

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <OrderProvider>
          <WishListProvider>
            <CartProvider>
              <FilterProvider>
                <ProductDataProvider>
                  <App />
                </ProductDataProvider>
              </FilterProvider>
            </CartProvider>
          </WishListProvider>
        </OrderProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
