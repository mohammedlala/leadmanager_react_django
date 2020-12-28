import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {CssBaseline } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../actions/auth";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    fontWeight: 'bold',
    fontSize: 25,
  },
}));

export default function ButtonAppBar() {

  const classes = useStyles();
  const auth = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const {isAuthenticated, user} = auth

  const authLinks = (
      <>
        <span style={{marginRight: '1.5rem', fontSize: '17px'}}>
          <strong>
            {
              user && `Welcome ${user.username}` 
            }
          </strong>
        </span>
        <Button color='primary' onClick={() => dispatch(logout())} variant='contained'>Logout</Button>
      </>
    )
  const guestLinks = (
      <>
        <Link to='/login'>
          <Button color='primary' variant='contained' style={{marginRight: '1rem'}}>Login</Button>
        </Link>
        <Link to='/register'>
          <Button color='primary' variant='contained'>Register</Button>
        </Link>
      </>
    )
  return (
    
    
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" style={{color: 'inherit', background: 'inherit'}}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Lead Manager
          </Typography>
          {
            isAuthenticated ? authLinks : guestLinks
          }
          
        </Toolbar>
      </AppBar>
    </div>
  );
}