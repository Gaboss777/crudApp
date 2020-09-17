//import librerias
import React from 'react';
import { Container, Row, Col, Badge, Card } from 'react-bootstrap';
import { connect } from 'react-redux';
import PayForm from './PayForm';
import InfoModal from './InfoModal';

const Calendar = ({ client }) => {

    const months = [{ id: '01', name: 'enero' }, { id: '02', name: 'febrero' }, { id: '03', name: 'marzo' }, { id: '04', name: 'abril' }, { id: '05', name: 'mayo' }, { id: '06', name: 'junio' }, { id: '07', name: 'julio' }, { id: '08', name: 'agosto' }, { id: '09', name: 'septiembre' }, { id: '10', name: 'octubre' }, { id: '11', name: 'noviembre' }, { id: '12', name: 'diciembre' }]

  

    return (
        <Container fluid >
            <Row>
                {client &&
                    <>
                        {months.map(month => {
                            let isPayed = client.payments.filter(x=>x.period===month.id+'-2020').reduce(function (a,b) { console.log(a); return a + b.amount; }, 0)>=client.mensuality
                            return (
                                <Col sm={3} className='px-1 my-1' >
                                    <Card border='warning'>
                                        <Card.Body className='px-0 pt-0'>
                                            <Card.Title className='bg-warning py-2 text-white text-uppercase text-center'>{month.name}</Card.Title>
                                            <Card.Text className='p-3 text-center'>
                                                <p>PAGO: <Badge variant={isPayed?'success':'danger'}>{isPayed?"CANCELADO":"PENDIENTE"}</Badge></p>
                                                <p>MENSUALIDAD: {client.mensuality}</p>
                                                <InfoModal month={month} payments={client.payments} />
                                                <PayForm asModal={true} month={month} disabled={isPayed} />
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            )
                        }
                        )}
                    </>
                }
            </Row>
        </Container>
    )
}

const MSTP = state => (
    {
        client: state.payment.client
    }
)

export default connect(MSTP, null)(Calendar);
