import "./Cart.css";
import {useCart} from "../../hooks/useCart";
import NavBar from "../../components/NavBar/NavBar"
import { useNavigate } from "react-router-dom";
import { DataCard } from "./cart-component/DataCard";


export const Cart=()=>{
    const {state}= useCart();
    const cart=state.cartData;
    const navigate= useNavigate();
  
return (
        <>
        <NavBar/>
      <main className="main">
        {cart.length > 0 && <h2 className="cart-heading">My cart ({cart.length})</h2>}
        {cart.length === 0 && <h2 className="cart-heading">Your Cart is empty</h2>}
        <div className="cart cart-container flex-row">
          
          <div className="cart-list flex-col">
            {cart.map((item) => {
              return (
                <DataCard
                item={item}
                />
                ); 
             })} 
          </div>
         
          {cart.length > 0 && (
            <div className="cart-vertical flex-col">
              <p className="bigger-cart-text">
                <strong>Price Details</strong>
              </p>
              <hr className="horizontal-line" />
              {cart.map((item) => {
                return (
                  <div className="calculate flex-row">
                    <p>{item.title}</p>
                    <p>Q:{item.quantity}</p>
                    <p>Rs. {item.quantity * item.price}</p>
                  </div>
                );
              })}
              <hr className="horizontal-line" />
              <p className="bigger-cart-text calculate flex-row">
                <strong>Total Amount</strong>
                <strong>
                  Rs.{" "}
                  {cart.reduce((acc, curr) => {
                    return acc + curr.quantity * curr.price;
                  }, 0)}
                </strong>
              </p>
              <hr className="horizontal-line" />
  
              
                <button className="btn checkout-btn flex-row"
                onClick={()=>navigate("/checkout")}
                >
                  Proceed To Checkout
                </button>
              
            </div> 
          )}
        </div>
      </main>
      </>
    );
}

