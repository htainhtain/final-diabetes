import React, { useState, useEffect } from 'react';
import Headerbarauth from './Headerauth';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import { TokenApi } from '../App.js';
import axios from 'axios';
import moment from 'moment';
import { Bar } from 'react-chartjs-2';
import { useTranslation } from 'react-i18next';

function MyExercise2() {
    const [minute, setMinute] = useState()
    const [data, setData] = useState("");
    const [random, setRandom] = useState(Math.random());
    const [graphexerciselist, setgraphexerciselist] = useState([{}])
    const Token = React.useContext(TokenApi)
    const { t } = useTranslation();

    var today = new Date();
    var date = moment().format('YYYY-MM-DD')

    const thisweek = getWeekDays(getWeekRange(date)['from']);
    let days_graph = [];
    let min_per_day = [];
    
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
        // console.log('x: ', x);
    }, []);

    const handleonclick = (e) => {
        e.preventDefault();
        axios.post(`https://diabetes-wices-backend.herokuapp.com/api/create_myexercise/${data.username}`, {
            'minute': minute,
            'date': date
          })
    }

    useEffect(() => {
        async function fetchexercisegraphdata() {
            const result = await axios.get(`https://diabetes-wices-backend.herokuapp.com/api/get_myexercise/${data.username}`);
            setgraphexerciselist(result.data)
        }
        fetchexercisegraphdata();
    }, [random]);

    for (let i = 0; i < thisweek.length; i++) {
        days_graph.push(moment(thisweek[i]).format('YYYY-MM-DD'))
        min_per_day.push(0)
        for (let j = 0; j < graphexerciselist.length; j++) {
            if (days_graph[i] === graphexerciselist[j]['date']) {
                min_per_day[i] = Number(graphexerciselist[j]['minute'])
            }
        }
    }

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
            .startOf('week')
            .toDate(),
          to: moment(date)
            .endOf('week')
            .toDate(),
        };
    }

    let week_graph = []
    let each_week_score = []
    let score = []
    let score_color = []

    for (let x = 4; x > -1; x--) {
        var this_week_data = moment(getWeekDays(getWeekRange(moment(moment(thisweek[6]).subtract(7 * x, 'days').toDate()))['from'])[0]).format('MM-DD') + ` ${t('To.1')} ` + moment(getWeekDays(getWeekRange(moment(moment(thisweek[6]).subtract(7 * x, 'days').toDate()))['from'])[6]).format('MM-DD')
        var one_week = getWeekDays(getWeekRange(moment(thisweek[6]).subtract(7 * x, 'days'))['from']);
        var each_day_in_week = []
        var each_day_min = 0
        for (let y = 0; y < one_week.length; y++) {
            each_day_in_week.push(moment(one_week[y]).format('YYYY-MM-DD'))
            for (let j = 0; j < graphexerciselist.length; j++) {
                if (each_day_in_week[y] === graphexerciselist[j]['date']) {
                    each_day_min += Number(graphexerciselist[j]['minute'])
                }
            }
        }
        each_week_score.push(each_day_min)
        week_graph.push(this_week_data)
    }

    for (let z = 0; z < each_week_score.length; z++) {
        if (each_week_score[z] >= 150) {
            score.push(5)
            score_color.push('rgba(3,201,169,1)')
        } else if (each_week_score[z] > 120) {
            score.push(4)
            score_color.push('rgba(30,130,76,1)')
        } else if (each_week_score[z] > 90) {
            score.push(3)
            score_color.push('rgba(255,192,203,1)')
        } else if (each_week_score[z] > 60) {
            score.push(2)
            score_color.push('rgba(255,99,71,1)')
        } else if (each_week_score[z] > 30) {
            score.push(1)
            score_color.push('rgba(108,122,137,1)')
        } else {
            score.push(0)
            score_color.push('rgba(255, 0, 0,1)')
        }
    }

    return (
        <>
            <div className="background">
                <Headerbarauth />
                <div className="container home-block">
                    <div className="home-card">
                        <div className="text-title">{t('LetsDoExercise.1')}</div>
                        <iframe src="https://giphy.com/embed/12bgKWqBoAMbbG" width="100%" height="272" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>
                        <br />
                        <br />
                        <div className="text-title">{t('PutMinute.1')} { date }.</div>
                        <form style= {{ display: 'flex', justifyContent: 'space-evenly'}}  onClick={handleonclick}>
                            <TextField
                                required
                                onChange={(e) => setMinute(e.target.value)}
                                value={minute}
                                label={t('ExerciseMinute.1')}
                                id="outlined-start-adornment"
                                sx={{ m: 1, width: '25ch' }}
                                InputProps={{
                                    startAdornment: <InputAdornment position="start">{t('Min.1')}</InputAdornment>,
                                }}
                            />
                            <Button
                                variant="contained"
                                color="secondary"
                                type="submit"
                                style={{backgroundColor: '#DE5C8E', color: 'white'}}
                            >
                                {t('Submit.1')}
                            </Button>
                        </form>
                    </div>
                    <div className="home-card">
                        <div className="text-title">{t('ExerciseData.1')}</div>
                        <button className='button' value='Submit' type='submit' sytle={{ cursor: 'pointer' }} onClick={showgraph}>{t('ShowUpdateGraph.1')}</button>
                        <br />
                        <Bar
                            data={{
                                labels: week_graph,
                                datasets: [
                                    {
                                        label: `${t('WeeklyScore.1')}`,
                                        backgroundColor: score_color,
                                        borderColor: 'rgb(88,100,146)',
                                        tension: 0.1,
                                        data: score
                                    }
                                ],
                            }}
                        />
                        <br />
                        <Bar
                            data={{
                                labels: week_graph,
                                datasets: [
                                    {
                                        label: `${t('WeeklyMinute.1')}`,
                                        backgroundColor: score_color,
                                        borderColor: 'rgb(88,100,146)',
                                        tension: 0.1,
                                        data: each_week_score
                                    }
                                ],
                            }}
                        />
                        <br />
                        <Bar
                            data={{
                                labels: days_graph,
                                datasets: [
                                    {
                                        label: `${t('DailyMinute.1')}`,
                                        backgroundColor: 'rgba(75,192,192,1)',
                                        borderColor: 'rgb(75, 192, 192)',
                                        tension: 0.1,
                                        data: min_per_day
                                    }
                                ],
                            }}
                        />
                    </div>
                </div>
            </div>  
        </>
    )
}

export default MyExercise2;
