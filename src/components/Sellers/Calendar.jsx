import React from 'react';
import {Container, Row, Col, Card} from 'react-bootstrap';
import Month from '../Month';
import PaymentForm from './forms/PaymentForm';
import InfoPayment from './InfoPayment';

const Calendar = ({seller, clientsList, createSell, removeSell, sells, year}) => {

    const sellerPayments = sells.filter(x => x.seller_id === seller.id)

    const months = [{ id: '01', name: 'enero' }, { id: '02', name: 'febrero' }, { id: '03', name: 'marzo' }, { id: '04', name: 'abril' }, { id: '05', name: 'mayo' }, { id: '06', name: 'junio' }, { id: '07', name: 'julio' }, { id: '08', name: 'agosto' }, { id: '09', name: 'septiembre' }, { id: '10', name: 'octubre' }, { id: '11', name: 'noviembre' }, { id: '12', name: 'diciembre' }]

    return (
        <Container fluid >
            <Row>
                {months.map(month => {
                    let totalSells = sellerPayments.filter(x => x.period === month.id+'-'+year)
                    let totalAmount = totalSells.reduce((a,b) => {return a + b.amount;}, 0).toFixed(2)

                    return(
                    <Month title={month.name}>
                        <p className='font-weight-bold text-uppercase'>Total Pagos: {totalSells.length}</p>
                        <p className='font-weight-bold text-uppercase'>Monto Total: {totalAmount}</p>
                        <InfoPayment removeSell={removeSell} sells={sellerPayments} month={month} clientsList={clientsList} year={year} />
                        <PaymentForm clientsList={clientsList} month={month} seller={seller} isModal={true} createSell={createSell} year={year} />
                    </Month>
                    )}
                )}
            </Row>
        </Container>
    )
}

export default Calendar