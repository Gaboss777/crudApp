//import librerias
import React from 'react';
import { Container, Row, Col, Badge, Card } from 'react-bootstrap';
import { connect } from 'react-redux';
import PayForm from './PayForm';
import InfoModal from './InfoModal';

const Calendar = ({ client }) => {

    const months = [{ id: '01', name: 'enero' }, { id: '02', name: 'febrero' }, { id: '03', name: 'marzo' }, { id: '04', name: 'abril' }, { id: '05', name: 'mayo' }, { id: '06', name: 'junio' }, { id: '07', name: 'julio' }, { id: '08', name: 'agosto' }, { id: '09', name: 'septiembre' }, { id: '10', name: 'octubre' }, { id: '11', name: 'noviembre' }, { id: '12', name: 'diciembre' }]

    console.log(client)

    return (
        <Container fluid >
            <Row>
                {client &&
                    <>
                        {months.map(month => {
                            let isPayed = client.payments.filter(x=>x.period===month.id+'-2020').reduce(function (a,b) { console.log(a); return a + b.amount; }, 0)
                            return (
                                <Col sm={3} className='px-1 my-1' >
                                    <Card border='warning'>
                                        <Card.Header className='bg-warning text-white text-uppercase text-center'>{month.name}</Card.Header>
                                        <Card.Body className='px-0 pt-0'>
                                            <Card.Text className='p-3 text-center'>
                                                <p>PAGO: <Badge variant={isPayed >=client.mensuality ? 'success':'danger'}>{isPayed >= client.mensuality ?"CANCELADO":"PENDIENTE"}</Badge></p>
                                                <p>MENSUALIDAD: {client.mensuality}</p>
                                                { client.discount &&
                                                    <p>DESCUENTO: {client.discount}</p>
                                                }
                                                <p>TOTAL PAGADO: {isPayed}</p>
                                                <InfoModal month={month} payments={client.payments} />
                                                <PayForm asModal={true} month={month} disabled={isPayed + client.discount === client.mensuality ? true : false } />
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
