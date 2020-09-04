import React from 'react'
import {Container, Row, Col, Button} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThList, faFileInvoiceDollar, faInfo } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    return (
        <Container fluid>
            <Row className='justify-content-center dashboard-container'>
                <Col className='text-center btn-dash-position '>
                    <Link to='/users'><ButtonDashboard textBtn='CLIENTES' icon={faThList} /></Link>
                    <Link to='/pagos'><ButtonDashboard textBtn='PAGOS' icon={faFileInvoiceDollar} /></Link>
                    <Link to='/info'><ButtonDashboard textBtn='INFORMACION' icon={faInfo} /></Link>
                </Col>
            </Row>
        </Container>
    )
}

const ButtonDashboard =({textBtn, icon})=> {
    return(
        <Button className='btn-dash-size btn-dash-style btn-dash-vertical mt-3' ><FontAwesomeIcon icon={icon} size='2x' className='mt-3' /><p className='mt-2'>{textBtn}</p></Button>
    )
}

export default Dashboard