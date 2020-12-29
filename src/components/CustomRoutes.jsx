import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { getToken } from '../ducks/authReducer'

export const PrivateRoute = ({component: Component, ...rest}) => {
    return <Route {...rest} render={(props) => (!getToken() ? <Component {...props} /> : <Redirect to='/login' />)} />
}

export const PublicRoute = ({component: Component, ...rest }) => {
    return <Route {...rest} render={(props) => (!getToken() ? <Component {...props} /> : <Redirect to='/' />)} />
}