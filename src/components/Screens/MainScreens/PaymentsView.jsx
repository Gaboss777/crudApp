import React from 'react'
import SideBar from '../../Utils/Sidebar'
import ProviderView from '../providers/ProvidersView';
import PayUsers from '../payment/components/PayUsers'
import EmployeeView from '../employee/View';
import SellersView from '../Sellers/SellersView';
import { BrowserRouter as Router, Route, Switch, useRouteMatch } from 'react-router-dom';
import { Col, Container, Row } from 'react-bootstrap';

export const PaymentsView = () => {
    const { path } = useRouteMatch()

    const data = [
        {id: '1', route: 'clients', linkName: 'Cobro Clientes', component: PayUsers},
        {id: '2', route: 'providers', linkName: 'Pago Proveedores', component: ProviderView},
        {id: '3', route: 'employies', linkName: 'Pago Empleados', component: EmployeeView},
        {id: '4', route: 'sellers', linkName: 'Pago Vendedores', component: SellersView}
    ]

    return (
        <Router>
            <Container fluid className='px-0'>
                <Row>
                    <SideBar data={data} path={path} />
                    <Col sm lg={10}>
                        <Switch>
                        { data.map(x =>
                            <Route exact path={`${path}/${x.route}`} component={x.component} />
                        )}
                        </Switch>
                    </Col>
                </Row>
            </Container>
        </Router>
    )
}