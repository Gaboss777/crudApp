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
import ReportsClients from './components/Reports/ReportsView/ReportsClient';
import ReportsPayment from './components/Reports/ReportsView/ReportsPayment';

function App() {
  return (
    <Router>
      <MainMenu />
      <Layout >
        <Switch>
          <Route exact path='/' component={Dashboard} />
          <Route exact path='/users' component={UsersView} />
          <Route exact path='/payment' component={PayView} />
          <Route exact path='/reports' component={ReportsView} />
        </Switch>
      </Layout>
    </Router>
  )
}

// const Inicio = () => {
//   return (
//     <Router>
//       <MainMenu />
//       <Layout >
//         <Switch>,
//           <Route exact path='/' component={Login} />
//           <Route exact path='/dashboard' component={Dashboard} />
//           <Route exact path='/users' component={UsersView} />
//           <Route exact path='/payment' component={PayView} />
//           <Route exact path='/reports' component={ReportsView} />
//         </Switch>
//       </Layout>
//     </Router>
//   )
// }

const UsersView =()=> {

  const [criteria,setCriteria]=useState("")

  return (
  <>
    <h1 className='text-center text-white py-2 bg-warning title-section'>CLIENTES</h1>
    <UsersActions criteria={criteria} setCriteria={setCriteria} />
    <UsersList criteria={criteria} />
  </>
  )
}

const PayView =()=> {

  const data = [
      {id: '1', route: 'client', linkName: 'Cobro Clientes', component: PayUsers},
      {id: '2', route: 'provider', linkName: 'Pago Proveedores', component: ProviderView},
      {id: '3', route: 'employee', linkName: 'Pago Empleados', component: EmployeeView},
      {id: '4', route: 'sellers', linkName: 'Pago Vendedores', component: SellersView}
  ]

  return (
      <SideBar data={data} />
  )
}

const ReportsView =()=>{

  const data = [
      {id: '1', route: 'client', linkName: 'Datos Generales', component: ReportsClients},
      {id: '2', route: 'payments', linkName: 'Reportes', component: ReportsPayment}
  ]

  return (
      <SideBar data={data} />
  )
}

export default App;
