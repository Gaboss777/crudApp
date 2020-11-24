import React, {useEffect} from 'react';
import {Container, Row, Col, Card} from 'react-bootstrap';
import PaymentForm from './forms/PaymentForm';
import InfoPayment from './InfoPayment';

const Calendar = ({seller, clientsList, getUserList, createSell, removeSell, sells, getSellsList}) => {

    useEffect(() => {
        getUserList()
        getSellsList()
    }, [])

    const months = [{ id: '01', name: 'enero' }, { id: '02', name: 'febrero' }, { id: '03', name: 'marzo' }, { id: '04', name: 'abril' }, { id: '05', name: 'mayo' }, { id: '06', name: 'junio' }, { id: '07', name: 'julio' }, { id: '08', name: 'agosto' }, { id: '09', name: 'septiembre' }, { id: '10', name: 'octubre' }, { id: '11', name: 'noviembre' }, { id: '12', name: 'diciembre' }]

    return (
        <Container fluid >
            <Row>
                {months.map(month => {
                    let totalSells = sells.filter(x => x.period === month.id+'-2020')

                    return(
                    <Col sm lg={3} className='px-1 my-1'>
                        <Card border='dark' className='shadow-none'>
                            <Card.Header className='bg-warning text-white text-center text-uppercase'><h5 className='mb-0'>{month.name}</h5></Card.Header>
                            <Card.Body className='p-0'>
                                <Card.Text className='p-3 text-center'>
                                    <h4>Total Pagos: {totalSells.length}</h4>
                                    <InfoPayment removeSell={removeSell} sells={sells} month={month} clientsList={clientsList} />
                                    <PaymentForm clientsList={clientsList} month={month} seller={seller} isModal={true} createSell={createSell} />
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