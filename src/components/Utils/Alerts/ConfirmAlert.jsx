import React, { Fragment } from 'react';
import { Button, Col, Row } from 'react-bootstrap';

const ConfirmAlert = ({action, title}) => {
    return(
        <Fragment>
            <h4 className='text-center text-danger mt-5'>{title}</h4>
            <Row>
                <Col className='text-center mb-5'>
                    <Button variant='danger' className='mr-2' onClick={action} size='sm'>Confirmar</Button>
                    <Button variant='dark' size='sm'>Cancelar</Button>
                </Col>
            </Row>
        </Fragment>
    )
}

export default ConfirmAlert