import React, { Fragment, useState } from 'react';
import { Button, Col, Form, Row, Modal } from 'react-bootstrap';
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { createOcupation } from '../../../ducks/rrhh';
import { connect } from 'react-redux';

const OcupationForm = ({isModal, createOcupation}) => {

    const [name, setName] = useState('')
    const [area, setArea] = useState('')
    const [gerency, setGerency] = useState('')

    const [showModal, setShowModal] = useState('')

    const [valid, setValid] = useState(false)

    const onSubmitOcupation = (e) => {
        e.preventDefault()
        let form = e.currentTarget
        if ( form.checkValidity() === false) {
            e.stopPropagation()
        } else {
            let newOcupation = {name, area, gerency}
            createOcupation(newOcupation)
            setName('')
            setArea('')
            setGerency('')
            setShowModal(false)
            console.log(newOcupation)
        }
        setValid(true)
    }


    const formOcupation = (
        <Form onSubmit={onSubmitOcupation} noValidate validated={valid}>
            <Form.Group as={Row}>
                <Form.Label required column sm lg={3}>Cargo</Form.Label>
                <Col sm lg={7}>
                    <Form.Control type='text' value={name} placeholder='Indique cargo...' onChange={({target}) => setName(target.value)} />
                    <Form.Text className='text-muted'>Campo obligatorio</Form.Text>
                </Col>
            </Form.Group>
            <Form.Group as={Row}>
                <Form.Label column sm lg={3}>Departamento</Form.Label>
                <Col sm lg={7}>
                    <Form.Control type='text' value={area} placeholder='Indique area..' onChange={({target}) => setArea(target.value)} />
                </Col>
            </Form.Group>
            <Form.Group as={Row}>
                <Form.Label column sm lg={3}>Gerencia</Form.Label>
                <Col sm lg={7}>
                    <Form.Control type='text' value={gerency} placeholder='Indique nivel del cargo..' onChange={({target}) => setGerency(target.value)} />
                </Col>
            </Form.Group>
            <Row>
                <Col className='text-center'>
                    <Button type='submit' variant='success' className='mr-2'>Crear</Button>
                    <Button variant='danger' onClick={()=>setShowModal(false)}>Cancelar</Button>
                </Col>
            </Row>
        </Form>
    )
    if(isModal) {
        return (
            <Fragment>
                <Button variant='primary' onClick={() => setShowModal(true)} className='my-2' ><FontAwesomeIcon icon={faPlusSquare} size='lg' className='mr-2' />Ocupacion</Button>
                <Modal show={showModal} onHide={() => setShowModal(false)} centered onExit={() => setValid(false)} >
                <Modal.Header closeButton className='bg-primary' >
                    <Modal.Title className='text-center w-100 text-white' >CREAR OCUPACION</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {formOcupation}
                </Modal.Body>
            </Modal>
            </Fragment>
            )
    } else return formOcupation
}

const MDTP = dispatch => (
    {
        createOcupation: (data)=> dispatch(createOcupation(data))
    }
)

export default connect(null, MDTP)(OcupationForm)