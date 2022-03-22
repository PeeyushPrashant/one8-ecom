import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { makeServer } from "./server";
import { ProductDataProvider } from "./contexts/Product-context.js";
import { FilterProvider } from "./contexts/Filter-context.js";
import { TokenProvider } from "./contexts/Token-context";
import { BrowserRouter } from "react-router-dom";

// Call make Server
makeServer();

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <TokenProvider>
        <FilterProvider>
          <ProductDataProvider>
            <App />
          </ProductDataProvider>
        </FilterProvider>
      </TokenProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
