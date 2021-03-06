import React from 'react';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootswatch/dist/materia/bootstrap.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import TableList from './components/tablets/TableList';
import Layout from './components/layout';
import MenuCrud from './components/Navbar';

function App() {
  return(
    <div>
        <MenuCrud />
        <Layout >
          <TableList />
        </Layout>
    </div>
  )
}

export default App;
