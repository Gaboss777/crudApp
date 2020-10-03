
import React from 'react';
import SideBar from '../Sidebar';
import Calendar from './components/calendar';
import DropdownClient from './components/DropdownClient';
import { Col, Container, Row } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ProviderView from '../providers/ProvidersView';

const PayView = () => {
    return (
        <Router>
            <Container fluid className='px-0' >
                <Row>
                    <Col sm lg='2'>
                        <SideBar />
                    </Col>
                    <Col sm lg='10'>
                        <Switch>
                            <Route exact path='/payment/client' component={PayUsers} />
                            <Route exact path='/payment/provider' component={ProviderView} />
                            <Route exact path='/payment/accountStatus' />
                            <Route exact path='/payment/reports' />
                        </Switch>
                    </Col>
                </Row>
            </Container>
        </Router>
    )
}

const PayUsers = () => {
    return (
        <Container fluid className='px-0'>
            <Row >
                <Col sm lg='4' >
                    <DropdownClient />
                </Col>
                <Col sm lg={12} className='pl-0 mt-2'>
                    <Calendar />
                </Col>
            </Row>
        </Container>
    )
}

export default PayView;
