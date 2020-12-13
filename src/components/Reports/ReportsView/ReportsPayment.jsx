import React, { useEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { connect } from 'react-redux'
import { getBills } from '../../../ducks/provider'
import { getSalaries } from '../../../ducks/rrhh'
import { getSellsList } from '../../../ducks/sellers'
import { getPayments } from '../../../ducks/payment'
import { createReports } from '../../../ducks/reports'
import SearchForm from '../SearchForm'
import TableReports from '../TableReports'

const ReportsPayments = ({reports, sells, bills, salaries, getBills, getSalaries, getSells, payments, getPayments, createReports }) => {

    useEffect(() => {
        getBills()
        getSalaries()
        getSells()
        getPayments()
    }, [])

    return (
        <Container fluid className='px-0'>
            <h1 className='text-center text-white py-2 bg-warning title-section'>REPORTES PAGOS</h1>
            <Row>
                <Col sm lg={12}>
                    <h4 className='text-center'>OPCIONES DE BUSQUEDA</h4>
                </Col>
            </Row>
            <Row>
                <Col sm lg={12} className='pb-4'>
                    <SearchForm sells={sells} salaries={salaries} bills={bills} payments={payments} createReports={createReports} />
                </Col>
            </Row>
            <Row>
                <Col sm lg={12}>
                    <TableReports reports={reports} />
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
        payments: state.payment.payments,
        reports: state.reports.reports,
        sellers: state.sellers.list
    }
)

const MDTP = dispatch => (
    {
        getBills:() => dispatch(getBills()),
        getSalaries: () => dispatch(getSalaries()),
        getSells: () => dispatch(getSellsList()),
        getPayments: () => dispatch(getPayments()),
        createReports: (data) => dispatch(createReports(data))
    }
)


export default connect(MSTP,MDTP)(ReportsPayments)