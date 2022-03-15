import "./LandingPage.css"
import NavBar from "../../components/NavBar/NavBar";
const LandingPage= ()=>{
return (
   <div>
     <NavBar/>
    <main>
        <div class="home-img-container relative">
          <img
            src="https://res.cloudinary.com/doohtm4bs/image/upload/v1647335640/E-commerce/landingPage/landing-img_zv7bxe.avif"
            alt="sneaker"
            class="home-img"
          />
          <section class="main-text absolute flex-col">
            <h1 class="main-text-normal">The One8 Affair</h1>
            <h1 class="main-text-normal">Get Ready Get Better</h1>
            <a href="/pages/productList/productlist.html"
              ><button class="btn btn-primary">Shop Now</button></a
            >
          </section>
        </div>
        <h1 class="sub-head">Featured Brands in one8 store</h1>
        <section class="brands-container flex-row">
          <img
            src="https://res.cloudinary.com/doohtm4bs/image/upload/v1647336355/E-commerce/landingPage/nike-logo_lmbsfw.jpg"
            alt="nike logo"
            class="brand-img"
          />

          <img
            src="https://res.cloudinary.com/doohtm4bs/image/upload/v1647336355/E-commerce/landingPage/adidas-logo_o6ltbw.jpg"
            alt="adidas logo"
            class="brand-img"
          />
          <img src="https://res.cloudinary.com/doohtm4bs/image/upload/v1647336385/E-commerce/landingPage/puma_tgznyt.jpg" alt="puma logo" class="brand-img" />
        </section>
      </main>
      </div>
);
}

export default LandingPage;