import React, { Fragment,  useState } from 'react';
import { connect } from 'react-redux';
import {Button, Modal, Row, Col, Table, Container} from 'react-bootstrap';
import { removeUser } from '../../../ducks/usersReducer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import Alerts from '../../Utils/Alerts/alerts';


const DeleteClients = ({ selection,deleteUser }) => {
    const [show, setShow] = useState(false);

    const handleClick=()=>{
        deleteUser(selection)
        setShow(false)
        Alerts.RemoveNotify("DATOS ELIMINADOS EXITOSAMENTE")
    }
    return (
        <Fragment>
            <Button disabled={selection.length===0} variant='danger' onClick={() => setShow(true)}><FontAwesomeIcon icon={faTrashAlt}/></Button>
            <Modal show={show} onHide={() => setShow(false)} dialogClassName='modal-xlg' >
                <Modal.Header closeButton className='bg-danger' >
                    <Modal.Title className='text-center w-100 text-white font-weight-bold' >Eliminar Datos</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container >
                        <Row className='justify-content-center'>
                            <Col className='text-center' xs lg='12'>
                                <FontAwesomeIcon icon={faExclamationTriangle} size="6x" className='my-2 text-danger' />
                                <p>Seguro que desea eliminar estos datos?</p>
                            </Col>
                            <Col className='my-2'>
                                <Table bordered size='sm'>
                                    <thead className='bg-danger text-white'>
                                        <tr>
                                            <th>Razon Social</th>
                                            <th>CI/RIF </th>
                                            <th>Email</th>
                                            <th>Localizacion </th>
                                            <th>Telefono </th>
                                            <th>Mensualidad</th>
                                            <th>MB</th>
                                            <th>Direccion IP </th>
                                            <th>Serial </th>
                                            <th>Direccion MAC </th>
                                            <th>Servicio</th>
                                            <th>STATUS</th>
                                        </tr>
                                    </thead>
                                    <tbody className='text-center'>
                                        {selection.map((userData, index) => (
                                            <tr key={index}>
                                                <td>{userData.name}</td>
                                                <td>{userData.document} </td>
                                                <td>{userData.email}</td>
                                                <td>{userData.location} </td>
                                                <td>{userData.phone}</td>
                                                <td>{userData.mensuality}</td>
                                                <td>{userData.bandwidth}</td>
                                                <td>{userData.ip} </td>
                                                <td>{userData.serial}</td>
                                                <td>{userData.mac}</td>
                                                <td>{userData.service}</td>
                                                <td>{userData.status}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </Col>
                        </Row>
                        <Row className='text-center'>
                            <Col>
                                <Button variant='danger' type='submit' className='mx-2 rounded' onClick={handleClick} >Confirmar</Button>
                            </Col>
                        </Row>
                    </Container>
                </Modal.Body>
            </Modal>
        </Fragment>

    )

}

const mapStateToProps = state => (
    {
        selection: state.users.selected
    }
)

const mapDispatchToProps = dispatch => (
    {
        deleteUser: (data) => dispatch(removeUser(data))
    }
)

export default connect(mapStateToProps, mapDispatchToProps)(DeleteClients)