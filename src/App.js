import React from 'react';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootswatch/dist/materia/bootstrap.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import TableList from './components/tablets/TableInfo';
import ButtonActions from './components/btnActions';
function App() {
  return(
    <div>
        <ButtonActions />
        <TableList />
    </div>
  )
}

export default App;
