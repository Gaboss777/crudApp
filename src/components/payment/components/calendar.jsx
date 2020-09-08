//import librerias
import React from 'react';
import { Container, Row, Col, Badge, Card } from 'react-bootstrap'; 
import { connect } from 'react-redux';
import PayForm from './form';
import InfoModal from './info';

const Calendar = ({client}) => {

    const months = [ { id: '01', name: 'enero'}, { id: '02', name: 'febrero'}, { id: '03', name: 'marzo'},{ id: '04', name: 'abril'}, { id: '05', name: 'mayo'}, { id: '06', name: 'junio'}, { id: '07', name: 'julio'}, { id: '08', name: 'agosto'}, { id: '09', name: 'septiembre'}, { id: '10', name: 'octubre'}, { id: '11', name: 'noviembre'}, { id: '12', name: 'diciembre'} ]

    console.log(client)

    return (
        <Container fluid >
                <Row>
                    { client.length === 1 &&
                        <>
                        { months.map(month =>
                        <Col sm={3} className='px-1 my-1' >
                            <Card border='warning'>
                                <Card.Body className='px-0 pt-0'>
                                    <Card.Title className='bg-warning py-2 text-white text-uppercase text-center'>{month.name}</Card.Title>
                                    <Card.Text className='p-3 text-center'>
                                        <p>PAGO: <Badge variant='success'>CANCELADO</Badge></p>
                                        <InfoModal title={month.name} />
                                        <PayForm asModal={true} month={month} />
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                        )}
                        </>
                    }
                </Row>
        </Container>
    )}

const MSTP = state => (
    {
        client: state.payment.client
    }
)

export default connect(MSTP, null)(Calendar);
