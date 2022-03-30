import "./ProductCard.css"
import axios from "axios";
import { useEffect, useState } from "react";
import { useWishList } from "../../hooks/useWIshList";
import {useAuth} from "../../hooks/useAuth"
import { useProductList } from "../../hooks/useProductList";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../hooks/useCart";
import { ToastHandler } from "../../utils/toastify";

const ProductCard=({item})=>{
  
  const {token}= useAuth();
  const navigate= useNavigate();
  const {wishState,wishDispatch}= useWishList();
  const {productState}= useProductList();
  const initialProduct= productState.initialProduct;
  const [wished,setWished]=useState(false);
  const [carted,setCarted] = useState(false);
  const {state,dispatch} = useCart();
  const addToWishListHandler=async(id)=>{
    if(!token)
       {
         navigate("/login");
       }
       else{
        const item= initialProduct.find(element=>element._id===id);
        try{
               const response= await axios.post('/api/user/wishlist',{product:item},
               {
                 headers:{
                   authorization: token,
               },
             }
               )
               if(response.status===201)
               setWished(true);
               ToastHandler("success", "Successfully added to wishlist");
               wishDispatch({type:"ADD_TO_WISHLIST", payload:response.data.wishlist})
            }
            catch (error){
              console.log(error);
            }
      }
  }

  const removeFromWishListHandler=async( id)=>{
    try{
      const response= await axios.delete(`/api/user/wishlist/${id}`,{
        headers:{
          authorization: token,
        }
      },)
     if(response.status===200)
       setWished(false);
       ToastHandler("warn", "Item removed successfully");
      wishDispatch({type:"ADD_TO_WISHLIST", payload:response.data.wishlist})
    }
    catch(error){
      console.log(error);
    }
  }

  const addToCartHandler=async(id)=>{
    if(!token)
     {
       navigate("/login");
     }
     else{
       const item= initialProduct.find(element=>element._id===id);
       
      try{
              const response= await axios.post('/api/user/cart',{product:item},
              {
                headers:{
                  authorization: token,
              },
            }
              )
             
              if(response.status===201)
              setCarted(true);
              ToastHandler("success","Successfully added to cart")
              dispatch({type:"ADD_TO_CART", payload:response.data.cart})
           }
           catch (error){
             console.log(error);
           }
    
     }
}

const goToCart=()=>{
   navigate("/cart");
}
  useEffect(()=>{
    if(wishState.wishListData.some((ele)=>ele._id===item._id))
      setWished(true);
    if(state.cartData.some((ele)=>ele._id===item._id))
    setCarted(true);
       
  },[wishState,state])

return (
    
          <div class="card relative">
            <div>
              <section className="relative">
                {!wished?<div className="absolute wishlist-icon "
                  onClick={()=>addToWishListHandler(item._id)}
                  ><i className="far fa-heart icon-sm"></i></div>:
                  
                  <div className="absolute wishlist-icon "
                  onClick={()=>removeFromWishListHandler(item._id)}
                  ><i class="fas fa-heart added-wishlist-icon"></i></div>
                  }

                  
                <img src={item.image} alt="sneaker" className="card-img"/>
              </section>
              <section class="sec-2">
                <div className="flex-row title-rating-container">
                <h3 className="product-title">{item.title}</h3>
                <p className="product-rating">{item.rating} <i className="fas fa-star"></i></p>
                </div>
                
                <p className="price-tag"><strong>Rs. {item.price}</strong></p>
              </section>
            </div>

            <section className="sec-3">{item.description}</section>
            <footer>
              {!carted?<button className="btn productCard-button add-cart-btn flex-row absolute"
              onClick={()=>addToCartHandler(item._id)}
              >Add to Cart</button>:
              
              <button className="btn productCard-button go-cart-btn flex-row absolute"
              onClick={goToCart}
              >Go to Cart</button>
              }

              
              
            </footer>
        </div>
    
);
}

export default ProductCard;