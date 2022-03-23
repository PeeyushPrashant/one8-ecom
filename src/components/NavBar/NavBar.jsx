import  "./NavBar.css";
import { Link } from "react-router-dom";
import { useCart } from "../../hooks/useCart";
const NavBar= ()=>{
  const {state}= useCart();
  const cart= state.cartData;
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
            <a href="/pages/wishlist/wishlist.html"
              ><i className="fas fa-heart icon-md nav-icon"></i>
            </a>
            <span className="no-badge">1</span>
          </div>
          <div className="saved-item flex-row">
              <Link to="/cart">
              <i className="fas fa-shopping-cart icon-md nav-icon"></i
            >
            </Link>
            <span className="no-badge">{cart.length}</span>
          </div>
          <div className="saved-item flex-row">
            <i className="fas fa-sign-in-alt icon-md nav-icon"></i>
           </div>
        </div>
      </nav>
    );
}

export  default NavBar;