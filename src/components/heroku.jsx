import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/alice-carousel.css";
import './heroku.css'

function heroku() {
  return (
    <div className="background">
      <div className="container home-block">
        <div className="home-card">
          <div className="App">
            <AliceCarousel>
              <img src='/images/Slide1.png' className="sliderimg" alt=""/>
              <img src='/images/Slide2.png' className="sliderimg" alt=""/>
              <img src='/images/Slide3.png' className="sliderimg" alt=""/>
              <img src='/images/Slide4.png' className="sliderimg" alt=""/>
            </AliceCarousel>
          </div>
         </div>
       </div>
   </div>
  )
}

export default heroku

