import { useState } from "react";
import NavBar from "../../components/NavBar/NavBar";
import { useAuth } from "../../hooks/useAuth";
import { useAddress } from "../../hooks/useAddress";
import AddressForm from "../../components/Address/AddressForm";
import axios from "axios";
import { ToastHandler } from "../../utils/toastify";
import "./ProfilePage.css"

export const ProfilePage=()=>{
    const [profile,setprofile]= useState(true);
    const [newAddress,setNewAddress]= useState(false);
    const initialVal = {
        name:"",
        street:"",
        city:"",
        state:"",
        country:"",
        pincode:"",
        mobile:"",
        _id:""
    }
    const [formInput,setFormInput] = useState(initialVal);
    const {user,logOutHandler,token}= useAuth();
    const {addressState, addressDispatch}= useAddress();
    const addressData=  addressState.addressData;
    const toggleProfileTab=()=>{
      setprofile((curr)=>!curr);
    }
    const openAddressForm=()=>{
        setNewAddress((curr)=>!curr);
    }
    const closeAddressForm=()=>{
        setNewAddress((curr)=>!curr);
        setFormInput(initialVal);
    }
    const changeHandler=(e)=>{
        const {name}= e.target;
        setFormInput({...formInput,[name]:e.target.value})
    }
    const dummyHandler=()=>{
        setFormInput({...formInput,
        name:"Admin",
        street:"Patliputra",
        city:"Patna",
        state:"Bihar",
        country:"India",
        pincode:"800001",
        mobile:"6789054321",
        _id:""
    })
    }
    const editHandler=({name,street,city,state,country,pincode,_id,mobile})=>{
        setFormInput((form)=>({...form,
        name,
        street,
        city,
        state,
        country,
        pincode,
        mobile,
        _id
        }));
        setNewAddress((curr)=>!curr);
    }
    const removeHandler=async(id)=>{
        try {
             const response= await axios.delete(`/api/user/address/${id}`,
             {
                headers:{
                authorization: token,
             },
            })
            ToastHandler("warn", "Address deleted successfully");
            addressDispatch({type:"ADD_ADDRESS",payload:response.data.address});
        } catch (error) {
            console.log(error);
        }
    }
    const handleSubmit=async(id)=>{
        setNewAddress((curr)=>!curr);
        try {
            if(id){
                const response = await axios.post(`/api/user/address/${id}`,{address:formInput},
                {
                    headers:{
                    authorization: token,
                 },
                })

                if(response.status===200 || response.status===201)
                 {
                     ToastHandler("success", "Address updated successfully");
                     addressDispatch({type:"ADD_ADDRESS",payload:response.data.address});
                     setFormInput(initialVal);
                 }
            }
            else{
                const response= await axios.post("/api/user/address", {address:formInput},
                 {
                    headers:{
                    authorization: token,
                 },
                })
                if(response.status===200 || response.status===201)
                 {
                    ToastHandler("success", "Address added successfully");
                     addressDispatch({type:"ADD_ADDRESS",payload:response.data.address});
                     setFormInput(initialVal);
                 }
            } 
            
        } catch (error) {
            console.log(error);
        }
    }
    return(
        <>
        <NavBar/>
        <div className="profile-page-container flex-row">
           <div className="card profile-card">
               <header className="flex-row">
                   <div className="header-tab" onClick={toggleProfileTab}>Profile</div>
                   <div className="header-tab" onClick={toggleProfileTab}>Address</div>
               </header>
               {profile? <>
                <h3 className="profile-card-headings">Profile Details</h3>
               <section className="user-details flex-col">
                   <div className="user-data flex-row">
                       <h4 className="profile-card-headings">Name:</h4>
                       <p>{user.name}</p>
                   </div>
                   <div className=" user-data flex-row">
                       <h4 className="profile-card-headings">Email:</h4>
                       <p>{user.email}</p>
                   </div>
               </section>
               <h3 className="profile-card-headings">Account Settings</h3>
               <footer>
                   <button className="btn btn-icon"
                   onClick={logOutHandler}
                   >Log Out</button>
               </footer>
               </>:
               <>
               <h3 className="profile-card-headings">My Address</h3>
               {addressData.length>0 && addressData.map((item)=>{
                   return (
                       <div className="address-container flex-col">
                        <h4 className="name">{item.name}</h4>
                        <p>{item.street}, {item.city}, {item.state}</p>
                        <p>{item.pincode}</p>
                        <p>{item.country}</p>
                        <p>Contact: {item.mobile}</p>
                        <div className="address-btn flex-row">
                            <button className="edit-btn" onClick={()=>editHandler(item)}>Edit</button>
                            <button className="remove-btn" onClick={()=>removeHandler(item._id)}>Remove</button>
                        </div>
                       </div>
                   )
               })}
               <h4 className="profile-card-headings new-address" onClick={openAddressForm}>+ New Address</h4>
               </>
               }
                
           </div>
           {newAddress && <AddressForm
            closeAddressForm={closeAddressForm}
            formInput={formInput}
            changeHandler={changeHandler}
            dummyHandler={dummyHandler}
            handleSubmit={handleSubmit}
           />}
        </div>
        </>
    )
}