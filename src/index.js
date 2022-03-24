import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { makeServer } from "./server";
import { ProductDataProvider } from "./contexts/Product-context.js";
import { FilterProvider } from "./contexts/Filter-context.js";
import { TokenProvider } from "./contexts/Token-context";
import { CartProvider } from "./contexts/Cart-context";
import { WishListProvider } from "./contexts/WishList-context";
import { BrowserRouter } from "react-router-dom";

// Call make Server
makeServer();

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <WishListProvider>
        <CartProvider>
          <TokenProvider>
            <FilterProvider>
              <ProductDataProvider>
                <App />
              </ProductDataProvider>
            </FilterProvider>
          </TokenProvider>
        </CartProvider>
      </WishListProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
