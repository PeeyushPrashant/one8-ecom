 import { useNavigate, useParams } from "react-router-dom";
 import { useProductList } from "../../hooks/useProductList";
 import NavBar from "../../components/NavBar/NavBar";
import "./ProductDetails.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useCart } from "../../hooks/useCart";
import { ToastHandler } from "../../utils/toastify";

export const ProductDetails=()=>{
   const {productId}= useParams();
   const {productState} = useProductList();
   const {token} = useAuth();
   const {state,dispatch}= useCart();
   const [carted,setCarted]= useState(false);
   const navigate= useNavigate();
   const initialProduct= productState.initialProduct;
   const item= initialProduct.find((ele)=>ele._id===productId);
   const {_id,title,description,price,image}= item || {}
   
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
    if(state.cartData.some((ele)=>ele._id===item._id))
    setCarted(true);
       
  },[state])

    return(
        <>
        <NavBar/>
        {_id && (
             <div className="product-detail-container flex-row">
             <div className="card product-detail-card">
                 <div className="card-img-cont">
                    <img src={image} alt="sneaker" className="prod-img"/>
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