import NavBar from "../../components/NavBar/NavBar"
import "./login.css"
import { useToken } from "../../hooks/useToken"
import axios from "axios"
import {  useNavigate } from "react-router-dom"
export const Login = ()=>{
  const {setToken}=useToken();
  const testCredentials= { email: "adarshbalika@gmail.com",password: "adarshbalika"};
  let navigate= useNavigate();
  const loginHandler=async()=>{
    try{
      const response = await axios.post('/api/auth/login', {...testCredentials});
      if(response.status===200 || response.status===201)
      {
        localStorage.setItem("login",JSON.stringify({token:response.data.encodedToken}));

        setToken(response.data.encodedToken);
        navigate("/products");
      }

    }
    catch(error)
    {
      console.log(error);
    }
  }
return(
    <>
    <NavBar/>
    <main className="main">
        <div className="auth-container flex-row">
          <div className="auth-card flex-col">
            <h1 className="auth-heading">Login</h1>
            <p>Please enter your valid email and password.</p>
            <div className="auth-input flex-row">
              <label for="" className="input-label"><strong>Email</strong></label>
              <input
                type="text"
                className="input-feild"
                placeholder="Enter your email here"
                required
              />
            </div>
            <div className="auth-input flex-row">
              <label for="" className="input-label"
                ><strong>Password</strong></label
              >
              <input
                type="password"
                className="input-feild"
                placeholder="Enter your password"
                required
              />
            </div>
            <button className="btn login-btn">Login</button>
            <button className="btn btn-icon demo-login"
            onClick={loginHandler}
            >Login With Test Credentials</button>
            <div>
              <a
                href="/pages/authentication/signup.html"
                className="auth-footer flex-row"
                >Create new account<i className="fas fa-angle-right icon-md"></i
              ></a>
            </div>
          </div>
        </div>
      </main>
    </>
);
}


