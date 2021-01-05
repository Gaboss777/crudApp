import React, { useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootswatch/dist/materia/bootstrap.min.css';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import './App.scss';

import Layout from './components/Layouts/layout';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import LoginView from './components/Screens/MainScreens/LoginView';
import PermissionView from './components/Screens/MainScreens/PermissionView';
import { PaymentsView } from './components/Screens/MainScreens/PaymentsView';
import { ReportsView } from './components/Screens/MainScreens/ReportsView';
import UsersView from './components/Screens/MainScreens/UsersView';
import Dashboard from './components/Screens/Dashboard/dashboard'
import { PrivateRoute, PublicRoute } from './components/Layouts/CustomRoutes'
import { connect } from 'react-redux';

const App = ({ isAuthenticated }) => {

  useEffect(() => {
  }, [isAuthenticated])

  return (
    <Router>
      <Layout>
        <Switch>
          <PrivateRoute exact path='/' component={Dashboard} />
          <PrivateRoute exact path='/clients' component={UsersView} />
          <PrivateRoute exact path='/payments' component={PaymentsView} />
          <PrivateRoute exact path='/reports' component={ReportsView} />
          <PrivateRoute exact path='/permission' component={PermissionView} />
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
