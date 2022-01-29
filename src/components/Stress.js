import ProtectedHeaderBar from "./ProtectedHeaderBar";
import { AuthApi } from '../App.js';
import React, { useContext } from 'react';
import "react-alice-carousel/lib/alice-carousel.css";
import './heroku.css'
import StressPage from "./StressPage";
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';

function Stress() {
    const Auth = useContext(AuthApi)
    const { t } = useTranslation();

    return (
        <div>
            <Helmet>
                <title>{t('ProjectTitle.1')} {t('StressManagement.1')}</title>
            </Helmet>
            <ProtectedHeaderBar
            auth={Auth.auth}
            >  
            </ProtectedHeaderBar>
            <StressPage />
        </div>
    )
}

export default Stress
