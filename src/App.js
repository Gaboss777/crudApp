import React, { useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootswatch/dist/materia/bootstrap.min.css';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import './App.scss';
import Layout from './components/layout';
import MainMenu from './components/Navbar';
import Dashboard from './components/Dashboard/dashboard';
import UsersActions from './components/Actions/UsersActions';
import UsersList from './components/users/List';
import { BrowserRouter as Router, Route, Switch, useRouteMatch } from 'react-router-dom';
import SideBar from './components/Sidebar';

//Componentes Vistas Pagos
import ProviderView from './components/providers/ProvidersView';
import PayUsers from './components/payment/components/PayUsers'
import EmployeeView from './components/employee/View';
import SellersView from './components/Sellers/SellersView';

//Componentes Vista Reportes
import Paymentsearch from './components/Reports/PaymentSearch';
import ReportsClients from './components/Reports/ReportsView/ReportsClient';

function App() {
  return (
    <Router>
      <MainMenu />
      <Layout >
        <Switch>,
          <Route exact path='/' component={Dashboard} />
          <Route exact path='/users' component={UsersView} />
          <Route exact path='/payment' component={PayView} />
          <Route exact path='/reports' component={ReportsView} />
        </Switch>
      </Layout>
    </Router>
  )
}

const UsersView =()=> {

  const [criteria,setCriteria]=useState("")

  return (
  <>
    <h1 className='text-center text-warning mt-2'>CLIENTES</h1>
    <UsersActions criteria={criteria} setCriteria={setCriteria} />
    <UsersList criteria={criteria} />
  </>
  )
}

const PayView =()=> {
  const { path } = useRouteMatch()
  const data = [
      {id: '1', route: 'client', linkName: 'Pago Clientes', component: PayUsers},
      {id: '2', route: 'provider', linkName: 'Pago Proveedores', component: ProviderView},
      {id: '3', route: 'employee', linkName: 'Pago Empleados', component: EmployeeView},
      {id: '4', route: 'sellers', linkName: 'Pago Vendedores', component: SellersView}
  ]

  return (
      <SideBar data={data} path={path} />
  )
}

const ReportsView =()=>{

  const { path } = useRouteMatch()
  const data = [
      {id: '1', route: 'client', linkName: 'Reportes Clientes', component: ReportsClients},
      {id: '2', route: 'provider', linkName: 'Reportes Pagos', component: Paymentsearch}
  ]

  return (
      <SideBar data={data} path={path} />
  )
}

export default App;
