import { faTrash, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { Button, Col, Modal, Row, Table, Container } from 'react-bootstrap';
import { connect } from 'react-redux';
import { deleteEmployee } from '../../ducks/rrhh';
import Alerts from '../Alerts/alerts';

const DeleteUser = ({selection, deleteUser}) => {

    const [show, setShow] = useState(false)

    const handleClick = () => {
        deleteUser(selection)
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
                                        <td>{data.firstName} {data.secondName}</td>
                                        <td>{data.lastName} {data.secondSurname}</td>
                                        <td>{data.document}</td>
                                        <td>{data.ocupation}</td>
                                        <td>{data.salary}</td>
                                        <td>{data.initialDate}</td>
                                        <td>{data.lastDate}</td>
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

const MSTP = state => (
    {
        selection: state.rrhh.selected
    }
)

const MDTP = dispatch => (
    {
        deleteUser: (data) => dispatch(deleteEmployee(data))
    }
)

export default connect(MSTP, MDTP)(DeleteUser)