import { createContext, useState, useReducer } from "react";

const CartContext = createContext();

const CartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      return { ...state, cartData: action.payload };
    case "PRODUCT_COUNT":
      return { ...state, cartData: action.payload };
    default:
      return state;
  }
};

const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(CartReducer, { cartData: [] });
  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export { CartContext, CartProvider };
