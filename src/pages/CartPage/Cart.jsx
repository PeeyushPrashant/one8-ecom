import "./Cart.css";
import axios from "axios";
import {useCart} from "../../hooks/useCart";
import {useToken} from "../../hooks/useToken";
import NavBar from "../../components/NavBar/NavBar"
export const Cart=()=>{
    const {state,dispatch}= useCart();
    const cart=[...state.cartData];
    const {token}= useToken();
    const encodedToken=token;
  
    const removeHandler = async (productId) => {
   
      const response = await axios.delete(
        `/api/user/cart/${productId}`,
        {
            headers:{
              authorization: encodedToken,
          },
        }
      );
     
    dispatch({type:"ADD_TO_CART", payload:response.data.cart});
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
          item._id === id ? { ...item, quantity: item.quantity - 1 } : item
        )}
      );
    };
  
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
                <div className="cart-horizontal flex-row">
                  <div className="cart-image">
                    <img src={item.image} alt="sneaker" className="image" />
                  </div>
                  <div className="cart-content flex-col cart-display">
                    <p className="bigger-cart-text">
                      <strong classNameName="text-center">{item.title}</strong>
                    </p>
                    <p className="item-price">
                      <strong>
                        {item.price}{" "}
                        <span className="deleted-price">
                          <del>Rs. 2000</del>
                        </span>
                      </strong>
                    </p>
                    <span className="discount">40% off</span>
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
                        className="btn action-btn btn-icon  flex-row"
                        onClick={() => removeHandler(item._id)}
                      >
                        Remove from Cart
                      </button>
                    </footer>
                  </div>
                </div>
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
                  Rs.
                  {cart.reduce((acc, curr) => {
                    return acc + curr.quantity * curr.price;
                  }, 0)}
                </strong>
              </p>
              <hr className="horizontal-line" />
  
              <a href="/pages/checkout/checkout.html">
                <button className="btn checkout-btn flex-row">
                  Proceed To Checkout
                </button>
              </a>
            </div> 
          )}
        </div>
      </main>
      </>
    );
}

