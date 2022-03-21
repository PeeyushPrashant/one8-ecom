import { useContext } from "react";
import { FilterContext } from "../contexts/Filter-context";

const useFilter = () => useContext(FilterContext);

export { useFilter };
