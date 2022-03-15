import React from 'react'
import ResponsivePlayer from "./video/ResponsivePlayer";
import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/alice-carousel.css";
import './heroku.css'
import { useTranslation } from 'react-i18next';

function ExercisePage() {
    const { t } = useTranslation();

    return (
        <>
            <div className="background">
                <div className="container home-block">
                    <div className="home-card">
                        <h3>{t('ExerciseVideo.1')}</h3>
                        <ResponsivePlayer />
                    </div>
                    <div className="home-card">
                        <h3>{t('ExerciseSlide.1')}</h3>
                        <AliceCarousel disableDotsControls='False'>
                            <img src='/exercise_image/0001.jpg' className="sliderimg" alt="" loading='lazy'/>
                            <img src='/exercise_image/0002.jpg' className="sliderimg" alt="" loading='lazy'/>
                            <img src='/exercise_image/0003.jpg' className="sliderimg" alt="" loading='lazy'/>
                            <img src='/exercise_image/0004.jpg' className="sliderimg" alt="" loading='lazy'/>
                            <img src='/exercise_image/0005.jpg' className="sliderimg" alt="" loading='lazy'/>
                            <img src='/exercise_image/0006.jpg' className="sliderimg" alt="" loading='lazy'/>
                            <img src='/exercise_image/0007.jpg' className="sliderimg" alt="" loading='lazy'/>
                            <img src='/exercise_image/0008.jpg' className="sliderimg" alt="" loading='lazy'/>
                            <img src='/exercise_image/0009.jpg' className="sliderimg" alt="" loading='lazy'/>
                            <img src='/exercise_image/0010.jpg' className="sliderimg" alt="" loading='lazy'/>
                            <img src='/exercise_image/0011.jpg' className="sliderimg" alt="" loading='lazy'/>
                            <img src='/exercise_image/0012.jpg' className="sliderimg" alt="" loading='lazy'/>
                        </AliceCarousel>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ExercisePage
