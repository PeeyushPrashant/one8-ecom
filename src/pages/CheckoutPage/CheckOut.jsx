import "./CheckOut.css"
import NavBar from "../../components/NavBar/NavBar"
import { CheckOutCard } from "./component/CheckOutCard";
import { useState } from "react";

export const CheckOut=()=>{
    const[address,setAddress]=useState(false);
    const selectAddress=()=>{
        setAddress((curr)=>!curr);
    }
    return (
       <>
       <NavBar/>
       <div className="checkout-container flex-row">
          <div className="card address-card">
            <section className="address-head flex-row">
                <input type="radio" onClick={selectAddress}/>
                <p>Prashant</p>
            </section>
            <section className=" flex-col">
                <p>Yuvraj Mansion, Road no.-1, Rajeev Nagar,Patna</p>
                 <p>Bihar - 560093</p>
                 <p>Phone Number : 8897456381</p>
            </section>
          </div>

          <CheckOutCard
          address={address}
          />
       </div>
       </>
    );
}