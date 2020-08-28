import React, {useState} from 'react';
import Calls from '../../axios-common/callaxios';
import { Form, Row, Col, Button, Modal } from 'react-bootstrap';

export const NewUser = ({addUser, handleClose, show}) => {

    const initialFormState = { id: null, name:'', lastName:'', idDocument: '', zoneLocation:''}
    const [user, setUser] = useState(initialFormState)

    const handleInputChange = event => {
        const {name, value} = event.target
        setUser({...user, [name]: value})
    }

    const handleSubmit = event => {
        event.preventDefault()

        addUser(user)
        Calls.createApi(user)

        setUser(initialFormState)
    }

    return(
        <Modal show={show} onHide={handleClose} centered size='lg'>
            <Modal.Header className='bg-primary' >
                <Modal.Title className='text-center w-100 text-white' >Nuevo Usuario</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit} >
                    <Row>
                        <Col>
                            <Form.Group as={Row} >
                                <Form.Label column sm='4' className='font-weight-bold text-uppercase' >Nombre</Form.Label>
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
                                <Form.Label column sm='4' className='font-weight-bold text-uppercase' >Apellido</Form.Label>
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
                                <Form.Label column sm='4' className='font-weight-bold text-uppercase' >CI/RIF</Form.Label>
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
                                <Form.Label column sm='4' className='font-weight-bold text-uppercase' >Zona</Form.Label>
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
                    <Row className='text-center'>
                        <Col>
                            <Button variant='outline-primary' type='submit' className='mx-2' >Agregar</Button>
                            <Button variant='outline-danger' type='submit' onClick={handleClose} >Cerrar</Button>
                        </Col>
                    </Row>
                </Form>
            </Modal.Body>
        </Modal>
    )
}