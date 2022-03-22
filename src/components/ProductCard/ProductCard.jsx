import "./ProductCard.css"
import { Link } from "react-router-dom";
const ProductCard=({image,title,price,description,rating,addToCartHandler,path})=>{
return (
    
          <div class="card relative">
            <div>
              <section className="relative">
                  <div className="absolute wishlist-icon "><i className="far fa-heart icon-sm"></i></div>
                <img src={image} alt="sneaker" className="card-img"/>
              </section>
              <section class="sec-2">
                <div className="flex-row title-rating-container">
                <h3 className="product-title">{title}</h3>
                <p className="product-rating">{rating} <i className="fas fa-star"></i></p>
                </div>
                
                <p className="price-tag"><strong>Rs. {price}</strong></p>
              </section>
            </div>

            <section className="sec-3">{description}</section>
            <footer>
              
              <button className="btn productCard-button  flex-row absolute"
              onClick={addToCartHandler}
              >Add to Cart</button>
              
            </footer>
        </div>
    
);
}

export default ProductCard;