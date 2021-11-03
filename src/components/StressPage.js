import React from 'react'
import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/alice-carousel.css";
import './heroku.css'

function StressPage() {
    return (
        <div>
            <div className="background">
                <div className="container home-block">
                    <div className="home-card">
                        <AliceCarousel disableDotsControls='False'>
                            <img src='/stress_image/0001.jpg' className="sliderimg" alt=""/>
                            <img src='/stress_image/0002.jpg' className="sliderimg" alt=""/>
                            <img src='/stress_image/0003.jpg' className="sliderimg" alt=""/>
                            <img src='/stress_image/0004.jpg' className="sliderimg" alt="" />
                            <img src='/stress_image/0005.jpg' className="sliderimg" alt=""/>
                            <img src='/stress_image/0006.jpg' className="sliderimg" alt=""/>
                            <img src='/stress_image/0007.jpg' className="sliderimg" alt=""/>
                        </AliceCarousel>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StressPage
