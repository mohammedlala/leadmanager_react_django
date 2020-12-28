import React, { useEffect, useState } from 'react'
import Header from './layout/Header'
import Alert from './layout/Alert'
import Dashboard from './leads/Dashboard'
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Provider } from 'react-redux'
import { store } from '../store'
import { Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
import {HashRouter as Router, Route, Switch, Redirect} from 'react-router-dom'
import Login from '../components/accounts/Login'
import Register from '../components/accounts/Register'
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import {PrivateRoute} from './common/PrivateRoute'
import { loadUser} from "../actions/auth";

const alertOptions = {
  timeout: 4000,
  position: 'bottom center',
  transition: 'fade'
}

const App = () => {
  const theme1 = createMuiTheme ({
    palette:{
        type: "light",
    },
  });
  useEffect(() => {
    store.dispatch(loadUser())
  }, [])
  return (
    <Provider store={store}>
    <ThemeProvider theme={theme1}>
      <AlertProvider template={AlertTemplate} {...alertOptions}>
        <CssBaseline />
        <Router>
          <Header />
          <Alert />
          <Container>
            <Switch>
              <PrivateRoute exact path='/' component={Dashboard} />
              <Route exact path='/register' component={Register} />
              <Route exact path='/login' component={Login} />
            </Switch>
          </Container>
        </Router>
      </AlertProvider>
    </ThemeProvider>
    </Provider>
  )
}

export default App