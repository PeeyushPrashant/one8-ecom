 import { useNavigate, useParams } from "react-router-dom";
 import { useProductList } from "../../hooks/useProductList";
 import NavBar from "../../components/NavBar/NavBar";
import "./ProductDetails.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useCart } from "../../hooks/useCart";
import { ToastHandler } from "../../utils/toastify";
import { useWishList } from "../../hooks/useWIshList";

export const ProductDetails=()=>{
   const {productId}= useParams();
   const {productState} = useProductList();
   const {token} = useAuth();
   const {wishState,wishDispatch}= useWishList();
   const {state,dispatch}= useCart();
   const [wished,setWished]=useState(false);
   const [carted,setCarted]= useState(false);
   const navigate= useNavigate();
   const initialProduct= productState.initialProduct;
   const item= initialProduct.find((ele)=>ele._id===productId);
   const {_id,title,description,price,image}= item || {}
   
  const addToWishListHandler=async(id)=>{
    if(!token)
       {
         navigate("/login");
       }
       else{
        try{
               const response= await axios.post('/api/user/wishlist',{product:item},
               {
                 headers:{
                   authorization: token,
               },
             }
               )
               if(response.status===201 || response.status===200){
               ToastHandler("success", "Successfully added to wishlist");
               wishDispatch({type:"ADD_TO_WISHLIST", payload:response.data.wishlist})
               }
            }
            catch (error){
              console.log(error);
            }
      }
  }

  const removeFromWishListHandler=async(id)=>{
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
       
  },[state,wishState])

    return(
        <>
        <NavBar/>
        {_id && (
             <div className="product-detail-container flex-row">
             <div className="card product-detail-card">
                 <div className="card-img-cont relative">
                    <img src={image} alt="sneaker" className="prod-img"/>
                    {!wished?<div className="absolute wish-icon "
                  onClick={()=>addToWishListHandler(_id)}
                  ><i className="far fa-heart icon-sm"></i></div>:

                  <div className="absolute wish-icon "
                  onClick={()=>removeFromWishListHandler(_id)}
                  ><i className="fas fa-heart added-wishlist-icon"></i></div>
                  }
                    
              </div>
                 <div className="product-details flex-col">
                    <h1 className="heading-tag">{description}</h1>
                    <h3 className="heading-tag">Rs. {price}</h3>
                    <hr className="horizontal-line"/>
                    <section className="flex-row product-brand">
                    <h4 className="heading-tag">Brand:</h4>
                    <p>{title}</p>
                    </section>
                    <h3 className="heading-tag">Description:</h3>
                    <section>
                        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nulla vel eligendi 
                         error asperiores quaerat fuga eveniet culpa. Voluptatibus, possimus perspiciatis.</p>
                    </section>
                    <footer className="flex-row cta-buttons">
                    {!carted?<button className="btn btn-primary"
                   onClick={()=>addToCartHandler(_id)}
                   >Add to Cart</button>:
                   
                   <button className="btn  go-cart-btn "
                   onClick={goToCart}
                   >Go to Cart</button>
                   }
     
                       <button className="btn btn-icon">Buy Now</button>
                    </footer>
                 </div>
             </div>
             </div>
        )}
        
        </>
    );
}