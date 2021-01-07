import Sidebar from 'components/Utils/Sidebar';
import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { BrowserRouter as Router, Route, Switch, useRouteMatch } from 'react-router-dom';
import ClienstView from '../Clients/ClienstView';
import PayClientsView from '../payment/PayClientsView';
import StatusView from '../Status/StatusView';

const UsersView = () => {

    const { path } = useRouteMatch()

    const data = [
        {id: '1', route: 'list', linkName: 'Lista Clientes', perform: 'clients-page' , component: ClienstView },
        {id: '2', route: 'status', linkName: 'Estatus de Cobro', perform: 'status-page' ,component: StatusView },
        {id: '3', route: 'payments', linkName: 'Cobro Clientes', perform: 'paymentsClient-page' ,component: PayClientsView }
    ]

    return (
        <Router>
            <Container fluid className='px-0'>
                <Row className='mx-0'>
                    <Sidebar data={data} path={path} />
                    <Col sm lg={10} className='side-content'>
                        <Switch>
                            {data.map(link => 
                                <Route exact path={`${path}/${link.route}`} component={link.component} />
                            )}
                        </Switch>
                    </Col>
                </Row>
            </Container>

        </Router>
    )
}

export default UsersView