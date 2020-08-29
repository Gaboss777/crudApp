import React from 'react';
import { Row, Col, Button, Container, Table } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

const ConfirmWarning = ({handleSubmit, textWarning, textBtn, data}) => {

    const handleClick =(event)=>{
        event.preventDefault()
        handleSubmit(data)
    }

    return(
        <Container >
            <Row className='justify-content-center'>
                <Col className='text-center' xs lg='12'>
                    <FontAwesomeIcon icon={faExclamationTriangle} size="6x" className='my-2 text-danger' />
                    <p>{textWarning}</p>
                </Col>
                <Col className='my-2'>
                    <Table bordered>
                        <thead className='bg-danger text-white'>
                            <tr>
                                <th>Razon Social</th>
                                <th>CI/RIF </th>
                                <th>LOCALIZACION </th>
                                <th>MB</th>
                                <th>DIRECCION IP </th>
                                <th>SERVICIO</th>
                                <th>ESTATUS</th>
                            </tr>
                        </thead>
                        <tbody>
                        { Array.isArray(data) ?
                            <>
                            { data.map(user => (
                                <tr>
                                    <td>{user.razonSocial}</td>
                                    <td>{user.idDocument} </td>
                                    <td>{user.zoneLocation} </td>
                                    <td>{user.bandwidth}</td>
                                    <td>{user.ipAddress} </td>
                                    <td>{user.services}</td>
                                    <td>{user.estado}</td>
                                </tr>
                                ))
                            } </>
                            : <>
                            {
                                <tr>
                                    <td>{data.razonSocial}</td>
                                    <td>{data.idDocument} </td>
                                    <td>{data.zoneLocation} </td>
                                    <td>{data.bandwidth}</td>
                                    <td>{data.ipAddress} </td>
                                    <td>{data.services}</td>
                                    <td>{data.estado}</td>
                                </tr>
                            }
                            </>
                        }
                        </tbody>
                    </Table>
                </Col>
            </Row>
            <Row className='text-center'>
                <Col>
                    <Button variant='danger' type='submit' className='mx-2' onClick={handleClick} >{textBtn}</Button>
                </Col>
            </Row>
        </Container>
    )
}

export default ConfirmWarning