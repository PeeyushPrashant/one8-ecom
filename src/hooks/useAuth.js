import { AuthContext } from "../contexts/Auth-context";
import { useContext } from "react";

const useAuth = () => useContext(AuthContext);

export { useAuth };
