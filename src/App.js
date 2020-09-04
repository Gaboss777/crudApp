import React from 'react';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootswatch/dist/materia/bootstrap.min.css';
import './App.scss';
import UsersList from './components/users/List';
import Layout from './components/layout';
import MainMenu from './components/Navbar';
import ModalsActions from './components/Modal/ModalsActions';
import Dashboard from './components/Dashboard/dashboard';
import PayView from './components/payment/payview';
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

    </Router >
  )
}

const UsersView = () => {
  return (
    <>
      <ModalsActions />
      <UsersList />
    </>
  )
}

export default App;
