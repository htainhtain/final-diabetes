import "././Main.css";
// import FoodPage from "./food_slide/FoodPage";
import ProtectedHeaderBar from "./ProtectedHeaderBar";
import { AuthApi } from '../App.js';
import React, { useContext } from 'react';
import FoodPage2 from "./FoodPage2";
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';

function Food() {
  const Auth = useContext(AuthApi)
  const { t } = useTranslation();
  return (
    <div>
        <Helmet>
          <title>{t('ProjectTitle.1')} {t('Food.1')}</title>
        </Helmet>
        <ProtectedHeaderBar
          auth={Auth.auth}
        >  
        </ProtectedHeaderBar>
        <FoodPage2 />
      </div>

  );
}

export default Food;