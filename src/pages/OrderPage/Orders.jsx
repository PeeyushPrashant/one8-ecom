import "./Orders.css"
import NavBar from "../../components/NavBar/NavBar"
import { useOrder } from "../../contexts/Order-Context"

export const Orders=()=>{
    const {orderState,orderDispatch}= useOrder();
    const orders= orderState.orderData;
    return(
      <>
      <NavBar/>
      <div >
        <h1 className="order-heading">Order Summary</h1>
        <div className="order-container flex-col">
            <header className="order-info flex-col">
                <h3 className="order-status">Order Confirmed</h3>
                <div className="payment-info flex-row">
                    <p><strong>Payment ID:</strong></p>
                    <p>{orders. paymentId}</p>
                </div>
                <div className="payment-info flex-row">
                <p><strong>Total Amount:</strong></p>
                 <p>Rs.{" "} {orders.amount}</p>
                </div>
            </header>
            {orders.products.map((item)=>{
                return (
                    <div className="order-card flex-row">
                  <div className="order-image-cont">
                    <img src={item.image} alt="sneaker" className="order-image" />
                  </div>
                  <div className="cart-content flex-col cart-display">
                    <p className="product-brand">
                      <strong >{item.title}</strong>
                    </p>
                    <p className="item-details">
                        Price: {" "} Rs. {" "}
                      {item.price* item.quantity}
                    </p>
                    <p className="item-details">
                        Total Quantity: {" "}
                      {item.quantity}
                    </p>
                  </div>
                </div>
                )
            })}
        </div>
      </div>
      </>
    )
}