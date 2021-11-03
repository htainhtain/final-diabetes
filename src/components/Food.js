import "././Main.css";
// import FoodPage from "./food_slide/FoodPage";
import ProtectedHeaderBar from "./ProtectedHeaderBar";
import { AuthApi } from '../App.js';
import React, { useContext } from 'react';
import FoodPage2 from "./FoodPage2";

function Food() {
  const Auth = useContext(AuthApi)
  return (
    <div>
        <ProtectedHeaderBar
          auth={Auth.auth}
        >  
        </ProtectedHeaderBar>
        <FoodPage2 />
      </div>

  );
}

export default Food;