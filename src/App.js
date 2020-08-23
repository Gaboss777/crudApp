import React from 'react';
import CrudApp from './components/crud';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootswatch/dist/materia/bootstrap.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import UserList from './components/Users/List';
import UserForm from './components/Users/Form';
function App() {
  return(
    <div>
      <UserList/>
      <UserForm/>
    </div>
  )
}

export default App;
