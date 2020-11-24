import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { connect } from 'react-redux'
import { createReports } from '../../../ducks/reports'
import ClientSearch from '../ClientSearch'
import Tablereports from '../Tablereporst'

const ReportsClients = ({reports, createReport}) => {

    const column = ['Cliente', 'Ubicacion', 'MB', 'Servicio', 'Status']
    const data = reports

    console.log(data)

    return (
        <Container fluid >
            <h3 className='text-center my-3'>REPORTES CLIENTES</h3>
            <Row>
                <Col sm lg={12} className='border border-dark py-4 px-3'>
                    <ClientSearch createReport={createReport} />
                </Col>
            </Row>
            <h3 className='my-3 text-center'>RESULTADOS</h3>
            <Row>
                <Col sm lg={12}>
                    <Tablereports column={column} />
                </Col>
            </Row>
        </Container>
    )
}

const MSTP = state => (
    {
        reports: state.reports.reports
    }
)

const MDTP = dispatch => (
    {
        createReport: (data) => dispatch(createReports(data))
    }
)

export default connect(MSTP, MDTP)(ReportsClients)