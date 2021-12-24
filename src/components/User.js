import React, { useState, useEffect } from 'react';
import Headerbarauth from './Headerauth';
import axios from 'axios';
import { TokenApi } from '../App.js';
import "./user.css";
import { useTranslation } from 'react-i18next';

function User() {
    const [data, setData] = useState("");
    const Token = React.useContext(TokenApi)
    const { t } = useTranslation();
    
    let toke = Token.token;
    const headers = {
        Authorization: `Bearer ${toke}`,
    };
    // https://fastapi-app-diabetes.herokuapp.com/login
    const getdata = async () => {
        let res = await axios
        .get("https://diabetes-backend-wices.herokuapp.com/", { headers })
            .then((response) => {
            return response.data;
        });
        return res;
    };

    useEffect(async () => {
        let x = await getdata();
        setData(x);
        console.log('x: ', x);
    }, []);

    return (
        
        <div className="background">
            <Headerbarauth />
            <div className="container home-block">
                <div className="home-card">
            <div className="box">
                <div className="box-body">
                        <p className="item">{t('Username.1')} </p>
                        <p className="itemdata">{data.username} </p>
                </div>
                <div className="box-body">
                        <p className="item">{t('Name.1')}</p>
                        <p className="itemdata">{data.real_name} </p>
                </div>
                <div className="box-body">
                        <p className="item">{t('Surname.1')} </p>
                        <p className="itemdata">{data.surname} </p>
                </div>
                <div className="box-body">
                        <p className="item">{t('Birthdate.1')}</p>   
                        <p className="itemdata">{data.dob} </p>
                </div>
                <div className="box-body">
                        <p className="item">{t('Gender.1')} </p>
                        <p className="itemdata">{data.gender} </p>
                </div>
                <div className="box-body">
                        <p className="item">{t('Height.1')} </p> 
                        <p className="itemdata">{data.height} cm </p>
                </div>
                <div className="box-body">
                        <p className="item">{t('Weight.1')} </p>
                        <p className="itemdata">{data.weight} kg </p>
                </div>
                <div className="box-body">
                        <p className="item">{t('Email.1')}</p>
                        <p className="itemdata">{data.email} </p>
                </div>
                        </div>      
                </div>    
            </div>
        </div>
    )
}

export default User
