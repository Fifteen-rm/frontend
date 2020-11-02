import React from "react"
import { Route, Redirect } from "react-router-dom"
import * as path from 'Utils/path';

function AuthRoute({ authenticated, component: Component, render, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        authenticated ? (
          render ? (
            render(props)
          ) : (
            <Component {...props} />
          )
        ) : (
          <Redirect
            to={{ pathname: path.PATIENT_LOGIN, state: { from: props.location } }}
          />
        )
      }
    />
  )
}

export default AuthRoute