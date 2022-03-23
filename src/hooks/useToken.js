import { TokenContext } from "../contexts/Token-context";
import { useContext } from "react";

const useToken = () => useContext(TokenContext);

export { useToken };
