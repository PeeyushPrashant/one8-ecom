import  "./NavBar.css";
import { Link } from "react-router-dom";
import { useCart } from "../../hooks/useCart";
import { useWishList } from "../../hooks/useWIshList";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate,useLocation } from "react-router-dom";
import {useFilter} from "../../hooks/useFilter"
import { useState } from "react";

const NavBar= ()=>{
  const {state,sideBarHandler}= useCart();
  const {wishState}= useWishList();
  const cart= state.cartData;
  const wishList= wishState.wishListData;
  const {token,logOutHandler}=useAuth();
  const sampleLocation = useLocation();
  const path= sampleLocation.pathname;
  const {dispatch}= useFilter();
  const navigate=useNavigate();
  const [input,setInput]=useState("");

    return (
      <div className="navbar-cont flex-col">
       <nav className="navbar flex-row">
          <Link to="/">
          <div className="nav-heading flex-row">
            <img
              src="https://res.cloudinary.com/doohtm4bs/image/upload/v1647335661/E-commerce/landingPage/one8-logo_psljqh.png"
              alt="one8 logo"
              className="nav-logo"
            />
            <small className="nav-heading-small">Store</small>
          </div>
          </Link>
        
        <div className="nav-search flex-row">
          <i className="fas fa-search search-icon"></i>
          <input type="text" className="nav-input" placeholder="Type to search" 
          value={input}
          onChange={(e)=>setInput(e.target.value)}
           onKeyDown={(e)=>{
            if(e.key === 'Enter' || e.target.value === ''){
              dispatch({type:"filter", payload:["search",input]})
            if ( e.key === 'Enter'  && path !== "/products")
              navigate("/products")
            }
          }}
          />
        </div>

        <div className="saved-item-container flex-row">
          <div className="navigate-link flex-row"
          onClick={()=>navigate("/products")}
          >
            Explore
          </div>
          <div className="saved-item flex-row"
          onClick={()=>{
            if (!token)
              navigate("/login");
            else
             navigate("/wishlist")
          }}
          >
           <i className="fas fa-heart nav-icon"></i>
           <span className="no-badge">{wishList.length}</span>
          </div>
          <div className="saved-item flex-row"
          onClick={()=>{
            if (!token)
              navigate("/login");
            else
             navigate("/cart")
          }}
          >
              <i className="fas fa-shopping-cart nav-icon"></i
            >
            <span className="no-badge">{cart.length}</span>
          </div>
          <div className="saved-item flex-row"
          onClick={()=>{
            if(!token)
            navigate("/login")
            else
            navigate("/user_profile")
          }}
          >
            <i className="fas fa-user nav-icon"></i>
           </div>
           { path==="/products" && <div className="saved-item  hamburger"
           onClick={sideBarHandler}
           >
           <i class="fas fa-bars nav-icon"></i>
           </div>}
          
        </div>
      </nav>
      <div className="mobile-nav-container">
      <div className="mobile-nav-search flex-row">
          <i className="fas fa-search search-icon"></i>
          <input type="text" className="nav-input" placeholder="Type to search" 
          value={input}
          onChange={(e)=>setInput(e.target.value)}
           onKeyDown={(e)=>{
            if(e.key === 'Enter' || e.target.value === ''){
              dispatch({type:"filter", payload:["search",input]})
            if ( e.key === 'Enter'  && path !== "/products")
              navigate("/products")
            }
          }}
          />
        </div>
      </div>
      </div>
    );
}

export  default NavBar;