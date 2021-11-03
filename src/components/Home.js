import "././Main.css";
import FrontPage from './frontpage';
import ProtectedHeaderBar from "./ProtectedHeaderBar";
import { AuthApi } from '../App.js';
import React, { useContext } from 'react';


function Home() {
  const Auth = useContext(AuthApi)
  return (
    <div>
        <ProtectedHeaderBar
          auth={Auth.auth}
        >  
        </ProtectedHeaderBar>
        {/* <Headerbar /> */}
        <FrontPage />
      </div>
  );
}

export default Home;