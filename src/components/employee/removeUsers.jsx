import { faTrash, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { Button, Col, Modal, Row, Table, Container } from 'react-bootstrap';
import Alerts from '../Alerts/alerts';
import moment from 'moment';

const DeleteEmployee = ({selection, deleteEmployees}) => {

    const [show, setShow] = useState(false)

    const handleClick = () => {
        deleteEmployees(selection)
        setShow(false)
        Alerts.RemoveNotify('DATOS ELIMINADOS')
    }

    return(
    <>
        <Button disabled={ selection.length===0 ? true : false} className='my-2' variant='warning' onClick={() => setShow(true)} size='lg' ><FontAwesomeIcon icon={faTrash} /></Button>
        <Modal show={show} onHide={() => setShow(false)} centered size='lg' >
            <Modal.Header closeButton className='bg-danger' >ELIMINAR DATOS</Modal.Header>
            <Modal.Body>
                <Container>
                    <Row className='justify-content-center'>
                        <Col className='text-center' xs lg='12'>
                            <FontAwesomeIcon icon={faExclamationTriangle} size="6x" className='my-2 text-danger' />
                            <p>Seguro que desea eliminar estos datos?</p>
                        </Col>
                        <Col className='my-2'>
                                <Table bordered size='sm'>
                                    <thead className='bg-danger text-white'>
                                    <tr>
                                        <th>Nombres</th>
                                        <th>Apellidos</th>
                                        <th>Cedula</th>
                                        <th>Cargo</th>
                                        <th>Sueldo</th>
                                        <th>Fecha de ingreso</th>
                                        <th>Fecha de egreso</th>
                                    </tr>
                                </thead>
                                <tbody>
                                { selection.map ((data, index) =>
                                    <tr key={index}>
                                        <td>{data.firstname} {data.secondname}</td>
                                        <td>{data.lastname} {data.secondsurname}</td>
                                        <td>{data.document}</td>
                                        <td>{data.ocupation}</td>
                                        <td>{data.salary}</td>
                                        <td>{moment(data.initialdate, 'YYYY-MM-DD').format('YYYY-MM-DD')}</td>
                                        <td>{data.lastdate ? moment(data.lastdate, 'YYYY-MM-DD').format('YYYY-MM-DD') : 'ACTUALMENTE'}</td>
                                    </tr>
                                )}
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                    <Row className='text-center'>
                        <Col>
                            <Button variant='danger' type='submit' className='mx-2' onClick={handleClick} >Confirmar</Button>
                        </Col>
                    </Row>
                </Container>
            </Modal.Body>
        </Modal>
    </>
    )
}

export default DeleteEmployee