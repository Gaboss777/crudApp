import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { connect } from 'react-redux'
import { getPayments } from '../../../ducks/paymentReducer'
import { getBills } from '../../../ducks/providerReducer'
import { createReports } from '../../../ducks/reportsReducer'
import { getSalaries } from '../../../ducks/rrhhReducer'
import { getSellsList } from '../../../ducks/sellersReducer'
import { getUserList } from '../../../ducks/usersReducer'
import { ServicesReport, StatusReport, MovementsChart, ExpensesChart, TableLastExpenses, PlansMbReport, TableLastPayments } from '../Graphics'

const ReportsClients = ({getBills, getSalaries, getSells, getPayments, getUsersList, list, payments, bills, sells, salaries, year}) => {

    const [count, setCount] = useState(0)

    const handleCalls = () => {
        getUsersList()
        getPayments()
        getBills()
        getSalaries()
        getSells()
    }

    const handleCount = () => {
        const c = count + 1
        setCount(c)
        handleCalls()
    }

    useEffect(() => {
        if(count > 0){
            const interval = setInterval(handleCount, 100000)
            return () => clearInterval(interval)
        } else {
            handleCount()
        }
    }, [count])

    return (
        <Container fluid className='px-0 pb-4' >
            <h1 className='text-center text-white py-2 bg-warning title-section'>DATOS GENERALES</h1>
            <Row>
                <Col sm lg={6} className='pr-0'>
                    <MovementsChart year={year} payments={payments} sells={sells} salaries={salaries} bills={bills} />
                </Col>
                <Col sm lg={6}>
                    <ExpensesChart bills={bills} sells={sells} salaries={salaries} />
                </Col>
            </Row>
            <Row className='mt-3'>
                <Col sm lg={7} className='pr-0' >
                    <TableLastPayments list={list} payments={payments} s />
                </Col>
                <Col sm lg={5}>
                    <TableLastExpenses sells={sells} salaries={salaries} bills={bills} />
                </Col>
            </Row>
            <Row className='mt-3'>
                <Col sm lg={3} >
                    <ServicesReport list={list} />
                </Col>
                <Col sm lg={3}>
                    <StatusReport list={list} />
                </Col>
                <Col sm lg={6}>
                    <PlansMbReport list={list} />
                </Col>
            </Row>
        </Container>
    )
}

const MSTP = state => (
    {
        list: state.users.list,
        payments: state.payment.payments,
        year: state.dates.year,
        sells: state.sellers.sells,
        bills: state.providers.bills,
        salaries: state.rrhh.salaries,
    }
)

const MDTP = dispatch => (
    {
        getUsersList: () => dispatch(getUserList()),
        getPayments: () => dispatch(getPayments()),
        getBills:() => dispatch(getBills()),
        getSalaries: () => dispatch(getSalaries()),
        getSells: () => dispatch(getSellsList()),
    }
)

export default connect(MSTP, MDTP)(ReportsClients)