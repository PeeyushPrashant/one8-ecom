import  "./NavBar.css";
import { Link } from "react-router-dom";
import { useCart } from "../../hooks/useCart";
import { useWishList } from "../../hooks/useWIshList";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const NavBar= ()=>{
  const {state}= useCart();
  const {wishState}= useWishList();
  const cart= state.cartData;
  const wishList= wishState.wishListData;
  const {token,logOutHandler}=useAuth();
  const navigate=useNavigate();

    return (
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
          <input type="text" className="nav-input" placeholder="Type to search" />
        </div>

        <div className="saved-item-container flex-row">
          <div className="saved-item flex-row">
            <Link to="/wishlist">
              <i className="fas fa-heart icon-md nav-icon"></i>
            </Link>
            <span className="no-badge">{wishList.length}</span>
          </div>
          <div className="saved-item flex-row">
              <Link to="/cart">
              <i className="fas fa-shopping-cart icon-md nav-icon"></i
            >
            </Link>
            <span className="no-badge">{cart.length}</span>
          </div>
          {!token?<div className="saved-item flex-row"
          onClick={()=>navigate("/login")}
          >
            <i className="fas fa-sign-in-alt icon-md nav-icon"></i>
           </div>:
           <div className="saved-item flex-row"
           onClick={logOutHandler}
           >
           <i class="fas fa-sign-out-alt icon-md nav-icon"></i>
          </div>
           }
          
        </div>
      </nav>
    );
}

export  default NavBar;