import { createContext, useReducer, useEffect } from "react";
import axios from "axios";
const ProductContext = createContext();

const ProductDataProvider = ({ children }) => {
  const setProduct = (state, action) => {
    return { ...state, initialProduct: action };
  };
  const initialData = [];
  const [productState, dispatch] = useReducer(setProduct, {
    initialProduct: initialData,
  });

  useEffect(() => {
    (async () => {
      const response = await axios.get("/api/products");
      dispatch(response.data.products);
    })();
  }, []);
  return (
    <ProductContext.Provider value={{ productState }}>
      {children}
    </ProductContext.Provider>
  );
};

export { ProductContext, ProductDataProvider };
