import "./CheckOut.css"
import NavBar from "../../components/NavBar/NavBar"
import {useCart} from "../../hooks/useCart";

export const CheckOut=()=>{
    const {state,dispatch}= useCart();
    const cart=[...state.cartData];
    return (
       <>
       <NavBar/>
       <div className="checkout-container flex-row">
          <div className="card address-card">
            <section className="address-head flex-row">
                <input type="radio" />
                <p>Prashant</p>
            </section>
            <section className=" flex-col">
                <p>Yuvraj Mansion, Road no.-1, Rajeev Nagar,Patna</p>
                 <p>Bihar - 560093</p>
                 <p>Phone Number : 8897456381</p>
            </section>
          </div>

          <div className="card checkout-card">
               <header className="checkout-head">Order Details</header>
               <hr className="horizontal-line"/>
               <section className="product-details flex-col">
                   <div className="product-details-head flex-row">
                    <h4>Item</h4>
                    <h4>Qty</h4>
                   </div>
                   {cart.map((item)=>{
                       return(
                           <div className="products-count flex-row">
                              <p>{item.title}</p>
                              <p>{item.quantity}</p>
                           </div>
                       )
                   })}
               </section>
               <hr className="horizontal-line"/>
               <header className="checkout-head">Price Details</header>
               <hr className="horizontal-line"/>
               <section className="price-details flex-col">
                 <div className="calculate-price flex-row">
                     <p>Price:</p>
                     <p>
                         Rs.
                     {cart.reduce((acc,curr)=>{
                         return (acc+ curr.quantity* curr.price)
                     },0)}
                     </p>
                 </div>
                 <div className="calculate-price flex-row">
                     <p>Discount:</p>
                     <p>
                         Rs.500
                     </p>
                 </div>
                 <div className="calculate-price flex-row">
                     <p>Delivery charges:</p>
                     <p> Free</p>
                 </div>
                 <div className="calculate-price flex-row">
                     <p><strong>Total Amount:</strong></p>
                     <p>Rs. 10000</p>
                 </div>
               </section>
               <button className="btn order-btn flex-row">
                  Proceed To Checkout
                </button>
          </div>
       </div>
       </>
    );
}