import React from 'react';
import { Row, Col, Button, Container, Table } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

const ConfirmWarning = ({handleSubmit, textWarning, textBtn, data}) => {
    return(
        <Container >
            <Row className='justify-content-center'>
                <Col className='text-center' xs lg='3'>
                    <FontAwesomeIcon icon={faExclamationTriangle} size="6x" className='my-2 text-danger' />
                    <p>{textWarning}</p>
                </Col>
                <Col className='my-2' xs lg='9'>
                    <h3 className='text-center' >{data.razonSocial}</h3>
                    <Table bordered>
                        <thead className='bg-danger text-white'>
                            <tr>
                                <th>CI/RIF </th>
                                <th>LOCALIZACION </th>
                                <th>MB</th>
                                <th>DIRECCION IP </th>
                                <th>SERVICIO</th>
                                <th>ESTATUS</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{data.idDocument} </td>
                                <td>{data.zoneLocation} </td>
                                <td>{data.bandwidth}</td>
                                <td>{data.ipAddress} </td>
                                <td>{data.services}</td>
                                <td>{data.estado}</td>
                            </tr>
                        </tbody>
                    </Table>
                </Col>
            </Row>
            <Row className='text-center'>
                <Col>
                    <Button variant='danger' type='submit' className='mx-2' onClick={handleSubmit} >{textBtn}</Button>
                </Col>
            </Row>
        </Container>
    )
}

export default ConfirmWarning