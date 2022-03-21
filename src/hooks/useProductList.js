import { useContext } from "react";
import { ProductContext } from "../contexts/Product-context.js";

const useProductList = () => useContext(ProductContext);

export { useProductList };
