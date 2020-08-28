import React from 'react';
import { Row, Col, Button, Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

const ConfirmWarning = (props) => {
    return(
        <Container >
            <Row>
                <Col className='text-center'>
                    <FontAwesomeIcon icon={faExclamationTriangle} size="6x" className='my-2 text-danger' />
                    <p>{props.textWarning}</p>
                </Col>
            </Row>
            <Row className='text-center'>
                <Col>
                    <Button variant='danger' type='submit' className='mx-2' onClick={props.handleSubmit} >{props.textBtn}</Button>
                </Col>
            </Row>
        </Container>
    )
}

export default ConfirmWarning