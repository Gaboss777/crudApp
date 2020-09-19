import React from 'react';
import { ButtonDashboard } from './dashboard';
import { Link } from 'react-router-dom';
import { Col, Container, Row } from 'react-bootstrap';
import { faCashRegister, faFileAlt, faFileInvoice, faMoneyCheckAlt } from '@fortawesome/free-solid-svg-icons';

const PaymentDashboard = () => {
    return (
        <Container fluid>
            <Row className='justify-content-center dashboard-container'>
                <Col className='text-center btn-dash-position '>
                    <Link to='/payment/client'><ButtonDashboard textBtn='PAGO CLIENTES' icon={faCashRegister} /></Link>
                    <Link to='/payment/provider'><ButtonDashboard textBtn='PAGO PROVEEDORES' icon={faMoneyCheckAlt} /></Link>
                    <Link to='/payment/accountStatus'><ButtonDashboard textBtn='ESTADO DE CUENTA' icon={faFileInvoice} /></Link>
                    <Link to='/payment/reports'><ButtonDashboard textBtn='REPORTES' icon={faFileAlt} /></Link>
                </Col>
            </Row>
        </Container>
    )
}

export default PaymentDashboard