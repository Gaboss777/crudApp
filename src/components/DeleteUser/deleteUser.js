import React, { Fragment,  useState } from 'react';
import { connect } from 'react-redux';
import {Button, Modal, Row, Col, Table, Container} from 'react-bootstrap';
import { removeUser } from '../../ducks/users';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';


const DeleteUser = ({ selection,deleteUser }) => {
    const [show, setShow] = useState(false);

    const handleClick=()=>{
        deleteUser(selection)
    }
    return (
        <Fragment>
            <Button disabled={selection.length===0} variant='warning'  onClick={() => setShow(true)}><FontAwesomeIcon icon={faTrashAlt} size='lg' /></Button>
            <Modal show={show} onHide={() => setShow(false)} centered size='lg' >
                <Modal.Header closeButton >
                    <Modal.Title className='text-center w-100 text-white' >Test Title</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container >
                        <Row className='justify-content-center'>
                            <Col className='text-center' xs lg='12'>
                                <FontAwesomeIcon icon={faExclamationTriangle} size="6x" className='my-2 text-danger' />
                                <p>Seguro que desea eliminar estos datos?</p>
                               
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
                                        {selection.map((userData, index) => (
                                            <tr key={index}>
                                                <td>{userData.name}</td>
                                                <td>{userData.document} </td>
                                                <td>{userData.location} </td>
                                                <td>{userData.bandwidth}</td>
                                                <td>{userData.ip} </td>
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
                                <Button variant='danger' type='submit' className='mx-2' onClick={handleClick} >Confirmar</Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(DeleteUser)