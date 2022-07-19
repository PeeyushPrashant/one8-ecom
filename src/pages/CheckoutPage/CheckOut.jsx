import "./CheckOut.css"
import NavBar from "../../components/NavBar/NavBar"
import { CheckOutCard } from "./component/CheckOutCard";
import { useState } from "react";
import { useAddress } from "../../hooks/useAddress";
import { useNavigate } from "react-router-dom";

export const CheckOut=()=>{
    const[address,setAddress]=useState(false);
    const selectAddress=()=>{
        setAddress((curr)=>curr===true?curr:!curr);
    }
    const {addressState}= useAddress();
    const addressData=  addressState.addressData;
    const navigate= useNavigate()
    return (
       <>
       <NavBar/>
       <div className="checkout-container flex-row">
           {addressData.length<1?<div className="text-center flex-col">
               <h2 >Please Add an Address</h2>
               <button className="btn btn-primary" onClick={()=>navigate("/user_profile")}>Go To Address</button>
           </div>:
           <div className="user-address flex-col">
               {addressData.map((item)=>{
                   return(
                    <div className="card address-card">
                    <section className="address-head flex-row">
                        <input type="radio" name="address" onClick={selectAddress}/>
                        <h4 className="name">{item.name}</h4>
                    </section>
                    <section className=" flex-col">
                        <p>{item.street}, {item.city}, {item.state}, {item.pincode}</p>
                         <p>{item.country}</p>
                         <p>Contact: {item.mobile} </p>
                    </section> 
                  </div>  
                   )
               })}
           </div>
           }
           <CheckOutCard
          address={address}
          />
       </div>
       </>
    );
}