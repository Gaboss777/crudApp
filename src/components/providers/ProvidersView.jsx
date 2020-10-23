//import librerias
import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import SelectionYear from '../SelectionYear';
import ListBills from './ListBills';

//crear componente
const ProviderView = () => {
    return (
        <Container fluid className='mt-2'>
            <Row>
                <Col sm lg={12}>
                    <h3 className='text-center my-2'>REGISTRO PAGOS PROVEEDORES</h3>
                </Col>
                <Col sm lg={2} className='my-2'>
                    <SelectionYear />
                </Col>
                <Col sm lg={12}>
                    <ListBills />
                </Col>
            </Row>
        </Container>
    )
}

export default ProviderView;
