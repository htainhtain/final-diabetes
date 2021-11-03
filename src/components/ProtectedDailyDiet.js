import React from 'react'
import {
    Redirect,
    Route,
  } from "react-router-dom";
import Login from './Login';
import Uploadfood from './Uploadfood';

const ProtectedDailyDiet = ({ auth }) => {
    return (
      <Route
        // {...rest}
        render={() => (auth ? <Uploadfood /> : <Login />)}
      />
    );
};
export default ProtectedDailyDiet;
