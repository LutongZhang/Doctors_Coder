import React, { useState, render } from "react";
import Carousel from "react-bootstrap/Carousel";

import "./style.css"


function HomePage() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    // <div>
    //   <p4 >Doctor's Coder</p4>
    //   <Carousel
    //     activeIndex={index}
    //     onSelect={handleSelect}
    //     slide={true}
    //     style={{ width: "600px", margin: "auto" }}
    //   >
    //     <Carousel.Item>
    //       <img className="d-block w-100" src={device1} alt="First slide" />
    //       <Carousel.Caption>
    //         <h3>First slide label</h3>
    //         <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
    //       </Carousel.Caption>
    //     </Carousel.Item>
    //     <Carousel.Item>
    //       <img className="d-block w-100" src={device2} alt="Second slide" />

    //       <Carousel.Caption>
    //         <h3>Second slide label</h3>
    //         <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    //       </Carousel.Caption>
    //     </Carousel.Item>
    //     <Carousel.Item>
    //       <img className="d-block w-100" src={device3} alt="Third slide" />

    //       <Carousel.Caption>
    //         <h3>Third slide label</h3>
    //         <p>
    //           Praesent commodo cursus magna, vel scelerisque nisl consectetur.
    //         </p>
    //       </Carousel.Caption>
    //     </Carousel.Item>
    //   </Carousel>
    // </div>
    <body id="page-top">
   
    <header class="masthead">
        <div class="container">
            <div class="masthead-subheading">Welcome To Our Website</div>
            <div class="masthead-heading text-uppercase">It's Nice To Meet You</div>
            <a class="btn btn-primary btn-xl text-uppercase js-scroll-trigger" href="/search">start here</a>
        </div>
    </header>
    <br/>
    <br/>
      <div class="row justify-content-center">
        <div class="col-lg-8 text-center">
          <h2 >Let's Get In Touch!</h2>
          <hr class="divider my-4"></hr>
          <h3 class="">Email: docscoder123@gmail.com</h3>
        </div>
      </div>
  
    </body>
  );
}

export default HomePage;
