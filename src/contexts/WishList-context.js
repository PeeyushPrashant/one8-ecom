import { createContext, useReducer, useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import axios from "axios";
const WishListContext = createContext();

const WishListReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_WISHLIST":
      return { ...state, wishListData: action.payload };
    default:
      return state;
  }
};

const WishListProvider = ({ children }) => {
  const [wishState, wishDispatch] = useReducer(WishListReducer, {
    wishListData: [],
  });
  const { token } = useAuth();

  useEffect(() => {
    (async () => {
      if (token) {
        const wishListRes = await axios.get("/api/user/wishlist", {
          headers: {
            authorization: token,
          },
        });
        if (wishListRes.status === 200 || wishListRes.status === 201)
          wishDispatch({
            type: "ADD_TO_WISHLIST",
            payload: wishListRes.data.wishlist,
          });
      } else {
        wishDispatch({ type: "ADD_TO_WISHLIST", payload: [] });
      }
    })();
  }, [token]);

  return (
    <WishListContext.Provider value={{ wishState, wishDispatch }}>
      {children}
    </WishListContext.Provider>
  );
};

export { WishListContext, WishListProvider };
