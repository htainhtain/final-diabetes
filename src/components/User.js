import React from 'react';
import Headerbarauth from './Headerauth';
import "./user.css";
import { useTranslation } from 'react-i18next';
import { useAuth } from '../contexts/AuthContext';

function User() {
    const { t } = useTranslation();
    const { data } = useAuth()

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
