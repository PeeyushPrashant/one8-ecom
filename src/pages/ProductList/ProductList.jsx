
import NavBar from "../../components/NavBar/NavBar";
import "./ProductList.css";
import Aside from "../../components/Aside/Aside";
import ProductCard from "../../components/ProductCard/ProductCard";
import { useProductList } from "../../hooks/useProductList";
import {useFilter} from "../../hooks/useFilter";
import { useEffect } from "react";
import { useCart } from "../../hooks/useCart";


export const ProductList= ()=>{
    const {sideBar, sideBarHandler}= useCart();
    const {productState,loader,setLoader}= useProductList();
    const {filterstate}= useFilter();
    const initialProduct= productState.initialProduct;
    
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

    const searchFilter=(product,search)=>{
        return product.filter((item)=>item.categoryName.includes(search.toLowerCase()))
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
     if(filterstate.filter.search!=="")
       data= searchFilter(data,filterstate.filter.search)
     if (filterstate.filter.rating)
     data= ratingFilter(data,filterstate.filter.rating);
     if(filterstate.filter.sortByPrice !=="")
      data= sortedProducts(data,filterstate.filter.sortByPrice);
     return data;
    }
    const filteredProduct= filterProducts();

    useEffect(()=>{
        setLoader(true);
        let id= setTimeout(()=>{
            setLoader(false)
        },1000)

        return ()=>clearTimeout(id);
    },[])

    

    return (
        <div>
            <NavBar/>
            <main className="main flex-row">
                <Aside/>
                <div className="right-cont flex-col" onClick={sideBar && sideBarHandler}>
                    <h3 className="product-count">{`Showing ${filteredProduct.length} products`}</h3>
                <div className="product-container">
                  {filteredProduct.length>0? filteredProduct.map((item)=>{
                      return (
                          <ProductCard
                          key={item._id}
                          item={item}
                          
                          />
                      );
                  }):
                  <h2>No products found</h2>
                  }
                </div>
                </div>
            </main>
        </div>
    );
}

