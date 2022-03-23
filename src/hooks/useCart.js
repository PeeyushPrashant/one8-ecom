import { CartContext } from "../contexts/Cart-context";
import { useContext } from "react";

const useCart = () => useContext(CartContext);

export { useCart };
