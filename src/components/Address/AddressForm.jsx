import "./Address.css"

 const AddressForm=({closeAddressForm,formInput,changeHandler,handleSubmit,dummyHandler})=>{
    return (
        <>
        <div className="backdrop">
            <form action="" className="address-form flex-col" onSubmit={()=>handleSubmit(formInput._id)}>
               <h4 className="form-header">ADD NEW ADDRESS</h4>
               <input type="text" 
               placeholder="Enter name" 
               className="form-input"
               name="name"
               value={formInput.name}
               onChange={(e)=>changeHandler(e)}
               />
               <input type="text" 
               placeholder="Enter house no., road, colony" 
               className="form-input"
               name="street"
               value={formInput.street}
               onChange={(e)=>changeHandler(e)}/>
               <input type="text" 
               placeholder="Enter city"
               className="form-input"
               name="city"
               value={formInput.city}
               onChange={(e)=>changeHandler(e)}/>
               <input type="text" 
               placeholder="Enter state"
               className="form-input"
               name="state"
               value={formInput.state}
               onChange={(e)=>changeHandler(e)}/>
               <input type="text" 
               placeholder="Enter country"
               className="form-input"
               name="country"
               value={formInput.country}
               onChange={(e)=>changeHandler(e)}/>
              <input type="number" 
               placeholder="Enter pincode"
               className="form-input"
               name="pincode"
               value={formInput.pincode}
               onChange={(e)=>changeHandler(e)}/>
               <input type="number" 
               placeholder="Enter mobile no."
               className="form-input"
               name="mobile"
               value={formInput.mobile}
               onChange={(e)=>changeHandler(e)}/>
               <footer className="form-footer flex-row">
                   <button className="form-btn btn-primary" type="submit">Save</button>
                   <button className="form-btn cancel-btn" onClick={closeAddressForm}>Cancel</button>
                   <div className="form-btn btn-primary" onClick={dummyHandler}>Dummy</div>
               </footer>
            </form>
        </div>
        </>
    )
}

export default AddressForm;