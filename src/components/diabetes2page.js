import React from 'react'
import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/alice-carousel.css";
import './heroku.css'

function Diabetes2page() {
    return (
        <div>
            <div className="background">
                <div className="container home-block">
                    <div className="home-card">
                    <div className="App">
                        <AliceCarousel disableDotsControls='False'>
                            <img src='/images/Slide1.png' className="sliderimg" alt=""/>
                            <img src='/images/Slide2.png' className="sliderimg" alt=""/>
                            <img src='/images/Slide3.png' className="sliderimg" alt=""/>
                            <img src='/images/Slide4.png' className="sliderimg" alt="" />
                            <img src='/images/Slide5.png' className="sliderimg" alt=""/>
                            <img src='/images/Slide6.png' className="sliderimg" alt=""/>
                            <img src='/images/Slide7.png' className="sliderimg" alt=""/>
                            <img src='/images/Slide8.png' className="sliderimg" alt="" />
                            <img src='/images/Slide9.png' className="sliderimg" alt=""/>
                            <img src='/images/Slide10.png' className="sliderimg" alt=""/>
                            <img src='/images/Slide11.png' className="sliderimg" alt=""/>
                            <img src='/images/Slide12.png' className="sliderimg" alt="" />
                            <img src='/images/Slide13.png' className="sliderimg" alt=""/>
                            <img src='/images/Slide14.png' className="sliderimg" alt="" />
                            <img src='/images/Slide15.png' className="sliderimg" alt="" />
                            <img src='/images/Slide16.png' className="sliderimg" alt="" />
                            <img src='/images/Slide17.png' className="sliderimg" alt=""/>
                            <img src='/images/Slide18.png' className="sliderimg" alt="" />
                            <img src='/images/Slide19.png' className="sliderimg" alt=""/>
                        </AliceCarousel>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Diabetes2page
