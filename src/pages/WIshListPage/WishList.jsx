import { useWishList } from "../../hooks/useWIshList"
import ProductCard from "../../components/ProductCard/ProductCard";
import NavBar from "../../components/NavBar/NavBar";
import "./WishList.css";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";

export const WishList=()=>{
    const {wishState,wishDispatch}= useWishList();
    const wishList= wishState.wishListData;
    const navigate=useNavigate();
    const {token}=useAuth();
    
    return(
    <>
    <NavBar/>
     <main className="main">
    {wishList.length>0? <h2 className="wishlist-heading">My WishList({wishList.length})</h2>: <h2 className="wishlist-heading">Your WishList is empty</h2>}
     <div className="wishlist-data flex-row">
         {wishList.map((item)=>{
             return(
                <ProductCard
                item={item}
        
                />
             );
         })}
     </div>
     </main>
     </>
    )
}
