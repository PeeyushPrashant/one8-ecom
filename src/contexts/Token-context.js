import { createContext, useReducer, useEffect, useState } from "react";

const TokenContext = createContext();

const TokenProvider = ({ children }) => {
  const localStorageToken = JSON.parse(localStorage.getItem("login"));
  console.log(localStorageToken?.token);
  const [token, setToken] = useState(localStorageToken?.token);
  return (
    <TokenContext.Provider value={{ token, setToken }}>
      {children}
    </TokenContext.Provider>
  );
};

export { TokenContext, TokenProvider };
