import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';


export const PrivateRoute = ({ component: Component, ...rest }) => {
  const auth = useSelector(state => state.auth)

  return (
    <Route
      {...rest}
      render={(props) => {
        if (auth.isLoading) {
          return <h2>Loading...</h2>;
        } 
        else if (!auth.isAuthenticated) {
          return <Redirect to="/login" />;
        }
        else {
          return <Component {...props} />;
        }
      }}
    />
  )
}
