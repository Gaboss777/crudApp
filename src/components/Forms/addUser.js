import React, {useState} from 'react';
import {connect} from 'react-redux';
import { Form, Row, Col, Button, Modal } from 'react-bootstrap';
import { createUser}  from '../../ducks/users';
import { uuid } from 'uuidv4'

const NewUser = ({addUser, handleClose, show}) => {

    const initialFormState = { id: uuid(), razonSocial: '', Estado:'', idDocument: '', zoneLocation:'', services: '' }
    const [user, setUser] = useState(initialFormState)

    const handleInputChange = event => {
        const {name, value} = event.target
        setUser({...user, [name]: value})
    }

    const handleSubmit = event => {
        event.preventDefault()

        addUser(user)
        setUser(initialFormState)
        handleClose()
    }

    return(
        <Modal show={show} onHide={handleClose} centered size='lg'>
            <Modal.Header className='bg-primary' >
                <Modal.Title className='text-center w-100 text-white' >Nuevo Usuario</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit} >
                            <Form.Group as={Row} >
                                <Form.Label column sm='4' className='font-weight-bold text-uppercase' >Razon Social</Form.Label>
                                <Col sm='8'>
                                    <Form.Control
                                        required
                                        type='text'
                                        name='razonSocial'
                                        placeholder='Ingrese Nombre'
                                        value={user.name}
                                        onChange={handleInputChange}
                                        />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} >
                                <Form.Label column sm='4' className='font-weight-bold text-uppercase' >Servicio</Form.Label>
                                <Col sm='8'>
                                    <Form.Control
                                        required
                                        type='text'
                                        name='services'
                                        placeholder='Tipo de Servicio'
                                        value={user.services}
                                        onChange={handleInputChange}
                                        />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} >
                                <Form.Label column sm='4' className='font-weight-bold text-uppercase' >CI/RIF</Form.Label>
                                <Col sm='8'>
                                    <Form.Control
                                        required
                                        type='text'
                                        name='idDocument'
                                        placeholder='Ingrese Cedula o RIF'
                                        value={user.idDocument}
                                        onChange={handleInputChange}
                                        />
                                </Col>
                            </Form.Group>
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
                            <Form.Group as={Row} >
                                <Form.Label column sm='4' className='font-weight-bold text-uppercase' >MB</Form.Label>
                                <Col sm='8'>
                                    <Form.Control
                                        required
                                        type='text'
                                        name='MB'
                                        placeholder='MB'
                                        value={user.MB}
                                        onChange={handleInputChange}
                                        />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} >
                                <Form.Label column sm='4' className='font-weight-bold text-uppercase' >Estado</Form.Label>
                                <Col sm='8'>
                                    <Form.Control
                                        required
                                        type='text'
                                        name='Estado'
                                        placeholder='Estado actual'
                                        value={user.Estado}
                                        onChange={handleInputChange}
                                        />
                                </Col>
                            </Form.Group> 
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

const mapDispatchToProps = dispatch => (
    {
        addUser: (data) => dispatch(createUser(data))
    }
)

export default connect(null, mapDispatchToProps)(NewUser)