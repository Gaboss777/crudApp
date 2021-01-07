import React from 'react'
import SideBar from '../../Utils/Sidebar'
import GeneralDataView from '../Reports/ReportsView/GeneralDataView';
import ReportsPayment from '../Reports/ReportsView/ReportsPayment';
import { BrowserRouter as Router, Route, Switch, useRouteMatch } from 'react-router-dom';
import { Col, Container, Row } from 'react-bootstrap';

export const ReportsView =()=>{
    const { path } = useRouteMatch()

    const data = [
        {id: '1', route: 'graphics', linkName: 'Datos Generales', perform: 'graphics-page', component: GeneralDataView},
        {id: '2', route: 'movements', linkName: 'Reportes', perform: 'movements-page', component: ReportsPayment}
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