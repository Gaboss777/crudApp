import { faPlusSquare } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { Button, Col, Form, Modal, Row } from 'react-bootstrap'

const RolesForm = ({registerRole, isModal}) => {

    const [name, setName] = useState('')
    const [showModal, setShowModal] = useState(false)
    const [valid, setValid] = useState(false)

    const onSubmit = (e) => {
        e.preventDefault()
        let form = e.currentTarget
        if(form.checkValidity() === false ){
            e.stopPropagation()
        } else {
            registerRole({name})
            setShowModal(false)
            setName('')
        }
        setValid(true)
    }

    const form = (
        <Form onSubmit={onSubmit} validated={valid} noValidate >
            <Form.Row>
                <Form.Group as={Col}>
                    <Form.Label>NOMBRE</Form.Label>
                    <Form.Control required type='text' value={name} onChange={({target}) => setName(target.value)} />
                </Form.Group>
            </Form.Row>
            <Row>
                <Col className='text-center'>
                    <Button variant='success' type='submit'>CREAR</Button>
                    <Button variant='danger' onClick={() => setShowModal(false)} className='ml-2' >CANCELAR</Button>
                </Col>
            </Row>
        </Form>
    )

    if(isModal){
        return (
        <>
            <Button variant='primary' onClick={() => setShowModal(true)} ><FontAwesomeIcon icon={faPlusSquare} className='mr-2' /> Role</Button>
            <Modal onHide={() => setShowModal(false)} show={showModal} centered >
                <Modal.Header closeButton className='bg-primary'>
                    <Modal.Title className='text-center w-100 text-white'>CREAR ROLE</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {form}
                </Modal.Body>
            </Modal>
        </>
        )
    } else return form
}

export default RolesForm