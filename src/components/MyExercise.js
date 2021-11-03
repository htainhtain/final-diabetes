import Headerbarauth from './Headerauth';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TokenApi } from '../App.js';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import { Bar } from 'react-chartjs-2';
// import "./Main.css";

function MyExercise() {
    const [exerciseList, setExerciseList] = useState([{}])
    const [data, setData] = useState("");
    const [random, setRandom] = useState(Math.random());
    const [random2, setRandom2] = useState(Math.random());
    const [graphexerciselist, setgraphexerciselist] = useState([{}])
    const Token = React.useContext(TokenApi)
    let done_data_inside = []
    let exercise_data_inside = []
    let today_date = "2021-10-21";

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

    const reRender = () => setRandom(Math.random());

    useEffect(() => {
        async function fetchexercisedata() {
            const result = await axios.get(`http://localhost:8000/api/get_myexercise/${data.username}`);
            setExerciseList(result.data)
            console.log("come here")
        }
        fetchexercisedata();
    }, [random]);

    let exercise_data = exerciseList.map((item) => { if (item.date == '2021-10-21') { return item.exercise } })
    let done_data = exerciseList.map((item) => { if (item.date == '2021-10-21') { return item.done } })
    const [checked, setChecked] = React.useState([]);


    const handleToggle = (value) => () => {
      const currentIndex = checked.indexOf(value);
      const newChecked = [...checked];
        
      if (currentIndex === -1) {
        newChecked.push(value);
      } else {
        newChecked.splice(currentIndex, 1);
      }
        console.log("currentIndex", currentIndex)
        console.log("newChecked", newChecked)
        exercise_data_inside = exercise_data.filter(function( element ) {return element !== undefined;})
        done_data_inside = [false,false,false]
        for (let i = 0; i < exercise_data_inside.length; i++){
            for (let j = 0; j < newChecked.length; j++){
                done_data_inside[exercise_data_inside.indexOf(newChecked[j])] = true
            }
            async function updateexercisedata() {
                const result = await axios.put(`http://localhost:8000/api/update_myexercise/${data.username}/${exercise_data_inside[i]}/${today_date}/${done_data_inside[i]}`);
            }
            updateexercisedata()
        }
        setChecked(newChecked);
    };

    useEffect(() => {
        async function fetchexercisegraphdata() {
            const result = await axios.get(`http://localhost:8000/api/get_myexercise/${data.username}`);
            setgraphexerciselist(result.data)
            console.log("graphexerciselist",graphexerciselist)
        }
        fetchexercisegraphdata();
    }, [random2]);

    let graph_done_data = graphexerciselist.map((item) => { return item.done })
    let graph_date_data = graphexerciselist.map((item) => { return item.date })
    let graph_unique_date_data = [...new Set(graph_date_data)]
    const [pointdata, setpointdata] = useState([])
    console.log("graph_unique_date_data", graph_unique_date_data)
    console.log("point_data", pointdata)

    const showgraph = () => {
        let point_data = []
        for (let i = 0; i < graph_unique_date_data.length; i++){
            let points = 0
            for (let j = 0; j < graph_date_data.length; j++){
                if (graph_unique_date_data[i] === graph_date_data[j]) {
                    if (graph_done_data[j] === true) {
                        points++
                    }
                }
            }
            point_data.push(points)
        }
        setpointdata(point_data)
        setRandom2(Math.random());
    } 

    return (
        <div className="background">
            <Headerbarauth />
            <div className="container home-block">
                <div className="home-card">
                    <div className="text-title">Let's Do Exercise</div>
                    <iframe src="https://giphy.com/embed/26DMTbM0OAxbdPiYo" width="100%" height="400" frameBorder="0" class="giphy-embed" allowFullScreen ></iframe><p></p>
                    <button className='button' value='Submit' type='submit' sytle={{ cursor: 'pointer' }} onClick={reRender}>Exercises To Do List</button>
                    <div style={{ fontSize: "18px", justifyContent: 'center' }}>Your Exercises To Do</div>
                        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                            {exercise_data.filter(function( element ) {
                            return element !== undefined;}).map((value) => {
                                const labelId = `checkbox-${value}`;
                                // console.log("labelId", labelId)
                                return (
                                <ListItem
                                    key={value}
                                    disablePadding
                                >
                                    <ListItemButton role={undefined} onClick={handleToggle(value)} dense>
                                    <ListItemIcon>
                                        <Checkbox
                                        edge="start"
                                        checked={checked.indexOf(value) !== -1}
                                        tabIndex={-1}
                                        disableRipple
                                        inputProps={{ 'aria-labelledby': labelId }}
                                        />
                                    </ListItemIcon>
                                    <ListItemText id={labelId} primary={`${value}`} />
                                    </ListItemButton>
                                </ListItem>
                                );
                            })}
                    </List>
                </div>
                <div className="home-card">
                    <div className="text-title">Your Exercise Data</div>
                    <button className='button' value='Submit' type='submit' sytle={{ cursor: 'pointer' }} onClick={showgraph}>Show/Update Graph</button>
                    <Bar
                        data={{
                            labels: graph_unique_date_data,
                            datasets: [
                                {
                                    label: 'Your Daily Exercise Done',
                                    backgroundColor: 'rgba(75,192,192,1)',
                                    borderColor: 'rgb(75, 192, 192)',
                                    tension: 0.1,
                                    data: pointdata
                                }
                            ],
                        }}
                    />
                </div>
            </div>
        </div>
    )
}

export default MyExercise;
