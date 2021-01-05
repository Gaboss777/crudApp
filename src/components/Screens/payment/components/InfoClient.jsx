import React from 'react'
import {Card, Badge, Row, Col} from 'react-bootstrap'

const InfoCard = ({client}) => {
    return(
        <Card className='shadow-none my-1' border='dark'>
            <Card.Header className='py-1'>
                <Row className='justify-content-center'>
                    <Col sm lg={4}>
                        <p className='mb-1 font-weight-bold'>SERVICIO: </p>
                        <p className='mb-0'>{client.service}</p>
                    </Col>
                    <Col sm lg={8}>
                        <p className='mb-1'><span className='font-weight-bold mr-1'>STATUS: </span><Badge variant={client.status === 'Activo' ? 'success' : client.status === 'Suspendido' ? 'warning' : 'danger'} className='text-uppercase'>{client.status}</Badge></p>
                        <p className='mb-0'><span className='font-weight-bold mr-1'>MENSUALIDAD: </span> {client.mensuality}</p>
                    </Col>
                </Row>
            </Card.Header>
        </Card>
    )
}

export default InfoCard