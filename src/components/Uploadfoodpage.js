import React, { useState, useEffect } from 'react'
import { app } from './base'
import Headerbarauth from './Headerauth';
import "./Main.css";
import { Button } from "@material-ui/core";
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import Alert from '@mui/material/Alert';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../contexts/AuthContext';

const db = app.firestore();

function Uploadfoodpage() {
    const [mealType, setMealType] = useState()
    const [fileUrl, setFileUrl] = React.useState(null);
    const [users, setUsers] = React.useState([]);
    const [random, setRandom] = useState(Math.random());
    const [successAlert, setSuccessAlert] = useState(false)
    const [alertContent, setAlertContent] = useState('');
    const [errorAlert, setErrorArlert] = useState(false)
    const [errorContent, setErrorContent] = useState('');
    const { t } = useTranslation();
    const { currentUser} = useAuth()

    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

    const onSubmit = async (e) => {
        e.preventDefault();
        const username = e.target.username.value;
        if (!username || !fileUrl) {
          return;
        }
        await db.collection(currentUser).doc(username).set({
          name: username,
          avatar: fileUrl,
          mealType: mealType,
          date: date
        })
        .then(() => {
            setAlertContent("Successfully Uploaded");
            setSuccessAlert(true);
            setErrorArlert(false);
        })
        .catch(() => {
            setErrorContent("Uploaded Fail")
            setSuccessAlert(false);
            setErrorArlert(true);
        });
    };

    const onFileChange = async (e) => {
        const file = e.target.files[0];
        const storageRef = app.storage().ref();
        const fileRef = storageRef.child(file.name);
        await fileRef.put(file);
        setFileUrl(await fileRef.getDownloadURL());
    };

    const reRender = () => setRandom(Math.random());

    useEffect(() => {
        async function fetchUsers() {
            const usersCollection = await db.collection(currentUser).get();
            setUsers(
                usersCollection.docs.map((doc) => {
                    return doc.data();
                })
            );
        }
        fetchUsers();
    }, [random]);

    return (
        <div className="background">
            <Headerbarauth />
            <div className="container home-block">
                <div className="home-card">
                    <div className="text-title">{t('UploadFood.1')}</div>
                        <form onSubmit={onSubmit} style= {{ display: 'flex', flexDirection: 'column'}}>
                            <FormControl required sx={{ m: 1, minWidth: 120, paddingBottom: 1 }}>
                                <InputLabel id="demo-simple-select-helper-label">{t('MealType.1')}</InputLabel>
                                <Select
                                    required
                                    labelId="demo-simple-select-helper-label"
                                    id="demo-simple-select-helper"
                                    value={mealType}
                                    label="Meal Type"
                                    onChange={(e) => setMealType(e.target.value)}
                                    >
                                    <MenuItem value="">
                                        <em>{t('None.1')}</em>
                                    </MenuItem>
                                    <MenuItem value={'Breakfast'}>{t('Breakfast.1')}</MenuItem>
                                    <MenuItem value={'Lunch'}>{t('Lunch.1')}</MenuItem>
                                    <MenuItem value={'Dinner'}>{t('Dinner.1')}</MenuItem>
                                    <MenuItem value={'Other'}>{t('Other.1')}</MenuItem>
                                </Select>
                            </FormControl>
                            <div style= {{ display: 'flex', justifyContent: 'space-evenly'}}>
                                <input
                                    type="file"
                                    hidden
                                    id="contained-button-file"
                                    onChange={onFileChange}
                                />
                                <label htmlFor="contained-button-file">
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        component="span"
                                        style={{backgroundColor: '#DE5C8E', color: 'white'}}
                                    >
                                        {t('ChoosePicture.1')}
                                    </Button>
                                </label>
                                <input type="text" name="username" placeholder={t('Name.1')} required/>
                            </div>
                            <br />
                            <Button
                                className='button'
                                variant="contained"
                                color="secondary"
                                type="submit"
                                style={{backgroundColor: '#DE5C8E', color: 'white'}}
                            >
                                    {t('Submit.1')}
                            </Button>
                        {successAlert ?
                            (
                                <>
                                <Alert severity='success'  style={{paddingTop: 15}}>{alertContent}</Alert>
                                </>
                            )
                            : <></>}
                            {errorAlert ?
                            (
                                <>
                                <Alert severity='error' style={{paddingTop: 15}}>{errorContent}</Alert>
                                </>
                            )
                            : <></>}
                        </form>
                </div>
                <div className="home-card">
                                        
                    <div className="text-title">{t('Album.1')}</div>
                    <Button
                        className='button'
                        value='Submit'
                        type='submit'
                        sytle={{ cursor: 'pointer' }}
                        variant="contained"
                        onClick={reRender}
                        style={{backgroundColor: '#DE5C8E', color: 'white'}}
                    >
                        {t('ShowUpdateAlbum.1')}
                    </Button>

                    <ImageList sx={{ maxwidth: 500, height: 450 }}>
                        {users.map((item) => (
                            <ImageListItem key={item.name}>
                            <img
                                src={`${item.avatar}?w=248&fit=crop&auto=format`}
                                srcSet={`${item.avatar}?w=248&fit=crop&auto=format&dpr=2 2x`}
                                alt={item.name}
                                loading="lazy"
                            />
                            <ImageListItemBar
                                title={item.mealType}
                                subtitle={item.date}
                            />
                            </ImageListItem>
                        ))}
                    </ImageList>
                </div>
            </div>
        </div>
    )
}

export default Uploadfoodpage
