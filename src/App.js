import React from 'react';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootswatch/dist/materia/bootstrap.min.css';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import './App.scss';

import Layout from './components/layout';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import LoginView from './components/Screens/LoginView';
import AccountsView from './components/Screens/AccountsView';
import { PaymentsView } from './components/Screens/PaymentsView';
import { ReportsView } from './components/Screens/ReportsView';
import { UsersView } from './components/Screens/UsersView';
import Dashboard from './components/Dashboard/dashboard'
import { PrivateRoute, PublicRoute } from './components/CustomRoutes'

function App() {
  return (
    <Router>
      <Layout>
        <Switch>
          <PrivateRoute exact path='/' component={Dashboard} />
          <PrivateRoute exact path='/clients' component={UsersView} />
          <PrivateRoute exact path='/payments' component={PaymentsView} />
          <PrivateRoute exact path='/reports' component={ReportsView} />
          <PrivateRoute exact path='/accounts' component={AccountsView} />
          <PublicRoute exact path='/login' component={LoginView} />
        </Switch>
      </Layout>
    </Router>
  )
}

export default App;
