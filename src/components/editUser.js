import React, {useState, useEffect} from 'react';
import {Form, Col, Row, Button} from 'react-bootstrap';

export const EditForm = ({setEdit, userActual, updateUser}) => {

    const [user, setUser] = useState(userActual)

    useEffect(() => {
        setUser(userActual)
    }, [] )

    const handleInputChange = event => {
        const {name, value} = event.target
        setUser({...user, [name]: value})
    }

    const handleSubmit = ({event}) => {
        event.preventDefault()
        updateUser(user.id, user)
    }

    return(
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
                                onChange={handleInputChange} />
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
                                onChange={handleInputChange} />
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
                                onChange={handleInputChange} />
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
                                onChange={handleInputChange} />
                        </Col>
                    </Form.Group>
                </Col>
            </Row>
            <Button variant='outline-primary' size='lg' type='submit' className='mx-2' >Editar</Button>
            <Button variant='outline-danger' size='lg' type='submit' onClick={() => setEdit(false)} >Cancelar</Button>
        </Form>
    )
}