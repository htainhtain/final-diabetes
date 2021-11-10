import "././Main.css";
import ProtectedHeaderBar from "./ProtectedHeaderBar";
import { AuthApi } from '../App.js';
import React, { useContext } from 'react';
import ExercisePage from "./ExercisePage";

function Exercise() {
  const Auth = useContext(AuthApi)
  return (
    <div className='background'>
        <ProtectedHeaderBar
          auth={Auth.auth}
        >  
        </ProtectedHeaderBar>
      <ExercisePage />
    </div>
  );
}
export default Exercise;