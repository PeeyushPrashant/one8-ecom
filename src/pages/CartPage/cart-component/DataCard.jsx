import axios from "axios";
import { useAuth } from "../../../hooks/useAuth"
import { useCart } from "../../../hooks/useCart";
import { ToastHandler } from "../../../utils/toastify"
import { useEffect, useState } from "react";
import { useWishList } from "../../../hooks/useWIshList";
import { useNavigate } from "react-router-dom";
import "./DataCard.css"

const DataCard=({item})=>{
    const [wished,setWished]=useState(false);
    const  {state,dispatch}= useCart();
    const {wishState,wishDispatch}= useWishList();
    const cart=state.cartData;
    const {token}= useAuth();
    const navigate= useNavigate();


    const addToWishListHandler=async(e)=>{
      if(e.target.innerText==="Go To Wishlist")
      {
        navigate("/wishlist");
      }
      else {
       try{
         
          const response=await axios.post('/api/user/wishlist',{product:item},
          {
            headers:{
              authorization: token,
          },
        })
         if(response.status===200 || response.status===201)
          {
            ToastHandler("success", "Successfully added to wishlist");
            wishDispatch({type:"ADD_TO_WISHLIST", payload:response.data.wishlist})
          }
       }
       catch(error){
         console.log(error);
       }
      }
    }

    const removeHandler = async (productId) => {
      try{
        var response = await axios.delete(
          `/api/user/cart/${productId}`,
          {
              headers:{
                authorization: token,
            },
          }
        );
        dispatch({type:"ADD_TO_CART", payload:response.data.cart});
        ToastHandler("warn","Item removed successfully");
      }
      catch(error)
      {
        console.log(error);
      }
     
    
    };

    const increaseCountHandler = (id) => {
      dispatch({ type:"PRODUCT_COUNT", payload:
        cart.map((item) =>
          item._id === id ? { ...item, quantity: item.quantity + 1 } : item
        )}
      );
    };
  
    const decreaseCountHandler = (id) => {
        dispatch({ type:"PRODUCT_COUNT", payload:
        cart.map((item) =>
          item._id === id ? { ...item, quantity:item.quantity>1? item.quantity - 1:1} : item
        )}
      );
    };

    useEffect(()=>{
     if(wishState.wishListData.some((ele)=>ele._id===item._id))
     setWished(true);
    },[wishState])

    return(
        <div className="cart-horizontal flex-row">
                  <div className="cart-image">
                    <img src={item.image} alt="sneaker" className="image" />
                  </div>
                  <div className="cart-content flex-col cart-display">
                    <p className="bigger-cart-text">
                      <strong className="text-center">{item.title}</strong>
                    </p>
                    <p className="item-price">
                      <strong>Rs.{" "}
                        {item.price}{" "}
                        <span className="deleted-price">
                          <del>Rs. {item.originalPrice}</del>
                        </span>
                      </strong>
                    </p>
                    <span className="discount">{item.discount}% OFF</span>
                    <section className="product-count flex-row">
                      <p>Quantity:</p>
                      <p
                        style={{ cursor: "pointer" }}
                        onClick={() => decreaseCountHandler(item._id)}
                      >
                        <i className="fas fa-minus-circle"></i>
                      </p>
                      <div className="count">
                        <p>{item.quantity}</p>
                      </div>
                      <p
                        style={{ cursor: "pointer" }}
                        onClick={() => increaseCountHandler(item._id)}
                      >
                        <i className="fas fa-plus-circle"></i>
                      </p>
                    </section>
                    <footer>
                    <button
                        className="btn  btn-secondary add-wishlist-btn  flex-row"
                        onClick={(e)=>{
                          addToWishListHandler(e)}}
                      >
                       {wished?"Go To Wishlist" :"Add To Wishlist"}
                      </button>
                    
                    <button
                        className="btn action-btn btn-icon  flex-row"
                        onClick={() => removeHandler(item._id)}
                      >
                        Remove from Cart
                      </button>
                    </footer>
                  </div>
                </div>
    )
}

export {DataCard};