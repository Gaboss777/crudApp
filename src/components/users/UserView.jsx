import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { Badge, Button, Modal, Col, Container, Row, Card } from 'react-bootstrap';


const UserInfo = ({ user, selection }) => {

    const [showModal, setShowModal] = useState(false);

    return(
        <Fragment>
            <Button disabled={selection.length !== 1 ? true : false} variant='warning' onClick={() => setShowModal(true)}><FontAwesomeIcon icon={faInfoCircle} size='lg' /></Button>
            <Modal show={showModal} onHide={() => setShowModal(false)} centered size='lg'  >
            { user &&
            <Fragment>
                <Modal.Header closeButton className='bg-dark' >
                    <Modal.Title className='text-white text-center w-100'>INFORMACION</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container fluid >
                        <Row>
                            <Col sm lg={6} >
                                <Card border='dark' >
                                    <Card.Header as='h4' className='bg-dark text-center text-white'>DATOS DEL CLIENTE</Card.Header>
                                    <Card.Body>
                                        <Card.Text>
                                            <p><span className='font-weight-bold text-dark'>RAZON SOCIAL: </span> {user.name} </p>
                                            <p><span className='font-weight-bold text-dark'>CI / RIF: </span> {user.document} </p>
                                            <p><span className='font-weight-bold text-dark'>UBICACION: </span> {user.location} </p>
                                            <p><span className='font-weight-bold text-dark'>EMAIL: </span> {user.email} </p>
                                            <p><span className='font-weight-bold text-dark'>TELEFONO: </span> {user.phone} </p>
                                            <p><span className='font-weight-bold text-dark'>STATUS: </span> <Badge variant={user.status === 'Activo' ? 'success' : user.status === 'Cancelado' ? 'danger' : 'warning' }>{user.status.toUpperCase()}</Badge> </p>
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col sm lg={6} >
                                <Card border='dark'>
                                    <Card.Header as='h4' className='bg-dark text-center text-white'>DATOS DEL PLAN</Card.Header>
                                    <Card.Body>
                                        <Card.Text>
                                            <p><span className='font-weight-bold text-dark'>BANDWIDTH: </span> {user.bandwidth} Mb</p>
                                            <p><span className='font-weight-bold text-dark'>DIRECCION IP: </span> {user.ip}</p>
                                            <p><span className='font-weight-bold text-dark'>SERIAL: </span> {user.serial}</p>
                                            <p><span className='font-weight-bold text-dark'>DIRECCION MAC: </span> {user.mac}</p>
                                            <p><span className='font-weight-bold text-dark'>SERVICIO: </span> {user.service}</p>
                                            <p><span className='font-weight-bold text-dark'>MENSUALIDAD: </span> {user.mensuality} USD </p>
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                </Modal.Body>
            </Fragment>
            }
            </Modal>
        </Fragment>
    )
}

const MSTP = state => (
    {
        user: state.users.selected[0],
        selection: state.users.selected
    }
)

export default connect(MSTP, null)(UserInfo)