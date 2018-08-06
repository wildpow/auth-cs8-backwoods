import { Route, Redirect } from 'react-router-dom';
import React from 'react';

const PrivateRoute = (props,{ component: Component, ...rest }) => (
  <React.Fragment>
  {console.log(props)}
  <Route
    {...rest}
    render={props =>
      props.isAuthenticated ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/",
            state: { from: props.location }
          }}
        />
      )
    }
  />
  </React.Fragment>
);

export default PrivateRoute;