import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { TextField } from "@material-ui/core";
import LockIcon from "@material-ui/icons/Lock";
import { useHistory } from "react-router-dom";
import Headerbar from "./Header";
import Alert from '@mui/material/Alert';
// const AuthApi = React.createContext();
//const TokenApi = React.createContext();

const Login = () => {
    const history = useHistory();
    // const Auth = React.useContext(AuthApi);
    const [username, setName] = useState("");
    const [password, setPassword] = useState("");
    const [errorAlert, setErrorArlert] = useState(false)
    const [errorContent, setErrorContent] = useState('');

    const handleMenuClick = (pageURL) => {
      history.push(pageURL)
    };

    const handleSubmit = async (evt) => {
      if (evt) {
        evt.preventDefault();
      }
      
      const data = new FormData();
      data.append('username', username);
      data.append('password', password);
      // https://fastapi-app-diabetes.herokuapp.com
      const news = async () => {
        // let res = await axios.post("http://127.0.0.1:8000/login", data)
        // https://diabetes-backend-wices.herokuapp.com/
        let res = await axios.post("https://diabetes-backend-wices.herokuapp.com/login", data)
          .then((response) => {
            Cookies.set("token", response.data.access_token);
            return response;
          })
          .catch((error) => {
            console.log("error", error.response.data['detail'])
            setErrorContent(error.response.data['detail'])
            setErrorArlert(true);
        });
        return res;
      };


      let x = await news();
      if (x) {
        window.location.reload();
      }
    };
  
    return (
      <div className='background'>
        <Headerbar />
        <div className='container home-block'>
          <div className='home-card'>
        <form onSubmit={handleSubmit}>
          <div className="text-title">Diabetes Reversal Project</div>
              <br />
              <div className='textfield'>
              <div  style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'flex-end',
                          }}>
                <AccountCircle  />               
                <TextField
                                Label='Username'
                                className='textfield'
                                style={{
                                    marginLeft: '8px',
                                }}
                                value={username}
                                onChange={(e) => setName(e.target.value)}
                            />

              </div>
              </div>
          {/* <br />
              <br /> */}
              <div className='textfield'>
              <div  style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'flex-end',
                          }}>
               <LockIcon />            
                <TextField
                    Label='Password'
                    type='password'
                  className='textfield'
                  style={{
                      marginLeft: '8px',
                  }}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

              </div>
              </div>
          <div style={{ textAlign: "center" }}>
                <input className='button-secondary' type="submit" value="Login" />
              {errorAlert ?
              (
                <>
                  <Alert severity='error' style={{paddingTop: 10}}>{errorContent}</Alert>
                </>
              )
              : <></>}
          </div>
            </form>
          </div>
          <div className='home-card'>
            <div style={{ textAlign: "center" }}>
              <p>Don't Have an account yet?</p>
              <input className='button-secondary' type="submit" value="Register" onClick={() => handleMenuClick('/register')}   />
            </div>
          </div>
          </div>
      </div>
    );
};
  
export default Login;