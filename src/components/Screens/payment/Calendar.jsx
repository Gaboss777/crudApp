import React from 'react'
import {Container, Row, Col, Card, Badge} from 'react-bootstrap'
import Month from 'components/Layouts/Month'
import Permission from 'components/Layouts/Permission'
import InfoPayments from './InfoPayments'
import PayForm from './PayForm'

const Calendar = ({client, year, user, payments, removePayment, createPayment, updatePayment}) => {
    const months = [{ id: '01', name: 'enero' }, { id: '02', name: 'febrero' }, { id: '03', name: 'marzo' }, { id: '04', name: 'abril' }, { id: '05', name: 'mayo' }, { id: '06', name: 'junio' }, { id: '07', name: 'julio' }, { id: '08', name: 'agosto' }, { id: '09', name: 'septiembre' }, { id: '10', name: 'octubre' }, { id: '11', name: 'noviembre' }, { id: '12', name: 'diciembre' }]

    const clientPayments = payments.filter(p => p.user_id === client.id)

    return (
    <Container fluid >
        <Row>
            {months.map(month => {
                let filterByMonth = clientPayments.filter(x=>x.period===month.id+'-'+year)
                let isPayedBs = filterByMonth.filter(x=>x.currency==='BS').reduce((a,b) => { return a + b.amount; }, 0)
                let isPayedUSD = filterByMonth.filter(x=>x.currency==='USD').reduce((a,b) => { return a + b.amount; }, 0)
                let validation = filterByMonth.map(x => x.validation)
                let period = filterByMonth.map(x => x.period)

                console.log(period)

                return(
                    <Month title={month.name}>
                        <p className='font-weight-bold text-uppercase'>MENSUALIDAD: <Badge variant={ validation.includes(1) && period.includes(month.id+'-'+year)  ? 'success' : 'danger'}>{validation.includes(1) && period.includes(month.id+'-'+year) ? 'PAGADO' : 'PENDIENTE'}</Badge></p>
                        <p className='font-weight-bold text-uppercase mb-1'>TOTAL PAGADO:</p>
                        <p className='font-weight-bold text-uppercase mb-1'>{new Intl.NumberFormat("es-VE", { style: 'currency', currency: 'VES', minimumFractionDigits: 2 }).format(isPayedBs)}</p>
                        <p className='font-weight-bold text-uppercase'>{new Intl.NumberFormat("en-US", { style: 'currency', currency: 'USD'}).format(isPayedUSD)}</p>
                        <InfoPayments month={month} user={user} payments={clientPayments} year={year} removePayment={removePayment} updatePayment={updatePayment} client={client} />
                        <Permission
                            role={user.role}
                            perform='paymentsClient:create'
                            yes={<PayForm edit={false} asModal={true} month={month} year={year} createPayment={createPayment} client={client} disabled={validation.includes(1) && period.includes(month.id+'-'+year)} />}
                         />

                    </Month>
                )}
            )}
        </Row>
    </Container>
    )
}

export default Calendar