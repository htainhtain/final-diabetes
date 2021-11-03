import ProtectedHeaderBar from "./ProtectedHeaderBar";
import { AuthApi } from '../App.js';
import React, { useContext } from 'react';
import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/alice-carousel.css";
import './heroku.css'
import StressPage from "./StressPage";

function Stress() {
    const Auth = useContext(AuthApi)
    return (
        <div>
            <ProtectedHeaderBar
            auth={Auth.auth}
            >  
            </ProtectedHeaderBar>
            <StressPage />
        </div>
    )
}

export default Stress
