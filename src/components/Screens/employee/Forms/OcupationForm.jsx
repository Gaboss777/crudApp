import React, { Fragment, useEffect, useState } from 'react';
import { Button, Col, Form, Row, Modal } from 'react-bootstrap';
import { faPlusSquare, faUserEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { createOcupation } from '../../../../ducks/rrhhReducer';
import { connect } from 'react-redux';
import Alerts from '../../../Utils/Alerts/alerts';

const OcupationForm = ({isModal, createOcupation, edit, occupation, updateOcupation}) => {

    const [name, setName] = useState('')
    const [gerency, setGerency] = useState('')

    const [showModal, setShowModal] = useState('')

    const [valid, setValid] = useState(false)

    const onSubmitOcupation = (e) => {
        e.preventDefault()
        let form = e.currentTarget
        if ( form.checkValidity() === false) {
            e.stopPropagation()
        } else {
            let newOcupation = {name, gerency}
            if(edit && occupation){
                updateOcupation({...newOcupation, id: occupation.id})
                Alerts.InfoNotify('CARGO ACTUALZIADO')
            } else {
                createOcupation(newOcupation)
                Alerts.InfoNotify("CARGO CREADO")
            }
            setName('')
            setGerency('')
            setShowModal(false)
        }
        setValid(true)
    }

    useEffect(() => {
        if(edit && occupation){
            setName(occupation.name)
            setGerency(occupation.gerency)
        }
    },[edit, occupation])

    const formOcupation = (
        <Form onSubmit={onSubmitOcupation} noValidate validated={valid}>
            <Form.Group>
                <Form.Label className='font-weight-bold text-uppercase'>Cargo</Form.Label>
                    <Form.Control type='text' value={name} placeholder='Indique cargo...' onChange={({target}) => setName(target.value)} />
                    <Form.Text className='text-muted'>Campo obligatorio</Form.Text>
            </Form.Group>
            <Form.Group>
                <Form.Label className='font-weight-bold text-uppercase'>Gerencia</Form.Label>
                    <Form.Control type='text' value={gerency} placeholder='Indique nivel del cargo..' onChange={({target}) => setGerency(target.value)} />
            </Form.Group>
            <Row>
                <Col className='text-center'>
                    <Button type='submit' variant='success' className='mr-2 rounded'>CREAR</Button>
                    <Button variant='danger' className='rounded' onClick={()=>setShowModal(false)}>CANCELAR</Button>
                </Col>
            </Row>
        </Form>
    )
    if(isModal) {
        return (
            <Fragment>
                <Button variant='primary' size={edit ? 'sm' : ''} onClick={() => setShowModal(true)} className={edit ? '' : 'rounded-left'} >{edit ? <FontAwesomeIcon icon={faUserEdit} /> : <FontAwesomeIcon icon={faPlusSquare} /> }</Button>
                <Modal show={showModal} onHide={() => setShowModal(false)} centered onExit={() => setValid(false)} size='sm' >
                    <Modal.Header closeButton className='bg-primary' >
                        <Modal.Title className='text-center w-100 text-white font-weight-bold' >{edit ? 'EDITAR' : 'CREAR'} CARGO</Modal.Title>
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