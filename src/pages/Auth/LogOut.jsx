import "./Auth.css"
import { useNavigate } from "react-router-dom";
export const LogOut=()=>{
const navigate=useNavigate();

    return (
      <main className="main">
        <div className="auth-container flex-row">
          <div className="auth-card flex-col logout-card">
            <h1 className="auth-heading logout">You are currently logged out</h1>
            <p>Don't miss out on latest deals. Login again!</p>
            <button className="btn btn-primary "
              onClick={()=>navigate("/products")}
              >See Products</button>
          </div>
        </div>
      </main>
      
    );
}