import React, { useContext, useState, useEffect } from 'react'
import axios from 'axios'
import { TokenApi } from '../App.js';

const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState()
    const [data, setData] = useState()
    const Token = React.useContext(TokenApi)
    let toke = Token.token;

    const headers = {
        Authorization: `Bearer ${toke}`,
    };

    const getdata = async () => {
        let res = await axios
        .get("https://diabetes-wices-backend.herokuapp.com/", { headers })
            .then((response) => {
            return response.data;
        });
        return res;
    };

    useEffect(async () => {
        let x = await getdata();
        setData(x);
        setCurrentUser(x.username)
    }, []);

    //url declartaion
    const backendUrl = 'https://diabetes-wices-backend.herokuapp.com/api/'
    // const backendUrl = 'http://127.0.0.1:8000/api/'

    // value to be used 
    const value = {
        currentUser,
        backendUrl,
        data
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

