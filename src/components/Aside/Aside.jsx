import "./Aside.css"
import{useFilter} from "../../hooks/useFilter";
const Aside= ()=>{
  const {filterstate,dispatch} = useFilter();
    return (
        <aside className="filters flex-col">
          <div className="sub-section flex-row">
            <h3 className="heading">Filters</h3>
            <p className="clear-out"
            onClick={()=>dispatch({type:"clear"})}
            >Clear All</p>
          </div>
          <hr className="horizontal-line" />
          <h3 className="heading">Price</h3>
          <div className="price-range flex-row">
            <p>0</p>
            <p>500</p>
            <p>1000</p>
          </div>
          <input type="range" className="range" 
          min="0"
          max="1000"
          value={filterstate.filter.maxPrice}
          onChange={(e)=>dispatch({type:"filter", payload:["maxPrice",e.target.value]})}
          />
          <hr className="horizontal-line" />
          <h3 className="heading">Category</h3>
          <ul className="list">
            <li>
              <input type="checkbox" 
              checked={filterstate.filter.category.nike}
              onChange={()=>dispatch({type:"filter",payload:["category",
              {...filterstate.filter.category,nike: !filterstate.filter.category.nike}
            ]})}
           
              />
              <span>Nike</span>
            </li>
            <li>
              <input type="checkbox"
              checked={filterstate.filter.category.adidas}
              onChange={()=>dispatch({type:"filter",payload:["category",
              {...filterstate.filter.category,adidas: !filterstate.filter.category.adidas}
            ]})}
              />
              <span>Adidas</span>
            </li>
            <li>
              <input type="checkbox" 
              checked={filterstate.filter.category.puma}
              onChange={()=>dispatch({type:"filter",payload:["category",
              {...filterstate.filter.category,puma: !filterstate.filter.category.puma}
            ]})}
              />
              <span>Puma</span>
            </li>
            <li>
              <input type="checkbox"
              checked={filterstate.filter.category.hrx}
              onChange={()=>dispatch({type:"filter",payload:["category",
              {...filterstate.filter.category,hrx: !filterstate.filter.category.hrx}
            ]})}
              />
              <span>HRX</span>
            </li>
          </ul>
          <hr className="horizontal-line" />
          <h3 className="heading">Rating</h3>
          <ul className="list">
            <li>
              <input type="radio" name="rating" 
              id="4-stars"
              checked={filterstate.filter.rating===4?true:false}
              onChange={()=>dispatch({type:"filter", payload:["rating",4]})}
              />
              <label for="4-stars">4 stars & above</label>
            </li>
            <li>
              <input type="radio" name="rating"
              id="3-stars"
              checked={filterstate.filter.rating===3?true:false}
              onChange={()=>dispatch({type:"filter", payload:["rating",3]})}
              />
              <label>3 stars & above</label>
            </li>
            <li>
              <input type="radio" name="rating" 
              id="4-stars"
              checked={filterstate.filter.rating===2?true:false}
              onChange={()=>dispatch({type:"filter", payload:["rating",2]})}
              />
              <label>2 stars & above</label>
            </li>
            <li>
              <input type="radio" name="rating" 
              id="4-stars"
              checked={filterstate.filter.rating===1?true:false}
              onChange={()=>dispatch({type:"filter", payload:["rating",1]})}
              />
              <label>1 stars & above</label>
            </li>
          </ul>
          <hr className="horizontal-line" />
          <h3 className="heading">Sort By</h3>
          <ul className="list">
            <li>
              <input type="radio" name="sort-by"
              id="low-to-high"
              checked={filterstate.filter.sortByPrice==="low-to-high"?true:false}
              onChange={()=>dispatch({type:"filter", payload:["sortByPrice", "low-to-high"]})}
              />
              <label for="low-to-high">Price-Low to High</label>
            </li>
            <li>
              <input type="radio" name="sort-by" 
              id="high-to-low"
              checked={filterstate.filter.sortByPrice==="high-to-low"?true:false}
              onChange={()=>dispatch({type:"filter", payload:["sortByPrice", "high-to-low"]})}
              />
              <label for="high-to-low">Price-High to Low</label>
            </li>
          </ul>
        </aside>
    );
}


export default Aside;