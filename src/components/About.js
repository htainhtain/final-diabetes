import "././Main.css";
import Headerbar from "./Header";
import AboutPage from "./AboutPage";
import { AuthApi } from '../App.js';
import React, { useContext } from 'react';
import ProtectedHeaderBar from "./ProtectedHeaderBar";

function About() {
  const Auth = useContext(AuthApi)
  return (
    <div>
        <ProtectedHeaderBar
          auth={Auth.auth}
        >  
        </ProtectedHeaderBar>
        <AboutPage />
      </div>

  );
}

export default About;