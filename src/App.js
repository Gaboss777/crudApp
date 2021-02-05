import React, { useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootswatch/dist/cosmo/bootstrap.min.css';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import './App.scss';

import Layout from './components/Layouts/layout';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import LoginView from './components/Screens/MainScreens/LoginView';
import MainScreen from './components/Screens/MainScreens/MainScreen';
import { PrivateRoute, PublicRoute } from './components/Layouts/CustomRoutes'
import { connect } from 'react-redux';

const App = ({ isAuthenticated }) => {

  useEffect(() => {
  }, [isAuthenticated])

  return (
    <Router>
      <Layout>
        <Switch>
          <PrivateRoute exact path='/' component={MainScreen} />
          <PublicRoute exact path='/login' component={LoginView} />
        </Switch>
      </Layout>
    </Router>
  )
}

const MSTP = state => (
  {
    isAuthenticated: state.auth.isAuthenticated
  }
)

export default connect(MSTP, null)(App);
