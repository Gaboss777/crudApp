import React, { useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootswatch/dist/materia/bootstrap.min.css';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import './App.scss';
import Layout from './components/layout';
import MainMenu from './components/Navbar';
import Dashboard from './components/Dashboard/dashboard';
import PayView from './components/payment/payview';
import UsersActions from './components/Actions/UsersActions';
import UsersList from './components/users/List';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <Router>
      <MainMenu />
      <Layout >
        <Switch>
          <Route exact path='/' component={Dashboard} />
          <Route exact path='/users' component={UsersView} />
          <Route exact path='/payment' component={PayView} />
        </Switch>
      </Layout>
    </Router>
  )
}

const UsersView = () => {

  const [criteria,setCriteria]=useState("")

  return (
  <>
    <h1 className='text-center text-warning mt-2'>CLIENTES</h1>
    <UsersActions criteria={criteria} setCriteria={setCriteria} />
    <UsersList criteria={criteria} />
  </>
  )
}

export default App;
