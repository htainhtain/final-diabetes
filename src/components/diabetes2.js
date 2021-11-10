import "././Main.css";
import ProtectedHeaderBar from "./ProtectedHeaderBar";
import { AuthApi } from '../App.js';
import React, { useContext } from 'react';
import Diabetes2page from "./diabetes2page";

function Diabetes2() {
  const Auth = useContext(AuthApi)
  return (
    <div>
        <ProtectedHeaderBar
          auth={Auth.auth}
        >  
        </ProtectedHeaderBar>
        <Diabetes2page />
      </div>
  );
}
export default Diabetes2;