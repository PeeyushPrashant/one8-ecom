import { useContext } from "react";
import { AddressContext } from "../contexts/Address-context";

const useAddress = () => useContext(AddressContext);

export { useAddress };
