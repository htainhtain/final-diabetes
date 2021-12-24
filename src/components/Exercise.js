import "././Main.css";
import ProtectedHeaderBar from "./ProtectedHeaderBar";
import { AuthApi, LanguageApi } from '../App.js';
import React, { useContext } from 'react';
import ExercisePage from "./ExercisePage";

function Exercise() {
  const Auth = useContext(AuthApi)
  const Lang = useContext(LanguageApi)

  // console.log("Lang in exercise: ", Lang)

  return (
    <div className='background'>
        <ProtectedHeaderBar
          auth={Auth.auth}
          lang={Lang.lang}
        >  
        </ProtectedHeaderBar>
      <ExercisePage />
    </div>
  );
}
export default Exercise;