import React from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { AddUser } from '../helpers/funcionesCrud';

export const FormUsers = ({addUser}) => {

    const { user, handleInputChange, handleSubmit } = AddUser({addUser});
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
            <Button variant='primary' size='lg' type='submit'>Agregar</Button>
        </Form>
    )
}