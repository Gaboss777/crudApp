
import React from 'react';
import SideBar from '../Sidebar';
import { Col, Container, Row } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ProviderView from '../providers/ProvidersView';
import PayUsers from './components/PayUsers'
import EmployeeView from '../employee/View';

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
                            <Route exact path='/payment/employee' component={EmployeeView} />
                        </Switch>
                    </Col>
                </Row>
            </Container>
        </Router>
    )
}

export default PayView;
