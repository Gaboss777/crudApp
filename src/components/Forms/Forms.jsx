import React from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
/* 
* Por que este archivo se llama forms si tiene 1 solo form?
* Also, deberias usar UserForm en lugar de FormUser, es mas legible (en realidad no afecta solo q es mas legible asi)
*/
const FormUser = ( props ) => {
    return(
        <Form onSubmit={props.handleSubmit} >
            <Form.Group >
                <Form.Label className='font-weight-bold text-uppercase' >Razon Social</Form.Label>
                <Form.Control
                    required
                    type='text'
                    name='razonSocial'
                    placeholder='Ingrese Nombre'
                    value={props.user.razonSocial}
                    onChange={props.handleInputChange}
                    />
            </Form.Group>
            <Form.Row>
                <Form.Group as={Col} >
                <Form.Label className='font-weight-bold text-uppercase' >CI/RIF</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        name='idDocument'
                        placeholder='Ingrese Cedula o RIF'
                        value={props.user.idDocument}
                        onChange={props.handleInputChange}
                        />
                </Form.Group>
                <Form.Group as={Col} >
                    <Form.Label className='font-weight-bold text-uppercase' >Ubicacion</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        name='zoneLocation'
                        placeholder='Zona donde Vive'
                        value={props.user.zoneLocation}
                        onChange={props.handleInputChange}
                        />
                </Form.Group>
            </Form.Row>
            <Form.Row>
                <Form.Group as={Col} >
                    <Form.Label className='font-weight-bold text-uppercase' >Bandwidth</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        name='bandwidth'
                        placeholder='bandwidth'
                        value={props.user.bandwidth}
                        onChange={props.handleInputChange}
                        />
                </Form.Group>
                <Form.Group as={Col} >
                    <Form.Label className='font-weight-bold text-uppercase' >Direccion IP</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        name='ipAddress'
                        placeholder='ipAddress'
                        value={props.user.ipAddress}
                        onChange={props.handleInputChange}
                        />
                </Form.Group>
            </Form.Row>
            <Form.Row>
                <Form.Group as={Col} >
                    <Form.Label className='font-weight-bold text-uppercase' >Servicio</Form.Label>
                    <Form.Control as='select' value={props.user.services} onChange={props.handleInputChange} name='services' >
                        <option>Elija un Servicio</option>
                        <option value='Residencial' >Residencial</option>
                        <option value='PYMES' >PYMES</option>
                        <option value='Dedicado '>Dedicado</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group as={Col} >
                    <Form.Label className='font-weight-bold text-uppercase' >Estado</Form.Label>
                    <Form.Control as='select' value={props.user.Estado} onChange={props.handleInputChange} name='Estado' >
                        <option>Elija un Estado</option>
                        <option value='Activo' >Activo</option>
                        <option value='Cancelado' >Cancelado</option>
                        <option value='Suspendido' >Suspendido</option>
                    </Form.Control>
                </Form.Group>
            </Form.Row>
            <Row className='text-center'>
                <Col>
                    <Button variant={props.variantBtn} type='submit' >{props.textSubmit}</Button>
                </Col>
            </Row>
        </Form>
    )
}

export default FormUser