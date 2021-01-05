import { faExclamationTriangle, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { Button, Modal, Row, Table, Container, Col } from 'react-bootstrap'

const DeleteAccount = ({selected, removeAccount}) => {

    const [showModal, setShowModal] = useState(false)

    const handleClick = () => {
        selected.map(x => removeAccount(x.id))
        // removeAccount(id)
        setShowModal(false)
    }

    return (
        <>
            <Button disabled={selected.length === 0} variant='danger' onClick={() => setShowModal(true)}><FontAwesomeIcon icon={faTrashAlt} /></Button>
            <Modal show={showModal} onHide={() => setShowModal(false)} centered size='lg' >
                <Modal.Header className='bg-danger' closeButton>
                    <Modal.Title className='w-100 text-center text-white'>ELIMINAR CUENTAS</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container fluid>
                        <Row className='justify-content-center'>
                            <Col sm lg={12} className='text-center'>
                                <FontAwesomeIcon icon={faExclamationTriangle} size='6x' className='my-2 text-danger' />
                                <p>Seguro que desea eliminar estos datos?</p>
                            </Col>
                            <Col className='my-2'>
                                <Table>
                                    <thead className='bg-danger text-white'>
                                        <tr>
                                            <th>ID</th>
                                            <th>USERNAME</th>
                                            <th>ASIGNADO A</th>
                                            <th>NIVEL DE PERMISO</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {selected.map(select =>
                                        <tr>
                                            <td>{select.id}</td>
                                            <td>{select.username}</td>
                                            <td>{select.user}</td>
                                            <td>{select.role}</td>
                                        </tr>
                                    )}
                                    </tbody>
                                </Table>
                            </Col>
                            <Col sm lg={12} className='text-center'>
                                <Button variant='danger' onClick={handleClick}>Eliminar</Button>
                            </Col>
                        </Row>
                    </Container>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default DeleteAccount