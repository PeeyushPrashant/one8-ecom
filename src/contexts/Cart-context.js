import { createContext, useState, useReducer, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import axios from "axios";
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
  const { token } = useAuth();

  useEffect(() => {
    (async () => {
      if (token) {
        const cartListRes = await axios.get("/api/user/cart", {
          headers: {
            authorization: token,
          },
        });
        if (cartListRes.status === 200 || cartListRes.status === 201)
          dispatch({ type: "ADD_TO_CART", payload: cartListRes.data.cart });
      } else {
        console.log("cartContext else");
        dispatch({ type: "ADD_TO_CART", payload: [] });
      }
    })();
  }, [token]);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export { CartContext, CartProvider };
