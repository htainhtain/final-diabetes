import React, { useState, useEffect, useRef } from 'react'
import { app } from './base'
import Headerbarauth from './Headerauth';
import "./Main.css";
import NativeSelect from "@material-ui/core/NativeSelect";
import { Button } from "@material-ui/core";
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import { TokenApi } from '../App.js';
import axios from 'axios';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Alert from '@mui/material/Alert';

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

    // for username & auth 
    const [userdata, setUserData] = useState("");
    const Token = React.useContext(TokenApi)

    let toke = Token.token;
    const headers = {
        Authorization: `Bearer ${toke}`,
    };
    // https://fastapi-app-diabetes.herokuapp.com/login
    const getdata = async () => {
        let res = await axios
        // .get("http://127.0.0.1:8000/", { headers })
        .get("http://127.0.0.1:8000/", { headers })
            .then((response) => {
            return response.data;
        });
        return res;
    };

    useEffect(async () => {
        let x = await getdata();
        setUserData(x);
        console.log('x: ', x);
    }, []);
    // for username & auth 

    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

    const onSubmit = async (e) => {
        e.preventDefault();
        const username = e.target.username.value;
        console.log("username1", userdata.username)
        if (!username || !fileUrl) {
          return;
        }
        await db.collection(userdata.username).doc(username).set({
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
            let x = await getdata();
            const usersCollection = await db.collection(x.username).get();
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
                    <div className="text-title">Upload Food</div>
                        <form onSubmit={onSubmit} style= {{ display: 'flex', flexDirection: 'column'}}>
                            <FormControl required sx={{ m: 1, minWidth: 120, paddingBottom: 1 }}>
                                <InputLabel id="demo-simple-select-helper-label">Meal Type</InputLabel>
                            <Select
                                required
                                labelId="demo-simple-select-helper-label"
                                id="demo-simple-select-helper"
                                value={mealType}
                                label="Meal Type"
                                onChange={(e) => setMealType(e.target.value)}
                                >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={'Breakfast'}>Breakfast</MenuItem>
                                <MenuItem value={'Lunch'}>Lunch</MenuItem>
                                <MenuItem value={'Dinner'}>Dinner</MenuItem>
                                <MenuItem value={'Other'}>Other</MenuItem>
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
                                        Choose Picture
                                    </Button>
                                </label>
                                <input type="text" name="username" placeholder="NAME" required/>
                            </div>
                            <br />
                            <Button
                                className='button'
                                variant="contained"
                                color="secondary"
                                type="submit"
                                style={{backgroundColor: '#DE5C8E', color: 'white'}}
                            >
                                    Submit
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
                                        
                    <div className="text-title">Your Daily Diet Album</div>
                    <Button
                        className='button'
                        value='Submit'
                        type='submit'
                        sytle={{ cursor: 'pointer' }}
                        variant="contained"
                        onClick={reRender}
                        style={{backgroundColor: '#DE5C8E', color: 'white'}}
                    >
                        Show/Update Album
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
