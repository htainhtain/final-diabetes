import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import {
    Box,
    Grid,
    TextField,
    InputAdornment,
    Typography,
    Button
} from '@material-ui/core';
import "./Main.css";
import Headerbar from "./Header";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel'
import axios from "axios";
import Alert from '@mui/material/Alert';
import Link from '@mui/material/Link';
import { useHistory } from "react-router-dom";

function Register() {
    const [successAlert, setSuccessAlert] = useState(false)
    const [alertContent, setAlertContent] = useState('');
    const [errorAlert, setErrorArlert] = useState(false)
    const [errorContent, setErrorContent] = useState('');
    const history = useHistory();
  
    const validationSchema = Yup.object().shape({
      real_name: Yup.string().required('Name is required'),
      dob: Yup.string().required('Date of birth is required'),
      surname: Yup.string().required('Surname is required'),
      weight: Yup.number().typeError("Weight must be a number").required('Weight is required'),
      height: Yup.number().required().positive().integer().typeError("Height must be a number"),
      tel: Yup.number()
        .typeError('You must specify a number')
        .required(),
      username: Yup.string()
        .required('Username is required')
        .min(6, 'Username must be at least 6 characters')
        .max(20, 'Username must not exceed 20 characters'),
      email: Yup.string()
        .required('Email is required')
        .email('Email is invalid'),
      password: Yup.string()
        .required('Password is required')
        .min(6, 'Password must be at least 6 characters')
        .max(40, 'Password must not exceed 40 characters'),
      confirmPassword: Yup.string()
        .required('Confirm Password is required')
        .oneOf([Yup.ref('password'), null], 'Confirm Password does not match'),
      acceptTerms: Yup.bool().oneOf([true], 'Accept Terms is required')
    });
  
    const {
      register,
      // control,
      handleSubmit,
      formState: { errors }
    } = useForm({
      resolver: yupResolver(validationSchema)
    });
  
  const onSubmit = (data, evt) => {
      evt.preventDefault();
      // console.log(JSON.stringify(data, null, 2));
      axios.post("http://127.0.0.1:8000/register", data)
        .then((response) => {
            console.log("response", response.status)
            setAlertContent("Your registration was successfully completed.");
          setSuccessAlert(true);
          setErrorArlert(false);
      })
        .catch((error) => {
          console.log("error", error.response.data['detail'])
          setErrorContent(error.response.data['detail'])
          setSuccessAlert(false);
          setErrorArlert(true);
      });
  };
  
    const handleMenuClick = pageURL => {
      history.push(pageURL);
    };

  return (
    
    <div className="background">
      <Headerbar />
      <div className="container home-block">
      <div className="home-card">
        <div className="text-title">
            <h5>Get Started. Please register to begin.</h5>
        </div>
          <Grid>
            <Grid>
              <TextField
                  required
                  id="username"
                  name="username"
                  label="Username"
                  fullWidth
                  margin="dense"
                  {...register('username')}
                  error={errors.username ? true : false}
              />
              <Typography variant="inherit" color="textSecondary">
                  {errors.username?.message}
              </Typography>
            </Grid>
            <Grid>
              <TextField
                  required
                  id="name"
                  name="name"
                  label="Name"
                  fullWidth
                  margin="dense"
                  {...register('real_name')}
                  error={errors.real_name ? true : false}
              />
              <Typography variant="inherit" color="textSecondary">
                  {errors.real_name?.message}
              </Typography>
            </Grid>
            <Grid>
              <TextField
                  required
                  id="surname"
                  name="surname"
                  label="Surname"
                  fullWidth
                  margin="dense"
                  {...register('surname')}
                  error={errors.surname ? true : false}
              />
              <Typography variant="inherit" color="textSecondary">
                  {errors.surname?.message}
              </Typography>
            </Grid>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
              <div style={{display: 'flex', flexDirection: 'column'}}>
              <TextField style={{ width: "180px" }}
                  required
                  id="date"
                  label="Birth Date"
                  type="date"
                  format="dd/MM/yyyy"
                  className="textfield"
                  name="dob"
                  {...register('dob')}
                  error={errors.dob ? true : false}
                  InputLabelProps={{
                  shrink: true,
                }} />
                  <Typography variant="inherit" color="textSecondary">
                    {errors.dob?.message}
                  </Typography>
                </div>
                  <FormControl component="fieldset">
                  <FormLabel
                    component="legend"
                  >Gender</FormLabel>
                <RadioGroup
                  row
                  aria-label="gender"
                  name="row-radio-buttons-group"
                  {...register('gender')}
                  error={errors.gender ? true : false}
                >
                      <FormControlLabel value="female" control={<Radio />} label="Female" />
                      <FormControlLabel value="male" control={<Radio />} label="Male" />
                      <FormControlLabel value="other" control={<Radio />} label="Other" />
                    </RadioGroup>
                    <Typography variant="inherit" color="textSecondary">
                      {errors.gender?.message}
                    </Typography>
                  </FormControl>
                {/* <div name='gender'
                      style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginleft: 'auto',
                      paddingLeft: '20px',
                      // inputRef={register()}
                  }}>
                  <br></br>
                  Gender: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <br></br>
                  <br></br>
                  <input type="radio" value='male' name="gender" /> Male
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <input type="radio" value="Female" name="gender" /> Female
                </div>               */}
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
              <div>
                <Grid >
                <TextField
                      required
                      id="weight"
                      name="weight"
                      label="Weight"
                      fullWidth
                      margin="dense"
                      InputProps={{ endAdornment: ( <InputAdornment position='end'>kg</InputAdornment>)}}
                      {...register('weight')}
                      error={errors.weight ? true : false}
                  />
                  <Typography variant="inherit" color="textSecondary">
                      {errors.weight?.message}
                  </Typography>
                </Grid>
              </div>
              <div>
                <Grid >
                  <TextField
                        required
                        id="height"
                        name="height"
                        label="Height"
                        fullWidth
                        margin="dense"
                        InputProps={{ endAdornment: ( <InputAdornment position='end'>cm</InputAdornment>)}}
                        {...register('height')}
                        error={errors.height ? true : false}
                    />
                    <Typography variant="inherit" color="textSecondary">
                        {errors.height?.message}
                  </Typography>
                </Grid>
              </div>
            </div>
            <Grid >
              <TextField
                  required
                  id="tel"
                  name="tel"
                  label="Tel"
                  fullWidth
                  margin="dense"
                  {...register('tel')}
                  error={errors.tel ? true : false}
              />
              <Typography variant="inherit" color="textSecondary">
                  {errors.tel?.message}
              </Typography>
            </Grid>
            <Grid >
              <TextField
                  required
                  id="email"
                  name="email"
                  label="Email"
                  fullWidth
                  margin="dense"
                  {...register('email')}
                  error={errors.email ? true : false}
              />
              <Typography variant="inherit" color="textSecondary">
                  {errors.email?.message}
              </Typography>
            </Grid>
            <Grid >
                        <TextField
                            required
                            id="password"
                            name="password"
                            label="Password"
                            type="password"
                            fullWidth
                            margin="dense"
                            {...register('password')}
                            error={errors.password ? true : false}
                        />
                        <Typography variant="inherit" color="textSecondary">
                            {errors.password?.message}
                        </Typography>
            </Grid>
            <Grid >
                        <TextField
                            required
                            id="confirmPassword"
                            name="confirmPassword"
                            label="Confirm Password"
                            type="password"
                            fullWidth
                            margin="dense"
                            {...register('confirmPassword')}
                            error={errors.confirmPassword ? true : false}
                        />
                        <Typography variant="inherit" color="textSecondary">
                            {errors.confirmPassword?.message}
                        </Typography>
            </Grid>
            <Box mt={3}>
                <Button
                  variant="contained"
                  color="primary"
                  className='button'
                  onClick={handleSubmit(onSubmit)}
                sytle={{ cursor: 'pointer' }}
                style={{background:'#DE5C8E'}}
                >
                  Register
                </Button>
            </Box>
            <br />
            {successAlert ?
              (
                <>
                  <Alert severity='success'>{alertContent}</Alert>
                  <br />
                  <Typography>You can login <Link onClick={() => handleMenuClick('/login')} sytle={{cursor: 'pointer'}}>here</Link></Typography>
                </>
              )
              : <></>}
            {errorAlert ?
              (
                <>
                  <Alert severity='error'>{errorContent}</Alert>
                </>
              )
              : <></>}
          </Grid>
        </div>
        </div>
      </div>
    );
}
  
export default Register;