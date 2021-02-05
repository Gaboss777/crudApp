import React, { useEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { connect } from 'react-redux'
import { getBills, getProviders} from 'ducks/providerReducer'
import { getEmployies, getSalaries } from 'ducks/rrhhReducer'
import { getSellsList, getSellUsersList } from 'ducks/sellersReducer'
import { getPayments } from 'ducks/paymentReducer'
import { createReports } from 'ducks/reportsReducer'
import { getUserList } from 'ducks/usersReducer'
import SearchForm from '../SearchForm'
import { TableReports } from '../TableReports'

const ReportsPayments = ({reports, sells, bills, salaries, getBills, getSalaries, getSells, payments, getPayments, createReports, getEmployies, getClients, getSellers, getProviders, providers, sellers, clients, employies}) => {

    useEffect(() => {
        getBills()
        getSalaries()
        getSells()
        getPayments()
        getClients()
        getEmployies()
        getSellers()
        getProviders()
    }, [])

    const data= [employies, clients, providers, sellers]

    return (
        <Container fluid className='px-0 bg-white rounded'>
            <h3 className='text-center text-white py-2 bg-warning font-weight-bold rounded-top'>REPORTE DE MOVIMIENTOS</h3>
            <Row>
                <Col sm lg={12}>
                    <h5 className='text-center font-weight-bold'>OPCIONES DE BUSQUEDA</h5>
                </Col>
            </Row>
            <Row className='px-3' >
                <Col sm lg={12} className='pb-4'>
                    <SearchForm sells={sells} salaries={salaries} bills={bills} payments={payments} createReports={createReports} />
                </Col>
            </Row>
            <h5 className='text-center font-weight-bold'>RESULTADOS</h5>
            <Row className='px-3'>
                <Col sm lg={12}>
                    <TableReports reports={reports} data={data} />
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
        clients: state.users.list,
        providers: state.providers.providers,
        sellers: state.sellers.list,
        employies: state.rrhh.employies
    }
)

const MDTP = dispatch => (
    {
        getBills:() => dispatch(getBills()),
        getSalaries: () => dispatch(getSalaries()),
        getSells: () => dispatch(getSellsList()),
        getPayments: () => dispatch(getPayments()),
        createReports: (data) => dispatch(createReports(data)),
        getClients: () => dispatch(getUserList()),
        getSellers: () => dispatch(getSellUsersList()),
        getProviders: () => dispatch(getProviders()),
        getEmployies: () => dispatch(getEmployies())
    }
)


export default connect(MSTP,MDTP)(ReportsPayments)