import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import { Link } from 'react-router-dom'
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useDispatch, useSelector } from "react-redux";
import { createMessage } from '../../actions/messages';
import { register } from '../../actions/auth';
import { Redirect } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
  const classes = useStyles();
  const defaulState = {
  username: '',
  email: '',
  password1: '',
  password2: '',
  }
  const [value, setValue] = useState(defaulState)
  const auth = useSelector(state => state.auth)
  const {isAuthenticated} = auth
  const dispatch = useDispatch()

  const handleChange = (e) =>{
    e.preventDefault()
    setValue({...value, [e.target.name]: e.target.value})
  } 

  const handleSubmit = (e) => {
    e.preventDefault()
    if(value.password1 !== value.password2){
      dispatch(createMessage({
        passwordNotMatch: 'Passwords do not match',
      }))
    }
    else{
      const {username,password1, email } = value
      const newUser = {
        username,
        email,
        password: password1,
      }
      dispatch(register(newUser))
    }
  }
  if(isAuthenticated){
    return <Redirect to='/' />
  }
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                name="username"
                variant="outlined"
                required
                fullWidth
                id="username"
                label="Your Username"
                onChange = {handleChange}
                value={value.username}
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                type='email'
                label="Email Address"
                name="email"
                onChange = {handleChange}
                value={value.email}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password1"
                label="Password"
                type="password"
                id="password1"
                onChange = {handleChange}
                value={value.password1}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password2"
                label="Confirm Password"
                type="password"
                id="password2"
                onChange = {handleChange}
                value={value.password2}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link to="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}