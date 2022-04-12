import NavBar from "../../components/NavBar/NavBar"
import { useNavigate } from "react-router-dom"
import "./Error.css"

export const Error=()=>{
    const navigate=useNavigate();
  return(
     <>
     <NavBar/>
     <div className="main">
     <div class="error-block flex-col">
         <section className="error-status flex-row">
            <div class="error-code">4</div>
            <i class="far fa-question-circle fa-spin rotate-icon"></i>
            <div class="error-code">4</div>
         </section>
         
        <div class="msg">The page you requested is hiding out in quarantine? 
        Well, no need to panic. Let's go home and try from there.</div>

        <button className="btn btn-primary"
        onClick={()=>navigate("/")}
        >Home</button>
     </div>
     </div>
     </>
  )
}