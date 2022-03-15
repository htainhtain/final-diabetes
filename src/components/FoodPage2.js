import React from 'react'
import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/alice-carousel.css";
import './heroku.css'

function FoodPage2() {
    return (
        <div>
            <div className="background">
                <div className="container home-block">
                    <div className="home-card">
                    <div className="App">
                        <AliceCarousel disableDotsControls='False'>
                            <img src='/food_image/0001.jpg' className="sliderimg" alt="" loading='lazy'/>
                            <img src='/food_image/0002.jpg' className="sliderimg" alt="" loading='lazy'/>
                            <img src='/food_image/0003.jpg' className="sliderimg" alt="" loading='lazy'/>
                            <img src='/food_image/0004.jpg' className="sliderimg" alt="" loading='lazy'/>
                            <img src='/food_image/0005.jpg' className="sliderimg" alt="" loading='lazy'/>
                            <img src='/food_image/0006.jpg' className="sliderimg" alt="" loading='lazy'/>
                            <img src='/food_image/0007.jpg' className="sliderimg" alt="" loading='lazy'/>
                            <img src='/food_image/0008.jpg' className="sliderimg" alt="" loading='lazy'/>
                            <img src='/food_image/0009.jpg' className="sliderimg" alt="" loading='lazy'/>
                            <img src='/food_image/0010.jpg' className="sliderimg" alt="" loading='lazy'/>
                            <img src='/food_image/0011.jpg' className="sliderimg" alt="" loading='lazy'/>
                            <img src='/food_image/0012.jpg' className="sliderimg" alt="" loading='lazy'/>
                            <img src='/food_image/0013.jpg' className="sliderimg" alt="" loading='lazy'/>
                            <img src='/food_image/0014.jpg' className="sliderimg" alt="" loading='lazy'/>
                        </AliceCarousel>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FoodPage2
