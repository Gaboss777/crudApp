import { faAddressBook, faCheckSquare, faFileInvoiceDollar, faKey, faUserLock, faBriefcase, faStoreAlt, faTruck, faChartArea, faFileInvoice, faHome, faListAlt, faLock, faFileAlt } from '@fortawesome/free-solid-svg-icons';
import Sidebar from 'components/Utils/Sidebar';
import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { BrowserRouter as Router, Route, Switch, useRouteMatch } from 'react-router-dom';
import ClienstView from '../Clients/ClienstView';
import PayClientsView from '../payment/PayClientsView';
import StatusView from '../Status/StatusView';
import ProviderView from '../providers/ProvidersView';
import EmployeeView from '../employee/View';
import SellersView from '../Sellers/SellersView';
import AccountView from 'components/Screens/AccUsers/AccountView'
import ProfilesView from 'components/Screens/Rules/ProfilesView'
import GeneralDataView from '../Reports/ReportsView/GeneralDataView';
import ReportsPayment from '../Reports/ReportsView/ReportsPayment';

const MainScreen = () => {

    const data = [
        { id: '1', linkName: 'Inicio', route: '', perform: 'dashboard-page', icon: faHome, component: GeneralDataView},
        {
            id: '2',
            linkName: 'Clientes',
            perform: 'clients-section',
            icon: faListAlt,
            subLinks: [
                {id: '1', route: 'list', linkName: 'Lista', perform: 'clients-page' , component: ClienstView, icon: faAddressBook },
                {id: '2', route: 'payments', linkName: 'Cobranza', perform: 'paymentsClient-page' ,component: PayClientsView, icon: faFileInvoiceDollar },
                {id: '3', route: 'status', linkName: 'Validacion', perform: 'status-page' ,component: StatusView, icon: faCheckSquare }
        ]},
        {
            id: '3',
            linkName: 'Pagos',
            perform: 'payments-section',
            icon: faFileInvoiceDollar,
            subLinks: [
                {id: '1', route: 'providers', linkName: 'Proveedores', perform: 'providers-page' ,component: ProviderView, icon: faTruck },
                {id: '2', route: 'employies', linkName: 'Empleados', perform: 'employies-page' ,component: EmployeeView, icon: faBriefcase },
                {id: '3', route: 'sellers', linkName: 'Vendedores', perform: 'sellers-page', component: SellersView, icon: faStoreAlt}
        ]},
        {
            id: '4',
            linkName: 'Reportes',
            perform: 'reports-section',
            icon: faFileInvoice,
            subLinks: [
                {id: '1', route: 'movements', linkName: 'Movimientos', perform: 'movements-page', component: ReportsPayment, icon: faFileAlt}
            ]
        },
        {
            id: '5',
            linkName: 'Permisos',
            perform: 'permission-section',
            icon: faLock,
            subLinks: [
                {id: '1', route: 'accounts', linkName: 'Cuentas', perform: 'accounts-page',component: AccountView, icon: faUserLock},
                {id: '2', route: 'profiles', linkName: 'Perfiles',perform: 'profiles-page', component: ProfilesView, icon: faKey}
        ]}
    ]

    return (
        <Router>
            <Container fluid className='px-0'>
                <Row className='mx-0'>
                    <Sidebar data={data} />
                    <Col sm lg={10} className='side-content bg-custom p-3'>
                        <Switch>
                            {data.map(link =>
                                Array.isArray(link.subLinks)
                                    ? link.subLinks.map(sub => <Route exact path={`/${link.linkName}/${sub.route}`} component={sub.component} /> )
                                    : <Route exact path={`/${link.route}`} component={link.component} />
                            )}
                        </Switch>
                    </Col>
                </Row>
            </Container>

        </Router>
    )
}

export default MainScreen