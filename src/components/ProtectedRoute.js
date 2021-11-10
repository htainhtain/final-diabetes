import React from 'react'
import {
    Redirect,
    Route,
} from "react-router-dom";

const ProtectedRoute = ({ auth, component: Component, ...rest }) => {
  console.log("Here in Protected route")
  console.log("component", Component)
    return (
      <Route
        {...rest}
        render={() => (auth ? <Component /> : <Redirect to="/login" />)}
      />
    );
};
  
export default ProtectedRoute;