import { createContext, useReducer, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastHandler } from "../utils/toastify";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const localStorageToken = JSON.parse(localStorage.getItem("auth"));
  const [token, setToken] = useState(localStorageToken?.token);
  let navigate = useNavigate();
  const [user, setUser] = useState(localStorageToken?.user);
  const loginHandler = async (e, { email, password }, setLoginForm) => {
    try {
      if (e.target.innerText === "Login With Test Credentials") {
        setLoginForm({
          email: "prashantpeeyush@gmail.com",
          password: "Prashant123",
        });
        var response = await axios.post("/api/auth/login", {
          email: "prashantpeeyush@gmail.com",
          password: "Prashant123",
        });
      } else
        var response = await axios.post("/api/auth/login", { email, password });

      if (response.status === 200 || response.status === 201) {
        ToastHandler("success", "Successfully logged in");
        localStorage.setItem(
          "auth",
          JSON.stringify({
            token: response.data.encodedToken,
            user: response.data.foundUser,
          })
        );

        setToken(response.data.encodedToken);
        setUser(response.data.foundUser);
        navigate("/products");
      }
    } catch (error) {
      ToastHandler("error", "Your account doesnot exist");
    }
  };

  const signUpHandler = async ({ name, email, password }) => {
    try {
      if (name && email && password !== "")
        var response = await axios.post("/api/auth/signup", {
          email,
          password,
          name,
        });

      if (response.status === 201) {
        ToastHandler("success", "Successfully signed in");
        localStorage.setItem(
          "auth",
          JSON.stringify({
            token: response.data.encodedToken,
            user: response.data.createdUser,
          })
        );
        setToken(response.data.encodedToken);
        setUser(response.data.createdUser);
        navigate("/products");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const logOutHandler = () => {
    localStorage.removeItem("auth");
    setToken(undefined);
    setUser(undefined);
    ToastHandler("info", "You have been logged out");
    navigate("/logout");
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        setToken,
        loginHandler,
        signUpHandler,
        logOutHandler,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
