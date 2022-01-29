import "././Main.css";
import ProtectedHeaderBar from "./ProtectedHeaderBar";
import { AuthApi } from '../App.js';
import React, { useContext } from 'react';
import Diabetes2page from "./diabetes2page";
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';


function Diabetes2() {
  const Auth = useContext(AuthApi)
  const { t } = useTranslation();
  return (
    <div>
        <Helmet>
          <title>{t('ProjectTitle.1')} {t('T2D.1')}</title>
        </Helmet>
        <ProtectedHeaderBar
          auth={Auth.auth}
        >  
        </ProtectedHeaderBar>
        <Diabetes2page />
      </div>
  );
}
export default Diabetes2;