import React, { useState, useEffect } from 'react';
import Headerbarauth from './Headerauth';
import { Line } from 'react-chartjs-2';
import NativeSelect from "@material-ui/core/NativeSelect";
import { TextField } from '@material-ui/core';
import { InputAdornment } from '@material-ui/core';
import { TokenApi } from '../App.js';
import axios from 'axios';
import "./Main.css";
import { Button } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import Alert from '@mui/material/Alert';

function BloodSugar() {
    const [mealType, setMealType] = useState()
    const [time, setTime] = useState()
    const [bloodsugar, setBloodSugar] = useState()
    const [data, setData] = useState("");
    const [bloodsugardata, setbloodsugardata] = useState([]);
    const [random, setRandom] = useState(Math.random());
    const Token = React.useContext(TokenApi)
    const [successAlert, setSuccessAlert] = useState(false)
    const [alertContent, setAlertContent] = useState('');
    const [errorAlert, setErrorArlert] = useState(false)
    const [errorContent, setErrorContent] = useState('');

    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

    let toke = Token.token;
    const headers = {
        Authorization: `Bearer ${toke}`,
    };

    const getdata = async () => {
        let res = await axios
        .get("http://127.0.0.1:8000/", { headers })
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

    const handleSubmit = (evt) => {
        evt.preventDefault();

        const bloodsugar_data = {
            "username": data.username,
            "mealtype": mealType,
            "time": time,
            "date": date,
            "bloodsugar": bloodsugar
        };
        axios.post(`http://127.0.0.1:8000/api/create_bloodsugar/${data.username}`, bloodsugar_data)
        .then((response) => {
          console.log(response);
          setAlertContent("Blood Sugar has been put.");
          setSuccessAlert(true);
          setErrorArlert(false);
        })
        .catch((error) => {
            setErrorContent("Blood Sugar put failed")
            setSuccessAlert(false);
            setErrorArlert(true);
        });
    };

    const reRender = () => setRandom(Math.random());

    useEffect(() => {
        async function fetchblooddata() {
            const result = await axios.get(`http://localhost:8000/api/get_bloodsugar/${data.username}`);
            setbloodsugardata(result.data)
            console.log(bloodsugardata)
        }
        fetchblooddata();
    }, [random]);

    let beforebreakfast_blooddata = bloodsugardata.map((item) => { if (item.mealtype == 'Before breakfast') { return item.bloodsugar } })
    let beforebreakfast_mealtype = bloodsugardata.map((item) => { if (item.mealtype == 'Before breakfast') { return `${item.date}` }})

    let afterbreakfast_blooddata = bloodsugardata.map((item) => { if (item.mealtype == 'After breakfast') { return item.bloodsugar }})
    let afterbreakfast_mealtype = bloodsugardata.map((item) => { if (item.mealtype == 'After breakfast') { return `${item.date}` }})

    let beforelunch_blooddata = bloodsugardata.map((item) => { if (item.mealtype == 'Before lunch') { return item.bloodsugar }})
    let beforelunch_mealtype = bloodsugardata.map((item) => { if (item.mealtype == 'Before lunch') { return `${item.date}` }})

    let afterlunch_blooddata = bloodsugardata.map((item) => { if (item.mealtype == 'After lunch') { return item.bloodsugar }})
    let afterlunch_mealtype = bloodsugardata.map((item) => { if (item.mealtype == 'After lunch') { return `${item.date}` }})

    let beforedinner_blooddata = bloodsugardata.map((item) => { if (item.mealtype == 'Before dinner') { return item.bloodsugar }})
    let beforedinner_mealtype = bloodsugardata.map((item) => { if (item.mealtype == 'Before dinner') { return `${item.date}` }})

    let afterdinner_blooddata = bloodsugardata.map((item) => { if (item.mealtype == 'After dinner') { return item.bloodsugar }})
    let afterdinner_mealtype = bloodsugardata.map((item) => { if (item.mealtype == 'After dinner') { return `${item.date}` }})

    let beforebed_blooddata = bloodsugardata.map((item) => { if (item.mealtype == 'Before bedtime') { return item.bloodsugar }})
    let beforebed_mealtype = bloodsugardata.map((item) => { if (item.mealtype == 'Before bedtime') { return `${item.date}` }})


    return (
        <div className="background">
            <Headerbarauth />
            <div className="container home-block">
                <div className="home-card">
                    <div className="text-title">Blood Sugar Input</div>
                    <br />
                    <form onSubmit={handleSubmit} style= {{ display: 'flex', flexDirection: 'column'}}>
                        {/* <NativeSelect label="Meal Type" className="textfield" value={mealType} onChange={(e) => setMealType(e.target.value)}>
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                            <optgroup label="Breakfast">
                                <option>NA</option>
                                <option>Before breakfast</option>
                                <option>After breakfast</option> 
                            </optgroup>
                            <optgroup label="Lunch"> 
                                <option>Before lunch</option>
                                <option>After lunch</option> 
                            </optgroup>
                            <optgroup label="Dinner"> 
                                <option>Before dinner</option>
                                <option>After dinner</option> 
                            </optgroup>
                            <optgroup label="Other"> 
                                <option>Before bedtime</option>
                            </optgroup>  
                        </NativeSelect> */}
                        <FormControl required sx={{ m: 1, minWidth: 120, paddingBottom: 1 }}>
                            <InputLabel htmlFor="grouped-native-select">Meal Type</InputLabel>
                            <Select
                                native
                                defaultValue=""
                                id="grouped-native-select"
                                label="Meal Type"
                                value={mealType}
                                onChange={(e) => setMealType(e.target.value)}
                            >
                            <option aria-label="None" value="" />
                            <optgroup label="Breakfast">
                                <option value={'Before breakfast'}>Before breakfast</option>
                                <option value={'After breakfast'}>After breakfast</option>
                            </optgroup>
                            <optgroup label="Lunch">
                                <option value={'Before lunch'}>Before lunch</option>
                                <option value={'After lunch'}>After lunch</option>
                            </optgroup>
                            <optgroup label="Dinner">
                                <option value={'Before dinner'}>Before dinner</option>
                                <option value={'After dinner'}>After dinner</option>
                            </optgroup>
                            <optgroup label="Other">
                                <option value={'Before bedtime'}>Before bedtime</option>
                            </optgroup>
                            </Select>
                        </FormControl>
                        <div >
                            <TextField
                                required
                                label="Select time" //measuring time
                                id="time" 
                                type="time"
                                className="textfield"
                                InputLabelProps={{ shrink: true }}
                                onChange={event => setTime(event.target.value)}
                                style={{paddingBottom: 5}}
                            />
                        </div>
                        <div>
                            <TextField
                                required
                                label="Enter Your Blood Sugar Level" //sugar level
                                type="number" 
                                InputProps={{
                                    endAdornment: (
                                    <InputAdornment position="end">mg/dL</InputAdornment>
                                    ),
                                }}
                                className="textfield"
                                value={bloodsugar} onChange={(e) => setBloodSugar(e.target.value)}

                            />
                        </div>
                        <br />
                        <Button
                            className='button'
                            value='Submit'
                            type='submit'
                            sytle={{ cursor: 'pointer' }}
                            variant="contained"
                            // color="secondary"
                            style={{backgroundColor: '#DE5C8E'}}
                        >
                            Submit
                        </Button>
                        {successAlert ?
                            (
                                <>
                                <Alert severity='success' style={{paddingTop: 20}}>{alertContent}</Alert>
                                </>
                            )
                        : <></>}
                        {errorAlert ?
                        (
                            <>
                            <Alert severity='error' style={{paddingTop: 20}}>{errorContent}</Alert>
                            </>
                        )
                        : <></>}
                    </form>
                </div>
                <div className="home-card">
                    <div className="text-title">Your Bloodsugar Record</div>
                    <Button
                        className='button'
                        value='Submit'
                        type='submit'
                        sytle={{ cursor: 'pointer' }}
                        onClick={reRender}
                        variant="contained"
                        // color="primary"
                        style={{backgroundColor: '#DE5C8E'}}
                    >
                        Show/Update Chart
                    </Button>
                    <br />
                    <br />
                    <Line
                        data={{
                            labels: beforebreakfast_mealtype.filter(function( element ) {
                                return element !== undefined;}).slice(-10),
                            datasets: [
                                {
                                    label: 'Blood Sugar Level - Before breakfast',
                                    backgroundColor: 'rgba(75,192,192,1)',
                                    borderColor: 'rgb(75, 192, 192)',
                                    tension: 0.1,
                                    data: beforebreakfast_blooddata.filter(function( element ) {
                                        return element !== undefined;}).slice(-10)
                                }
                            ],
                        }}
                    />
                    <br></br>
                    <Line
                        data={{
                            labels: afterbreakfast_mealtype.filter(function( element ) {
                                return element !== undefined;}).slice(-10),
                            datasets: [
                                {
                                    label: 'Blood Sugar Level - After breakfast',
                                    backgroundColor: 'rgba(75,0,0,1)',
                                    borderColor: 'rgb(75, 0, 0)',
                                    tension: 0.1,
                                    data: afterbreakfast_blooddata.filter(function( element ) {
                                        return element !== undefined;}).slice(-10)
                                }
                            ],
                        }}
                    />
                    <br></br>
                    <Line
                        data={{
                            labels: beforelunch_mealtype.filter(function( element ) {
                                return element !== undefined;}).slice(-10),
                            datasets: [
                                {
                                    label: 'Blood Sugar Level - Before lunch',
                                    backgroundColor: 'rgba(88,100,146,1)',
                                    borderColor: 'rgb(88,100,146)',
                                    tension: 0.1,
                                    data: beforelunch_blooddata.filter(function( element ) {
                                        return element !== undefined;}).slice(-10)
                                }
                            ],
                        }}
                    />
                    <br></br>
                    <Line
                        data={{
                            labels: afterlunch_mealtype.filter(function( element ) {
                                return element !== undefined;}).slice(-10),
                            datasets: [
                                {
                                    label: 'Blood Sugar Level - After lunch',
                                    backgroundColor: 'rgba(248,66,82,1)',
                                    borderColor: 'rgb(248,66,82)',
                                    tension: 0.1,
                                    data: afterlunch_blooddata.filter(function( element ) {
                                        return element !== undefined;}).slice(-10)
                                }
                            ],
                        }}
                    />
                    <br></br>
                    <Line
                        data={{
                            labels: beforedinner_mealtype.filter(function( element ) {
                                return element !== undefined;}).slice(-10),
                            datasets: [
                                {
                                    label: 'Blood Sugar Level - Before Dinner',
                                    backgroundColor: 'rgba(112,12,84,1)',
                                    borderColor: 'rgb(112,12,84)',
                                    tension: 0.1,
                                    data: beforedinner_blooddata.filter(function( element ) {
                                        return element !== undefined;}).slice(-10)
                                }
                            ],
                        }}
                    />
                    <br></br>
                    <Line
                        data={{
                            labels: beforedinner_mealtype.filter(function( element ) {
                                return element !== undefined;}).slice(-10),
                            datasets: [
                                {
                                    label: 'Blood Sugar Level - Before Dinner',
                                    backgroundColor: 'rgba(112,12,84,1)',
                                    borderColor: 'rgb(112,12,84)',
                                    tension: 0.1,
                                    data: beforedinner_blooddata.filter(function( element ) {
                                        return element !== undefined;}).slice(-10)
                                }
                            ],
                        }}
                    />
                    <br></br>
                    <Line
                        data={{
                            labels: afterdinner_mealtype.filter(function( element ) {
                                return element !== undefined;}).slice(-10),
                            datasets: [
                                {
                                    label: 'Blood Sugar Level - After Dinner',
                                    backgroundColor: 'rgba(118,171,187,1)',
                                    borderColor: 'rgb(118,171,187)',
                                    tension: 0.1,
                                    data: afterdinner_blooddata.filter(function( element ) {
                                        return element !== undefined;}).slice(-10)
                                }
                            ],
                        }}
                    />
                    <br></br>
                    <Line
                        data={{
                            labels: beforebed_mealtype.filter(function( element ) {
                                return element !== undefined;}).slice(-10),
                            datasets: [
                                {
                                    label: 'Blood Sugar Level - Before Bed',
                                    backgroundColor: 'rgba(229,239,73,1)',
                                    borderColor: 'rgb(229,239,73)',
                                    tension: 0.1,
                                    data: beforebed_blooddata.filter(function( element ) {
                                        return element !== undefined;}).slice(-10)
                                }
                            ],
                        }}
                    />
                </div>
            </div>
        </div>
    )
}

export default BloodSugar
