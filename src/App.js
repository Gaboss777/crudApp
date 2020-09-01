import React from 'react';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootswatch/dist/materia/bootstrap.min.css';
import './App.css';
import UsersList from './components/users/List';
import Layout from './components/layout';
import MainMenu from './components/Navbar';
import ModalsActions from './components/Modal/ModalsActions';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <Router>
      <MainMenu />
      <Layout >
        <Switch>
          <Route path='/users' component={UsersView} />
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
