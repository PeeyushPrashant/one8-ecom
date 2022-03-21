import "./ProductCard.css"

const ProductCard=({image,title,price,description,rating})=>{
return (
    
          <div class="card relative">
            <div>
              <section className="relative">
                  <div className="absolute wishlist-icon "><i class="far fa-heart icon-sm"></i></div>
                <img src={image} alt="sneaker" className="card-img"/>
              </section>
              <section class="sec-2">
                <div className="flex-row title-rating-container">
                <h3 className="product-title">{title}</h3>
                <p className="product-rating">{rating} <i class="fas fa-star"></i></p>
                </div>
                
                <p class="price-tag"><strong>Rs. {price}</strong></p>
              </section>
            </div>

            <section class="sec-3">{description}</section>
            <footer>
              <button class="btn productCard-button  flex-row absolute">Add to Cart</button>
              
            </footer>
        </div>
    
);
}

export default ProductCard;