import "./LandingPage.css"
import NavBar from "../../components/NavBar/NavBar";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useFilter } from "../../hooks/useFilter";
export const LandingPage= ()=>{
  const navigate=useNavigate();
  const {filterstate,dispatch} = useFilter();

  const setCategory=async(e)=>{
    console.log(filterstate);
    const res= await dispatch({type:"clear"});
    console.log(filterstate);
    dispatch({type:"filter",payload:["category",
    {...filterstate.filter.category,[e.target.alt]:true}
    ]})
      navigate("/products")
  }

return (
   <>
     <NavBar/>
    <main>
        <div className="home-img-container relative">
          <img
            src="https://res.cloudinary.com/doohtm4bs/image/upload/v1647335640/E-commerce/landingPage/landing-img_zv7bxe.avif"
            alt="sneaker"
            className="home-img"
          />
         <section className="main-text absolute flex-col">
            <h1 className="main-text-normal">The One8 Affair</h1>
            <h1 className="main-text-normal">Get Ready Get Better</h1>
              <Link to="/products">
              <button className="btn btn-primary">Shop Now</button>
              </Link>
          </section>
        </div>
        <h1 className="sub-head">Featured Brands</h1>
        <section className="brands-container flex-row">
          <img
            src="https://res.cloudinary.com/doohtm4bs/image/upload/v1647336355/E-commerce/landingPage/nike-logo_lmbsfw.jpg"
            alt="nike"
            className="brand-img"
            onClick={setCategory}
          />

          <img
            src="https://res.cloudinary.com/doohtm4bs/image/upload/v1647336355/E-commerce/landingPage/adidas-logo_o6ltbw.jpg"
            alt="adidas"
            className="brand-img"
            onClick={setCategory}
          />
          <img src="https://res.cloudinary.com/doohtm4bs/image/upload/v1647336385/E-commerce/landingPage/puma_tgznyt.jpg" 
          alt="puma" className="brand-img"
          onClick={setCategory}
          />
          <img
            src="https://res.cloudinary.com/doohtm4bs/image/upload/v1649345671/E-commerce/landingPage/hrx_oahtdx.jpg"
            alt="hrx"
            className="brand-img"
            onClick={setCategory}
          />
        </section>
      </main>
    </>
);
}

