import "././Main.css";
import ProtectedHeaderBar from "./ProtectedHeaderBar";
import { AuthApi, LanguageApi } from '../App.js';
import React, { useContext } from 'react';
import ExercisePage from "./ExercisePage";
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';

function Exercise() {
  const Auth = useContext(AuthApi)
  const Lang = useContext(LanguageApi)
  const { t } = useTranslation();

  // console.log("Lang in exercise: ", Lang)

  return (
    <>
        <Helmet>
          <title>{t('ProjectTitle.1')} {t('Exercise.1')}</title>
        </Helmet>
      <div className='background'>
          <ProtectedHeaderBar
            auth={Auth.auth}
            lang={Lang.lang}
          >  
          </ProtectedHeaderBar>
        <ExercisePage />
      </div>
    </>
  );
}
export default Exercise;