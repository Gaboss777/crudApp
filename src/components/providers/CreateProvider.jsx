import React, { useState, Fragment } from 'react'
import { Button, Form, Row, Modal, Col } from 'react-bootstrap'

import { faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Alerts from '../Alerts/alerts'

const NewProvider = ({isModal, createProvider}) => {

    const [name, setName] = useState('')
    const [service, setService] = useState('')

    const [showModal, setShowModal] = useState(false)
    const [valid, setValid] = useState(false)

    const onSubmitProvider = (event) => {
        event.preventDefault()
        let form = event.currentTarget
        if(form.checkValidity() === false ) {
            event.stopPropagation()
        } else {
            let newProvider = {name, service}
            createProvider(newProvider)
            Alerts.InfoNotify('PROVEEDOR CREADO CON EXITO')
            setName('')
            setService('')
            setShowModal(false)
        }
        setValid(true)
    }

    const providerForm = (
        <Form onSubmit={onSubmitProvider} noValidate validated={valid}>
            <Form.Group>
                <Form.Label className='font-weight-bold text-uppercase'>NOMBRE: </Form.Label>
                <Form.Control required type='text' value={name} placeholder='Indique nombre...' onChange={({target}) => setName(target.value)} />
                <Form.Text className='text-muted'>Campo obligatorio</Form.Text>
            </Form.Group>
            <Form.Group>
                <Form.Label className='font-weight-bold text-uppercase'>SERVICIO: </Form.Label>
                <Form.Control type='text' value={service} placeholder='Indique Servicio' onChange={({target}) => setService(target.value)} />
            </Form.Group>
            <Row>
                <Col className='text-center'>
                    <Button type='submit' variant='success' className='mr-2'>Crear</Button>
                    <Button type='submit' variant='danger' onClick={() => setShowModal(false)}>Cancelar</Button>
                </Col>
            </Row>
        </Form>
    )

    if(isModal) {
        return(
            <Fragment>
                <Button variant='primary' onClick={() => setShowModal(true)} className='my-2'  ><FontAwesomeIcon icon={faPlusSquare} size='lg' /></Button>
                <Modal show={showModal} onHide={() => setShowModal(false)} centered size='sm'  >
                    <Modal.Header closeButton className='bg-primary border border-primary' >
                        <Modal.Title className='text-center w-100 text-white' >Crear Proveedor</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className='border border-primary'>
                        {providerForm}
                    </Modal.Body>
                </Modal>
            </Fragment>
            )
    } else return providerForm
}

export default NewProvider