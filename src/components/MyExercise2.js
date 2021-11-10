import React, { useState, useEffect } from 'react';
import Headerbarauth from './Headerauth';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import { TokenApi } from '../App.js';
import axios from 'axios';
import moment from 'moment';

function MyExercise2() {
    const [minute, setMinute] = useState()
    const [data, setData] = useState("");
    const [random, setRandom] = useState(Math.random());
    const [graphexerciselist, setgraphexerciselist] = useState([{}])
    const Token = React.useContext(TokenApi)

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

    const handleonclick = (e) => {
        e.preventDefault();
        axios.post(`http://localhost:8000/api/create_myexercise/${data.username}`, {
            'minute': minute,
            'date': date
          })
            .then(res => console.log(res))
    }

    useEffect(() => {
        async function fetchexercisegraphdata() {
            const result = await axios.get(`http://localhost:8000/api/get_myexercise/${data.username}`);
            setgraphexerciselist(result.data)
            console.log("graphexerciselist",graphexerciselist)
        }
        fetchexercisegraphdata();
    }, [random]);

    const showgraph = () => {
        setRandom(Math.random());
    }

    
    
    function getWeekDays(weekStart) {
        const days = [weekStart];
        for (let i = 1; i < 7; i += 1) {
          days.push(
              moment(weekStart)
              .add(i, 'days')
              .toDate()
          );
        }
        return days;
    }

    function getWeekRange(date) {
        return {
          from: moment(date)
            .startOf('day')
            .toDate(),
          to: moment(date)
            .endOf('day')
            .toDate(),
        };
    }
    
    console.log("getweekdays: ", getWeekDays(getWeekRange('2021-11-16')['from']))
    

    return (
        <>
            <div className="background">
                <Headerbarauth />
                <div className="container home-block">
                    <div className="home-card">
                        <div className="text-title">Let's Do Exercise</div>
                        <iframe src="https://giphy.com/embed/12bgKWqBoAMbbG" width="100%" height="272" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>
                        <br />
                        <br />
                        <div className="text-title">Put your minute for { date }.</div>
                        <form style= {{ display: 'flex', justifyContent: 'space-evenly'}} onClick={handleonclick} >
                            <TextField
                                required
                                onChange={(e) => setMinute(e.target.value)}
                                value={minute}
                                label="Exercise Minute"
                                id="outlined-start-adornment"
                                sx={{ m: 1, width: '25ch' }}
                                InputProps={{
                                    startAdornment: <InputAdornment position="start">min</InputAdornment>,
                                }}
                            />
                            <Button
                                variant="contained"
                                color="secondary"
                                type="submit"
                                style={{backgroundColor: '#DE5C8E', color: 'white'}}
                            >
                                Submit
                            </Button>
                        </form>
                    </div>
                    <div className="home-card">
                        <div className="text-title">Your Exercise Data</div>
                        <button className='button' value='Submit' type='submit' sytle={{ cursor: 'pointer' }} onClick={showgraph}>Show/Update Graph</button>
                    </div>
                </div>
            </div>  
        </>
    )
}

export default MyExercise2;
