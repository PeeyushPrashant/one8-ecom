
import { useState } from "react";
import "./Coupon.css"

const Coupon=({setCouponModal,setCoupon,coupon})=>{
    const [selectedCoupon,setSelectedCoupon]= useState(coupon);
    const couponData=[
        {
            discount:25,
            offer:"HOLI_SPECIAL"
        },
        {
            discount:35,
            offer:"NEW_USER"
        }
    ];

    const applyCoupon=()=>{
        setCouponModal(false);
        setCoupon(selectedCoupon);
    }
    return(
    <div className="backdrop">
         <div className="coupon-card flex-col">
             <header className="coupon-header flex-row">
               <h3 className="zero-margin">Apply Coupon</h3>
               <p className="select-coupon" onClick={()=>setCouponModal(false)}><i class="fas fa-times"></i></p>
             </header>
             <section className="coupon-option flex-col">
                 {couponData.map((item)=>{
                     return(
                         <div className="discount-option">
                        <input type="radio" name="coupon" className="select-coupon"
                        onChange={()=>setSelectedCoupon((curr)=>({...curr,discount:item.discount, offer:item.offer}))}
                        value={coupon}
                        checked={selectedCoupon.offer===item.offer?true:false}
                        /> 
                         {item.discount}% OFF: {item.offer}
                         </div>
                     )
                 })}
             </section>
             <button className="btn btn-secondary apply-btn" onClick={applyCoupon}>APPLY</button>
         </div>
    </div>
    )
}

export {Coupon}