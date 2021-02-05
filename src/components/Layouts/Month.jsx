import React from 'react'
import { Card, Col } from 'react-bootstrap'

const Month = ({title, children}) => {

    return (
        <Col sm lg={3} className='px-1 my-1'>
            <Card border='dark' className='shadow-none'>
                <Card.Header className='cerecom-bg-dark text-white text-center text-uppercase'><h5 className='mb-0 font-weight-bold'>{title}</h5></Card.Header>
                <Card.Body className='py-3 px-0 text-center'>
                    {children}
                </Card.Body>
            </Card>
        </Col>
    )
}

export default Month