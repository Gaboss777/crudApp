import React, {useState} from 'react';
import axios from 'axios';
import { Form, Row, Col, Button, Modal } from 'react-bootstrap';
import API from './api';

export const NewUser = ({addUser, handleClose, show}) => {

    const initialFormState = { id: null, name:'', lastName:'', idDocument:'', zoneLocation:''}

    const [user, setUser] = useState(initialFormState)

    const handleInputChange = event => {
        const {name, value} = event.target
        setUser({...user, [name]: value})
    }

    const handleSubmit = event => {
        event.preventDefault()
        if (!user.name || !user.lastName || !user.idDocument || !user.zoneLocation) return

        addUser(user)
        setUser(initialFormState)

        axios.post(`http://localhost:3000/usersData`, user)
        .then(response => {
            console.log(response.data);
        })
        .catch(err => console.log('Error', err))

        handleClose()
    }

    return(
        <Modal show={show} onHide={handleClose} >
            <Modal.Header closeButton >
                <Modal.Title>Nuevo Usuario</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit} >
                    <Row>
                        <Col>
                            <Form.Group as={Row} >
                                <Form.Label column sm='3' >Nombre</Form.Label>
                                <Col sm='9'>
                                    <Form.Control
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
                                <Form.Label column sm='3' >Apellido</Form.Label>
                                <Col sm='9'>
                                    <Form.Control
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
                                <Form.Label column sm='3' >CI/RIF</Form.Label>
                                <Col sm='9'>
                                    <Form.Control
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
                                <Form.Label column sm='3' >Zona</Form.Label>
                                <Col sm='9'>
                                    <Form.Control
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
                            <Button variant='outline-primary' type='submit' className='mx-2' >Agregar</Button>
                        </Col>
                        <Col xs lg='3'>
                            <Button variant='outline-danger' type='submit' onClick={handleClose} >Cerrar</Button>
                        </Col>
                    </Row>
                </Form>
            </Modal.Body>
        </Modal>
    )
}

export const EditUser = ({setEdit, userActual, updateUser, handleClose, show, setConfirm}) => {

    const [user, setUser] = useState(userActual)

    const handleInputChange = event => {
        const {name, value} = event.target

        setUser({...user, [name]: value})
    }

    const handleSubmit = event => {
        event.preventDefault()

        updateUser(user.id, user)

        API.put(`/${user.id}`, user)
            .then(response => {
                console.log(response.data)
            })

        handleClose()
    }

    return(
        <Modal show={show} onHide={handleClose}>
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
                            <Button
                                variant='outline-danger'
                                type='submit'
                                className='mx-2'
                                onClick={() => {
                                    setEdit(false)
                                    setConfirm(false)
                                    handleClose()
                                }} >Cancelar</Button>
                        </Col>
                    </Row>
                </Form>
            </Modal.Body>
        </Modal>
    )
}

export const DeleteUser =({handleClose, deleteUser, userActual, setConfirm, show, checkId})=>{

    const handleSubmit = event => {
        event.preventDefault()

        deleteUser(userActual.id)

        API.delete(`/${userActual.id}`)
            .then(response => {
                console.log(response.data)
            })

        checkId(userActual.id)
        handleClose()
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton >
                <Modal.Title>Desea borrar los siguientes datos?</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit} >
                    <Row>
                        <Col>
                            <Form.Group as={Row} >
                                <Form.Label column sm='4' >Nombre</Form.Label>
                                <Col sm='8'>
                                    <Form.Control
                                        type='text'
                                        name='name'
                                        value={userActual.name}
                                        readOnly />
                                </Col>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group as={Row} >
                                <Form.Label column sm='4' >Apellido</Form.Label>
                                <Col sm='8'>
                                    <Form.Control
                                        type='text'
                                        name='lastName'
                                        value={userActual.lastName}
                                        readOnly />
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
                                        type='number'
                                        name='idDocument'
                                        value={userActual.idDocument}
                                        readOnly />
                                </Col>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group as={Row} >
                                <Form.Label column sm='4' >Zona</Form.Label>
                                <Col sm='8'>
                                    <Form.Control
                                        type='text'
                                        name='zoneLocation'
                                        value={userActual.zoneLocation}
                                        readOnly />
                                </Col>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className='justify-content-center'>
                        <Col xs lg='3'>
                            <Button variant='outline-danger' type='submit' className='mx-2' >Eliminar</Button>
                        </Col>
                        <Col xs lg='3'>
                            <Button
                                variant='outline-dark'
                                type='submit'
                                className='mx-2'
                                onClick={() => {
                                    setConfirm(false)
                                    handleClose()
                                }} >Cancelar</Button>
                        </Col>
                    </Row>
                </Form>
            </Modal.Body>
        </Modal>
    )
}