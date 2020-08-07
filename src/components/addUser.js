import React, {useState} from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';

export const FormUsers = ({addUser, handleClose}) => {

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
        handleClose()
    }

    return(
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
                                onChange={handleInputChange} />
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
                                onChange={handleInputChange} />
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
                                onChange={handleInputChange} />
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
                                onChange={handleInputChange} />
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
    )
}