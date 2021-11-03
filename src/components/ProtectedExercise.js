import React from 'react'
import {
    Redirect,
    Route,
  } from "react-router-dom";
import Login from './Login';
import MyExercise from './MyExercise';

const ProtectedMyExercise = ({ auth }) => {
    return (
      <Route
        // {...rest}
        render={() => (auth ? <MyExercise /> : <Login />)}
      />
    );
};
export default ProtectedMyExercise;