import { createContext, useReducer, useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import axios from "axios";
const ProductContext = createContext();

const setProduct = (state, action) => {
  return {
    ...state,
    initialProduct: action,
  };
};

const ProductDataProvider = ({ children }) => {
  const { token } = useAuth();
  const initialData = [];
  const [productState, dispatch] = useReducer(setProduct, {
    initialProduct: initialData,
  });
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    (async () => {
      const response = await axios.get("/api/products");

      dispatch(response.data.products);
    })();
  }, []);

  return (
    <ProductContext.Provider value={{ productState, loader, setLoader }}>
      {children}
    </ProductContext.Provider>
  );
};

export { ProductContext, ProductDataProvider };
