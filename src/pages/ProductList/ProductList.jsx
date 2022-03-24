import axios from "axios";
import NavBar from "../../components/NavBar/NavBar";
import "./ProductList.css";
import Aside from "../../components/Aside/Aside";
import ProductCard from "../../components/ProductCard/ProductCard";
import { useProductList } from "../../hooks/useProductList";
import {useFilter} from "../../hooks/useFilter";
import {useToken} from "../../hooks/useToken"
import { useCart } from "../../hooks/useCart";
import { useWishList } from "../../hooks/useWIshList";
import { useNavigate } from "react-router-dom";

export const ProductList= ()=>{
    const {productState}= useProductList();
    const {filterstate}= useFilter();
    const initialProduct= productState.initialProduct;
    const {token}= useToken();
    const {dispatch} = useCart();
    const {wishDispatch,wished,setWished}= useWishList();
    const navigate= useNavigate();
    
    

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
                  {filteredProduct.map((item)=>{
                      return (
                          <ProductCard
                          item={item}
                          
                          />
                      );
                  })}
                </div>
            </main>
        </div>
    );
}

