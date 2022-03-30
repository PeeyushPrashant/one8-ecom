import { createContext, useReducer, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastHandler } from "../utils/toastify";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const localStorageToken = JSON.parse(localStorage.getItem("auth"));
  const [token, setToken] = useState(localStorageToken?.token);
  let navigate = useNavigate();

  const loginHandler = async (e, { email, password }, setLoginForm) => {
    try {
      if (e.target.innerText === "Login With Test Credentials") {
        setLoginForm({
          email: "adarshbalika@gmail.com",
          password: "adarshbalika",
        });
        var response = await axios.post("/api/auth/login", {
          email: "adarshbalika@gmail.com",
          password: "adarshbalika",
        });
      } else
        var response = await axios.post("/api/auth/login", { email, password });

      if (response.status === 200 || response.status === 201) {
        ToastHandler("info", "Successfully logged in");
        localStorage.setItem(
          "auth",
          JSON.stringify({ token: response.data.encodedToken })
        );

        setToken(response.data.encodedToken);
        navigate("/products");
      }
    } catch (error) {
      alert("Your account doesn't exist");
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
        ToastHandler("info", "Successfully signed in");
        localStorage.setItem(
          "auth",
          JSON.stringify({
            token: response.data.encodedToken,
          })
        );
        setToken(response.data.encodedToken);

        navigate("/products");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const logOutHandler = () => {
    localStorage.removeItem("auth");
    setToken(undefined);
    navigate("/logout");
  };

  return (
    <AuthContext.Provider
      value={{ token, setToken, loginHandler, signUpHandler, logOutHandler }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
