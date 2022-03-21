import { createContext, useReducer } from "react";
import { filterReducer } from "../reducer/filterReducer";
const FilterContext = createContext();

var initialFilter;

const FilterProvider = ({ children }) => {
  initialFilter = {
    category: { nike: false, adidas: false, puma: false, hrx: false },
    rating: 0,
    sortByPrice: "",
    maxPrice: 1000,
  };

  const [filterstate, dispatch] = useReducer(filterReducer, {
    filter: initialFilter,
  });
  return (
    <FilterContext.Provider value={{ filterstate, dispatch }}>
      {children}
    </FilterContext.Provider>
  );
};

export { FilterContext, FilterProvider, initialFilter };
