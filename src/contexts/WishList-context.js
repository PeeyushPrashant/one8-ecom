import { createContext, useReducer, useState } from "react";

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

  return (
    <WishListContext.Provider value={{ wishState, wishDispatch }}>
      {children}
    </WishListContext.Provider>
  );
};

export { WishListContext, WishListProvider };
