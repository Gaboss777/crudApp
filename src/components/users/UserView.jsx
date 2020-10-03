import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { Badge, Button, Modal, Col, Container, Row, Card } from 'react-bootstrap';


const UserView = ({ user, selection }) => {

    const [showModal, setShowModal] = useState(false);

    return(
        <Fragment>
            <Button disabled={selection.length !== 1 ? true : false} variant='warning' onClick={() => setShowModal(true)}><FontAwesomeIcon icon={faInfoCircle} size='lg' /></Button>
            <Modal show={showModal} onHide={() => setShowModal(false)} centered size='lg'  >
            { user &&
            <Fragment>
                <Modal.Header closeButton >
                    <Modal.Title className='text-dark text-center w-100'>INFORMACION</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container fluid >
                        <Row>
                            <Col sm lg={6} >
                                <Card border='warning' >
                                    <Card.Header as='h4' className='bg-warning text-center text-dark'>DATOS DEL CLIENTE</Card.Header>
                                    <Card.Body>
                                        <Card.Text>
                                            <p><span className='font-weight-bold text-warning'>RAZON SOCIAL: </span> {user.name} </p>
                                            <p><span className='font-weight-bold text-warning'>CI / RIF: </span> {user.document} </p>
                                            <p><span className='font-weight-bold text-warning'>UBICACION: </span> {user.location} </p>
                                            <p><span className='font-weight-bold text-warning'>EMAIL: </span> {user.email} </p>
                                            <p><span className='font-weight-bold text-warning'>TELEFONO: </span> {user.phone} </p>
                                            <p><span className='font-weight-bold text-warning'>STATUS: </span> <Badge variant={user.status === 'Activo' ? 'success' : user.status === 'Cancelado' ? 'danger' : 'warning' }>{user.status.toUpperCase()}</Badge> </p>
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col sm lg={6} >
                                <Card border='warning'>
                                    <Card.Header as='h4' className='bg-warning text-center text-dark'>DATOS DEL PLAN</Card.Header>
                                    <Card.Body>
                                        <Card.Text>
                                            <p><span className='font-weight-bold text-warning'>BANDWIDTH: </span> {user.bandwidth} Mb</p>
                                            <p><span className='font-weight-bold text-warning'>DIRECCION IP: </span> {user.ip}</p>
                                            <p><span className='font-weight-bold text-warning'>SERIAL: </span> {user.serial}</p>
                                            <p><span className='font-weight-bold text-warning'>DIRECCION MAC: </span> {user.mac}</p>
                                            <p><span className='font-weight-bold text-warning'>SERVICIO: </span> {user.service}</p>
                                            <p><span className='font-weight-bold text-warning'>MENSUALIDAD: </span> {user.mensuality} USD </p>
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

export default connect(MSTP, null)(UserView)