import { useState } from "react";
import NavBar from "../../components/NavBar/NavBar";
import { useAuth } from "../../hooks/useAuth";
import "./ProfilePage.css"

export const ProfilePage=()=>{
    const [profile,setprofile]= useState(true);
    const {user,logOutHandler}= useAuth();
    const toggleProfileTab=()=>{
      setprofile((curr)=>!curr);
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
               <h4 className="profile-card-headings new-address">+ New Address</h4>
               </>
               }
               
           </div>
        </div>
        </>
    )
}