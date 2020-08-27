import React, {useState} from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';

const UserForm = ({handleEvent, variantBtn, textSubmit, data}) => {

    const [razonSocial, setRazonSocial] = useState(data.razonSocial)
    const [idDocument, setIdDocument] = useState(data.idDocument)
    const [zoneLocation, setZoneLocation] = useState(data.zoneLocation)
    const [bandwidth, setBandwidth] = useState(data.bandwidth)
    const [estado, setEstado] = useState(data.estado)
    const [services, setServices] = useState(data.services)
    const [ipAddress, setIpAddress] = useState(data.ipAddress)

    const handleSubmit = (event) => {
        event.preventDefault()
        let info = { razonSocial, idDocument, zoneLocation, bandwidth, estado, services, ipAddress }
        handleEvent(info)
    }

    return(
        <Form onSubmit={handleSubmit}>
            <Form.Group >
                <Form.Label className='font-weight-bold text-uppercase' >Razon Social</Form.Label>
                <Form.Control
                    required
                    type='text'
                    name='razonSocial'
                    placeholder='Ingrese Nombre'
                    value={razonSocial}
                    onChange={({target}) => setRazonSocial(target.value)}
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
                        value={idDocument}
                        onChange={({target}) => setIdDocument(target.value)}
                        />
                </Form.Group>
                <Form.Group as={Col} >
                    <Form.Label className='font-weight-bold text-uppercase' >Ubicacion</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        name='zoneLocation'
                        placeholder='Zona donde Vive'
                        value={zoneLocation}
                        onChange={({target}) => setZoneLocation(target.value)}
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
                        value={bandwidth}
                        onChange={({target}) => setBandwidth(target.value)}
                        />
                </Form.Group>
                <Form.Group as={Col} >
                    <Form.Label className='font-weight-bold text-uppercase' >Direccion IP</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        name='ipAddress'
                        placeholder='ipAddress'
                        value={ipAddress}
                        onChange={({target}) => setIpAddress(target.value)}
                        />
                </Form.Group>
            </Form.Row>
            <Form.Row>
                <Form.Group as={Col} >
                    <Form.Label className='font-weight-bold text-uppercase' >Servicio</Form.Label>
                    <Form.Control as='select' value={services} onChange={({target}) => setServices(target.value)} name='services' >
                        <option>Elija un Servicio</option>
                        <option value='Residencial' >Residencial</option>
                        <option value='PYMES' >PYMES</option>
                        <option value='Dedicado '>Dedicado</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group as={Col} >
                    <Form.Label className='font-weight-bold text-uppercase' >Estado</Form.Label>
                    <Form.Control as='select' value={estado} onChange={({target}) => setEstado(target.value)} name='Estado' >
                        <option>Elija un Estado</option>
                        <option value='Activo' >Activo</option>
                        <option value='Cancelado' >Cancelado</option>
                        <option value='Suspendido' >Suspendido</option>
                    </Form.Control>
                </Form.Group>
            </Form.Row>
            <Row className='text-center'>
                <Col>
                    <Button variant={variantBtn} type='submit' >{textSubmit}</Button>
                </Col>
            </Row>
        </Form>
    )
}

export default UserForm