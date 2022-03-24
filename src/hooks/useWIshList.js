import { useContext } from "react";
import { WishListContext } from "../contexts/WishList-context";

const useWishList = () => useContext(WishListContext);

export { useWishList };
