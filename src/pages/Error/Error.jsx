import NavBar from "../../components/NavBar/NavBar"
import { useNavigate } from "react-router-dom"
import "./Error.css"

export const Error=()=>{
    const navigate=useNavigate();
  return(
     <>
     <NavBar/>
     <div className="main">
     <div className="error-block flex-col">
         <section className="error-status flex-row">
            <div className="error-code">4</div>
            <i className="far fa-question-circle fa-spin rotate-icon"></i>
            <div className="error-code">4</div>
         </section>
         
        <div className="msg">The page you requested is hiding out in quarantine? 
        Well, no need to panic. Let's go home and try from there.</div>

        <button className="btn btn-primary"
        onClick={()=>navigate("/")}
        >Home</button>
     </div>
     </div>
     </>
  )
}