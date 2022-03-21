import NavBar from "../../components/NavBar/NavBar";
import "./ProductList.css";
import Aside from "../../components/Aside/Aside";
import ProductCard from "../../components/ProductCard/ProductCard";
import { useProductList } from "../../hooks/useProductList";
import {useFilter} from "../../hooks/useFilter";
const ProductList= ()=>{
    const {state}= useProductList();
    const {filterstate}= useFilter();
    const initialProduct= state.initialProduct;

    const union=(...arr)=>{
      const concatedProducts= arr.reduce((acc,curr)=>acc.concat(curr));
      return concatedProducts;
    }

    const categoryFilter= (product,category)=>{
        let newData=[];
        let flag= false;
      for (const type in category)
      {
          if(category[type])
          {
              newData= union (newData,product.filter((item)=>item.categoryName===type))
              flag=true;
          }
      }
       return flag?newData:product;
    }

    const priceFilter=(product,maxPrice)=>{
        return product.filter((item)=>item.price<=maxPrice)
    }

    const ratingFilter=(product,rating)=>{
      return product.filter((item)=>item.rating>=rating);
    }
    const sortedProducts=(product,sortByPrice)=>{
        if (sortByPrice === "low-to-high") {
            return [...product].sort((a, b) => a.price - b.price);
          } else if (sortByPrice === "high-to-low")
            return [...product].sort((a, b) => b.price - a.price);
      
    }
    const filterProducts=()=>{
     let data= categoryFilter(initialProduct,filterstate.filter.category);
     data= priceFilter(data,filterstate.filter.maxPrice);
     if (filterstate.filter.rating)
     data= ratingFilter(data,filterstate.filter.rating);
     if(filterstate.filter.sortByPrice !=="")
      data= sortedProducts(data,filterstate.filter.sortByPrice);
     return data;
    }
    const filteredProduct= filterProducts();
    return (
        <div>
            <NavBar/>
            <main class="main flex-row">
                <Aside/>
                <div class="product-container">
                  {filteredProduct.map(({image,title,price,description,rating,_id})=>{
                      return (
                          <ProductCard
                          image={image}
                          title={title}
                         price={price}
                         description={description}
                         rating={rating}
                          />
                      );
                  })}
                </div>
            </main>
        </div>
    );
}

export default ProductList;