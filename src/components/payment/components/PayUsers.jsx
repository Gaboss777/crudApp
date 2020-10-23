//import librerias
import React from 'react';
import { Container, Row, Col, Badge, Card } from 'react-bootstrap';
import { connect } from 'react-redux';
import PayForm from './PayForm';
import InfoModal from './InfoModal';
import DropdownClient from './DropdownClient';
import SelectionYear from '../../SelectionYear';

const PayUsers = ({client, year, payments}) => {

    return (
        <Container fluid>
            <Row >
                <Col sm lg={12} className='text-center mt-3' >
                    <h3>REGISTROS PAGOS CLIENTES</h3>
                </Col>
                <Col sm lg={12} className='border-payment' >
                    <DropdownClient />
                </Col>
                { client &&
                <>
                    <Col sm lg={2} className='my-2'>
                        <SelectionYear />
                    </Col>
                    { year && 
                    <Col sm lg={12} className='pl-0 mt-2'>
                        <h4 className='text-center'>CALENDARIO DE PAGOS</h4>
                        <Calendar client={client} year={year} payments={payments} />
                    </Col>
                    }
                </>
                }
            </Row>
        </Container>
    )
}

export const Calendar = ({client, year, payments}) => {
    const months = [{ id: '01', name: 'enero' }, { id: '02', name: 'febrero' }, { id: '03', name: 'marzo' }, { id: '04', name: 'abril' }, { id: '05', name: 'mayo' }, { id: '06', name: 'junio' }, { id: '07', name: 'julio' }, { id: '08', name: 'agosto' }, { id: '09', name: 'septiembre' }, { id: '10', name: 'octubre' }, { id: '11', name: 'noviembre' }, { id: '12', name: 'diciembre' }]

    const clientPayments = payments.filter(p => p.user_id === client.id)
    console.log(payments)

    return (
    <Container fluid >
        <Row>
            {months.map(month => {
                let isPayed = clientPayments.filter(x=>x.period===month.id+'-'+year).reduce(function (a,b) { return a + b.amount; }, 0)
                let percent = clientPayments.filter(x=>x.period===month.id+'-'+year).map(x => {return x.discount})
                let amountDiscount = (percent * client.mensuality) / 100

                console.log(isPayed)
                return(
                <Col sm lg={3} className='px-1 my-1'>
                    <Card border='dark' className='shadow-none'>
                        <Card.Header className='bg-warning text-white text-center text-uppercase'><h5 className='mb-0'>{month.name}</h5></Card.Header>
                        <Card.Body className='p-0'>
                            <Card.Text className='p-3 text-center'>
                                <p>PAGO: <Badge variant={isPayed + amountDiscount >=client.mensuality ? 'success':'danger'}>{isPayed >= client.mensuality ?"CANCELADO":"PENDIENTE"}</Badge></p>
                                <p>TOTAL PAGADO: {isPayed}</p>
                                <InfoModal month={month} payments={payments} year={year} />
                                <PayForm asModal={true} month={month} year={year} disabled={isPayed + amountDiscount >= client.mensuality ? true : false } />
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

const MSTP = state => (
    {
        client: state.payment.client,
        year: state.dates.year,
        payments: state.payment.payments
    }
)

export default connect(MSTP, null)(PayUsers);
