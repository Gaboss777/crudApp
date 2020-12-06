import React, { useEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { connect } from 'react-redux'
import { getBills } from '../../../ducks/provider'
import { getSalaries } from '../../../ducks/rrhh'
import { getSellsList } from '../../../ducks/sellers'
import SearchForm from '../SearchForm'

const ReportsPayments = ({sells, bills, salaries, getBills, getSalaries, getSells, payments, list}) => {

    useEffect(() => {
        getBills()
        getSalaries()
        getSells()
    }, [])

    return (
        <Container fluid className='px-0'>
            <h1 className='text-center text-white py-2 bg-warning title-section'>REPORTES PAGOS</h1>
            <Row>
                <Col sm lg={12} className='border-bottom border-dark pb-4'>
                    <SearchForm sells={sells} salaries={salaries} bills={bills} payments={payments} list={list} />
                </Col>
            </Row>
        </Container>
    )
}

const MSTP = state => (
    {
        sells: state.sellers.sells,
        bills: state.providers.bills,
        salaries: state.rrhh.salaries,
        payments: state.payment.payments
    }
)

const MDTP = dispatch => (
    {
        getBills:() => dispatch(getBills()),
        getSalaries: () => dispatch(getSalaries()),
        getSells: () => dispatch(getSellsList()),
    }
)


export default connect(MSTP,MDTP)(ReportsPayments)