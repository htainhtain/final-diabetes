import React from 'react'
import {
    Route
  } from "react-router-dom";
import Headerbar from "./Header";
import Headerbarauth from "./Headerauth"


const ProtectedHeaderBar = ({ auth }) => {

    return (
      <Route
        // {...rest}
        render={() => (auth ? <Headerbarauth /> : <Headerbar />)}
      />
    );
};
export default ProtectedHeaderBar;
