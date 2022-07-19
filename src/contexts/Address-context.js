import { createContext, useReducer } from "react";

const AddressContext = createContext();

const AddressReducer = (state, action) => {
  switch (action.type) {
    case "ADD_ADDRESS":
      return { ...state, addressData: action.payload };
    default:
      return state;
  }
};

const AddressProvider = ({ children }) => {
  const [addressState, addressDispatch] = useReducer(AddressReducer, {
    addressData: [],
  });
  return (
    <AddressContext.Provider value={{ addressState, addressDispatch }}>
      {children}
    </AddressContext.Provider>
  );
};

export { AddressContext, AddressProvider };
