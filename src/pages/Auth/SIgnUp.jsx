import "./Auth.css"
import { useAuth } from "../../hooks/useAuth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const SignUp=()=>{
  const {signUpHandler}= useAuth();
  const [signUpForm, setSignUpForm] = useState({
    name:"",
    email:"",
    password:""
  })
  const navigate= useNavigate();
  
    return (
        <main className="main">
        <div className="auth-container flex-row">
          <div className="auth-card flex-col">
            <h1 className="auth-heading">Sign Up</h1>
            <p>
              Fill below form to sign up and enjoy special offers in one8 store
            </p>
            <div className="auth-input flex-row">
              <label for="" className="input-label"
                ><strong>Name</strong></label
              >
              <input
                type="text"
                className="input-feild"
                value={signUpForm.name}
                placeholder="Enter your first name"
                onChange={(e)=>setSignUpForm({...signUpForm,name:e.target.value})}
                required
              />
            </div>
            
            <div className="auth-input flex-row">
              <label for="" className="input-label"><strong>Email</strong></label>
              <input
                type="email"
                className="input-feild"
                value={signUpForm.email}
                placeholder="one8@gmail.com"
                onChange={(e)=>setSignUpForm({...signUpForm,email:e.target.value})}
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
                value={signUpForm.password}
                placeholder="Enter your new password"
                onChange={(e)=>setSignUpForm({...signUpForm,password:e.target.value})}
                required
              />
            </div>
            <div className="auth-input flex-row">
              <label for="" className="input-label"
                ><strong>Confirm Password</strong></label
              >
              <input
                type="password"
                className="input-feild"
                value={signUpForm.password}
                placeholder="Enter your new password"
                required
              />
            </div>
            <button className="btn btn-secondary auth-btn"
            onClick={()=>signUpHandler(signUpForm)}
            >Register</button>
            <div className="auth-footer flex-row"
            onClick={()=>navigate("/login")}
            >
              Already have an account<i
                  className="fas fa-angle-right icon-md"
                ></i
              >
            </div>
          </div>
        </div>
      </main>
    );
}

