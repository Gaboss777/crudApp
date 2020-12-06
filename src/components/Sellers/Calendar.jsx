import React, {useEffect} from 'react';
import {Container, Row, Col, Card} from 'react-bootstrap';
import PaymentForm from './forms/PaymentForm';
import InfoPayment from './InfoPayment';

const Calendar = ({seller, clientsList, getUserList, createSell, removeSell, sells, getSellsList, year}) => {

    useEffect(() => {
        getUserList()
        getSellsList()
    }, [])

    const sellerPayments = sells.filter(x => x.seller_id === seller.id)

    const months = [{ id: '01', name: 'enero' }, { id: '02', name: 'febrero' }, { id: '03', name: 'marzo' }, { id: '04', name: 'abril' }, { id: '05', name: 'mayo' }, { id: '06', name: 'junio' }, { id: '07', name: 'julio' }, { id: '08', name: 'agosto' }, { id: '09', name: 'septiembre' }, { id: '10', name: 'octubre' }, { id: '11', name: 'noviembre' }, { id: '12', name: 'diciembre' }]

    return (
        <Container fluid >
            <Row>
                {months.map(month => {
                    let totalSells = sellerPayments.filter(x => x.period === month.id+'-'+year)
                    let totalAmount = totalSells.reduce((a,b) => {return a + b.amount;}, 0).toFixed(2)

                    return(
                    <Col sm lg={3} className='px-1 my-1'>
                        <Card border='dark' className='shadow-none'>
                            <Card.Header className='bg-warning text-white text-center text-uppercase'><h5 className='mb-0'>{month.name}</h5></Card.Header>
                            <Card.Body className='p-0'>
                                <Card.Text className='p-3 text-center'>
                                    <p className='font-weight-bold text-uppercase'>Total Pagos: {totalSells.length}</p>
                                    <p className='font-weight-bold text-uppercase'>Monto Total: {totalAmount}</p>
                                    <InfoPayment removeSell={removeSell} sells={sellerPayments} month={month} clientsList={clientsList} year={year} />
                                    <PaymentForm clientsList={clientsList} month={month} seller={seller} isModal={true} createSell={createSell} year={year} />
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