import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Home from './components/Home'
import Cookies from "js-cookie";
import ProtectedLogin from "./components/ProtectedLogin";
import ProtectedRoute from "./components/ProtectedRoute";
import Register from "./components/Register";
import Login from "./components/Login";
import Diabetes2 from "./components/diabetes2";
import Food from "./components/Food";
import Exercise from "./components/Exercise";
import User from "./components/User";
import BloodSugar  from "./components/BloodSugar";
import Uploadfood from "./components/Uploadfood";
import MyExercise from "./components/MyExercise";
import About from "./components/About";
import Stress from "./components/Stress";
import MyExercise2 from "./components/MyExercise2";

export const AuthApi = React.createContext();
export const TokenApi = React.createContext();

function App() {
  let init_auth = false;
  let init_token = Cookies.get("token");
  if (init_token) {
    init_auth = true;
  }

  const [auth, setAuth] = useState(init_auth);
  const [token, setToken] = useState(init_token);

  const readCookie = () => {
    let token = Cookies.get("token");
    if (token) {
      setAuth(true);
      setToken(token);
    }
  };
  
  React.useEffect(() => {
    readCookie();
    console.log("App - readcookie")
  }, []);
  console.log("App - program")

  return (
    <>
      <AuthApi.Provider value={{ auth, setAuth }}>
        <TokenApi.Provider value={{ token, setToken }}>
          <Router>
            <div>
              <Routes />
            </div>
          </Router>
        </TokenApi.Provider>
      </AuthApi.Provider>
    </>
  );
}

const Routes = () => {
  const Auth = React.useContext(AuthApi);
  return (
    <div>
    <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/diabetes2">
          <Diabetes2 />
        </Route>
        <Route exact path="/food">
          <Food />
        </Route>
        <Route exact path="/register">
          <Register />
        </Route>
        <Route exact path="/exercise">
          <Exercise />
        </Route>
        <Route exact path="/stress">
          <Stress />
        </Route>
        <Route exact path="/about">
          <About />
        </Route>
        <ProtectedRoute
          exact path="/user"
          auth={Auth.auth}
          component={User}
        ></ProtectedRoute>
        <ProtectedRoute
          exact path="/bloodsugar"
          auth={Auth.auth}
          component={BloodSugar}
          ></ProtectedRoute>
        <ProtectedRoute
            exact path="/Uploadfood"
            auth={Auth.auth}
            component={Uploadfood}
        >
        </ProtectedRoute> 
        <ProtectedRoute
            exact path="/myexercise"
            auth={Auth.auth}
            component={MyExercise2}
        >
        </ProtectedRoute>
        <ProtectedRoute
            exact path="/myexercise2"
            auth={Auth.auth}
            component={MyExercise2}
        >
        </ProtectedRoute>
        <ProtectedLogin
          exact path="/login"    
          auth={Auth.auth}  
          component={Login}
        ></ProtectedLogin>

    </Switch>
  </div>
  );
};

export default App;