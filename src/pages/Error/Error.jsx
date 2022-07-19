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
            <img src="https://res.cloudinary.com/doohtm4bs/image/upload/v1657351695/E-commerce/error/ezgif.com-gif-maker_u50cmr.jpg" alt="404 error" />
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