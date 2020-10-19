
import React from 'react';
import SideBar from '../Sidebar';
import { Col, Container, Row } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Switch, useRouteMatch } from 'react-router-dom';
import ProviderView from '../providers/ProvidersView';
import PayUsers from './components/PayUsers'
import EmployeeView from '../employee/View';

const PayView = () => {

    const { path } = useRouteMatch()

    return (
        <Router>
            <Container fluid className='px-0' >
                <Row>
                    <Col sm lg='2'>
                        <SideBar path={path} />
                    </Col>
                    <Col sm lg='10'>
                        <Switch>
                            <Route path={`${path}/client`} component={PayUsers} />
                            <Route path={`${path}/provider`} component={ProviderView} />
                            <Route path={`${path}/employee`} component={EmployeeView} />
                        </Switch>
                    </Col>
                </Row>
            </Container>
        </Router>
    )
}

export default PayView;
