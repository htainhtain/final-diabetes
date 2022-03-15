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
import About from "./components/About";
import Stress from "./components/Stress";
import MyExercise from "./components/MyExercise";
import Test from "./components/Test";
import { AuthProvider } from "./contexts/AuthContext";
import GlucoseConverter from "./components/GlucoseConverter";

export const AuthApi = React.createContext();
export const TokenApi = React.createContext();
export const LanguageApi = React.createContext();

function App() {
  let init_auth = false;
  let init_token = Cookies.get("token");
  if (init_token) {
    init_auth = true;
  }
  let init_lang = 'th';

  const [auth, setAuth] = useState(init_auth);
  const [token, setToken] = useState(init_token);
  const [lang, setLang] = useState(init_lang);

  const readCookie = () => {
    let token = Cookies.get("token");
    if (token) {
      setAuth(true);
      setToken(token);
    }
  };
  
  React.useEffect(() => {
    readCookie();
  }, []);

  return (
    <>
      <AuthApi.Provider value={{ auth, setAuth }}>
        <TokenApi.Provider value={{ token, setToken }}>
          <LanguageApi.Provider value={{ lang, setLang }}>
            <AuthProvider>
              <Router>
                <div>
                    <Routes />
                </div>
              </Router>
            </AuthProvider>
          </LanguageApi.Provider>
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
        <Route exact path="/test">
          <Test />
        </Route>
        <Route exact path="/diabetes2">
          <Diabetes2 />
        </Route>
        <Route exact path="/food">
          <Food />
        </Route>
        <Route exact path="/glucoseconverter">
          <GlucoseConverter />
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
            component={MyExercise}
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