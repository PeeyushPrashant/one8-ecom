import { useWishList } from "../../hooks/useWIshList"
import ProductCard from "../../components/ProductCard/ProductCard";
import NavBar from "../../components/NavBar/NavBar";
import "./WishList.css";

export const WishList=()=>{
    const {wishState,wishDispatch}= useWishList();
    const wishList= wishState.wishListData;
    const addToCartHandler=(id)=>{

    }
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
                addToCartHandler={()=>addToCartHandler(item._id)}
                />
             );
         })}
     </div>
     </main>
     </>
    )
}
