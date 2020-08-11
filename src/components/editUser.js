import React, {useState} from 'react';
import { Form, Row, Col, Button, Modal } from 'react-bootstrap';

export const EditUser = ({ userActual, updateUser, handleClose, show}) => {

    const [user, setUser] = useState(userActual)

    const handleInputChange = event => {
        const {name, value} = event.target
        setUser({...user, [name]: value})
    }

    const handleSubmit = (event) => {
        event.preventDefault()

        updateUser(userActual.id, user)
    }

    return(
        <Modal show={show} onHide={handleClose} centered animation='fade'>
            <Modal.Header closeButton >
                <Modal.Title>Editar Datos</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit} >
                    <Row>
                        <Col>
                            <Form.Group as={Row} >
                                <Form.Label column sm='4' >Nombre</Form.Label>
                                <Col sm='8'>
                                    <Form.Control
                                        required
                                        type='text'
                                        name='name'
                                        placeholder='Ingrese Nombre'
                                        value={user.name}
                                        onChange={handleInputChange}
                                        />
                                </Col>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group as={Row} >
                                <Form.Label column sm='4' >Apellido</Form.Label>
                                <Col sm='8'>
                                    <Form.Control
                                        required
                                        type='text'
                                        name='lastName'
                                        placeholder='Ingrese Apellido'
                                        value={user.lastName}
                                        onChange={handleInputChange}
                                        />
                                </Col>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group as={Row} >
                                <Form.Label column sm='4' >CI/RIF</Form.Label>
                                <Col sm='8'>
                                    <Form.Control
                                        required
                                        type='number'
                                        name='idDocument'
                                        placeholder='Ingrese Cedula o RIF'
                                        value={user.idDocument}
                                        onChange={handleInputChange}
                                        />
                                </Col>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group as={Row} >
                                <Form.Label column sm='4' >Zona</Form.Label>
                                <Col sm='8'>
                                    <Form.Control
                                        required
                                        type='text'
                                        name='zoneLocation'
                                        placeholder='Zona donde Vive'
                                        value={user.zoneLocation}
                                        onChange={handleInputChange}
                                        />
                                </Col>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className='justify-content-center'>
                        <Col xs lg='3'>
                            <Button variant='outline-success' type='submit' className='mx-2' >Actualizar</Button>
                        </Col>
                        <Col xs lg='3'>
                            <Button variant='outline-danger' type='submit' className='mx-2' onClick={handleClose} >Cancelar</Button>
                        </Col>
                    </Row>
                </Form>
            </Modal.Body>
        </Modal>
    )
}