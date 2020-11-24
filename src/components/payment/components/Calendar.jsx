import React from 'react'
import {Container, Row, Col, Card, Badge} from 'react-bootstrap'
import InfoModal from './InfoModal'
import PayForm from './PayForm'

const Calendar = ({client, year, payments, removePayment, createPayment}) => {
    const months = [{ id: '01', name: 'enero' }, { id: '02', name: 'febrero' }, { id: '03', name: 'marzo' }, { id: '04', name: 'abril' }, { id: '05', name: 'mayo' }, { id: '06', name: 'junio' }, { id: '07', name: 'julio' }, { id: '08', name: 'agosto' }, { id: '09', name: 'septiembre' }, { id: '10', name: 'octubre' }, { id: '11', name: 'noviembre' }, { id: '12', name: 'diciembre' }]

    const clientPayments = payments.filter(p => p.user_id === client.id)
    console.log(payments)
    console.log(clientPayments)
    console.log(client)

    return (
    <Container fluid >
        <Row>
            {months.map(month => {
                let isPayedBs = clientPayments.filter(x=>x.period===month.id+'-'+year).filter(x=>x.currency==='BS').reduce(function (a,b) { return a + b.amount; }, 0)
                let isPayedUSD = clientPayments.filter(x=>x.period===month.id+'-'+year).filter(x=>x.currency==='USD').reduce(function (a,b) { return a + b.amount; }, 0)
                return(
                <Col sm lg={3} className='px-1 my-1'>
                    <Card border='dark' className='shadow-none'>
                        <Card.Header className='bg-warning text-white text-center text-uppercase'><h5 className='mb-0'>{month.name}</h5></Card.Header>
                        <Card.Body className='p-0'>
                            <Card.Text className='p-3 text-center'>
                                <p>PAGO: <Badge variant='danger'>PENDIENTE</Badge></p>
                                <p>TOTAL PAGADO BS: {isPayedBs}</p>
                                <p>TOTAL PAGASO USD: {isPayedUSD}</p>
                                <InfoModal month={month} payments={clientPayments} year={year} removePayment={removePayment} />
                                <PayForm asModal={true} month={month} year={year} createPayment={createPayment} client={client} />
                                </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                )}
            )}
        </Row>
    </Container>
    )
}

export default Calendar