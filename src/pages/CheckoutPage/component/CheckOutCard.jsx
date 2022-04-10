import "./CheckOutCard.css"
import { useCart } from "../../../hooks/useCart"
import { useAuth } from "../../../hooks/useAuth";
import { useOrder } from "../../../contexts/Order-Context";
import { ToastHandler } from "../../../utils/toastify";
import { useNavigate } from "react-router-dom";


const CheckOutCard=()=>{
    const {state,dispatch}= useCart();
    const cart=state.cartData;
    const {user}= useAuth();
    const {orderDispatch}= useOrder();
    const navigate= useNavigate();
    const {name,email}= user || {}

    const price= cart.reduce((acc,curr)=>{
        return (acc+ curr.quantity* curr.originalPrice)
    },0);

    const amtSaved= cart.reduce((acc,curr)=>{
        return (acc+ curr.quantity*(curr.originalPrice-curr.price))
      },0);

    const totalPrice= price-amtSaved;

    const loadScript = async (url) => {
        return new Promise((resolve) => {
          const script = document.createElement('script');
          script.src = url;
    
          script.onload = () => {
            resolve(true);
          };
    
          script.onerror = () => {
            resolve(false);
          };
    
          document.body.appendChild(script);
        });
      };

    const displayRazorpay = async () => {
        const res = await loadScript(
          'https://checkout.razorpay.com/v1/checkout.js'
        );
    
        if (!res) {
          alert('Razorpay SDK failed to load, check you connection', 'error');
          return;
        }
    
        const options = {
          key: 'rzp_test_H2EkbMmU00MeyY',
          amount: totalPrice * 100,
          currency: 'INR',
          name: 'one8 Store',
          description: 'Thank you for shopping with us',
          image:
            'https://res.cloudinary.com/doohtm4bs/image/upload/v1648196922/Notes%20app/one8_sppttb.png',

          handler: function (response) {
            const tempObj = {
              products: [...cart],
              amount: totalPrice,
              paymentId: response.razorpay_payment_id,
            };
            orderDispatch({ type: 'ADD_ORDERS', payload: tempObj });
            ToastHandler('success', 'Payment succesfull');
            navigate('/order');
            dispatch({type: "ADD_TO_CART", payload: [] });
          },
          prefill: {
            name: `${name}`,
            email: email,
            contact: '7653495732',
          },
          theme: {
            color: '#392F5A',
          },
        };
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
      };
    

    return (
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
                         Rs.{" "}
                     {price}
                     </p>
                 </div>
                 <div className="calculate-price flex-row">
                     <p>Discount:</p>
                     <p>
                         -Rs.{" "}
                        {amtSaved}
                     </p>
                 </div>
                 <div className="calculate-price flex-row">
                     <p>Delivery charges:</p>
                     <p> Free</p>
                 </div>
                 <div className="calculate-price flex-row">
                     <p><strong>Total Amount:</strong></p>
                     <p>Rs.{" "}
                     {totalPrice}
                     </p>
                 </div>
               </section>
               <button className="btn order-btn flex-row"
               onClick={displayRazorpay}
               >
                 Place Order
                </button>
          </div>
    )
}


export {CheckOutCard};