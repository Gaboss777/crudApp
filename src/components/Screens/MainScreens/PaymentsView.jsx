import React from 'react'
import SideBar from '../../Utils/Sidebar'
import ProviderView from '../providers/ProvidersView';
import EmployeeView from '../employee/View';
import SellersView from '../Sellers/SellersView';
import { BrowserRouter as Router, Route, Switch, useRouteMatch } from 'react-router-dom';
import { Col, Container, Row } from 'react-bootstrap';

export const PaymentsView = () => {
    const { path } = useRouteMatch()

    const data = [,
        {id: '1', route: 'providers', linkName: 'Pago Proveedores', perform: 'providers-page' ,component: ProviderView},
        {id: '2', route: 'employies', linkName: 'Pago Empleados', perform: 'employies-page' ,component: EmployeeView},
        {id: '3', route: 'sellers', linkName: 'Pago Vendedores', perform: 'sellers-page', component: SellersView}
    ]

    return (
        <Router>
            <Container fluid className='px-0'>
                <Row className='mx-0'>
                    <SideBar data={data} path={path} />
                    <Col sm lg={10} className='side-content'>
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