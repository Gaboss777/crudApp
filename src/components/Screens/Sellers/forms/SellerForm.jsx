import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import Alerts from '../../../Utils/Alerts/alerts'

const SellerForm = ({isModal, createSeller, textBtn, user, editing, sizeBtn, updateSellUser}) => {

    const [firstname, setFirstname] = useState(user ? user.firstname : '')
    const [secondname, setSecondname] = useState(user ? user.secondname : '')
    const [lastname, setLastname] = useState(user ? user.lastname : '')
    const [secondsurname, setSecondsurname] = useState(user ? user.secondsurname : '')
    const [document, setDocument] = useState(user ? user.document : '')
    const [date, setDate] = useState(user ? user.date : '')

    const [show, setShow] = useState(false)

    useEffect(() => {
        if(user & editing){
            setFirstname(user.firstname)
            setSecondname(user.secondname)
            setLastname(user.lastname)
            setSecondsurname(user.secondsurname)
            setDate(user.date)
            setDocument(user.document)
        }
    }, [user, editing])

    const handleSubmit = (e) => {
        e.preventDefault()
        let newSeller = {firstname, secondname, lastname, secondsurname, document, date}
        if(!user){
            createSeller(newSeller)
            Alerts.InfoNotify('VENDEDOR CREADO CON EXITO')
        } else {
            updateSellUser(newSeller)
            Alerts.EditNotify('DATOS ACTUALIZADOS')
        }
        setFirstname('')
        setSecondname('')
        setLastname('')
        setSecondsurname('')
        setDocument('')
        setDate('')
    }

    const form = (
        <Form onSubmit={handleSubmit}>
        <Form.Row>
            <Form.Group as={Col} controlId='validation01'>
                <Form.Label className='font-weight-bold text-uppercase'>Primer Nombre *</Form.Label>
                <Form.Control required type='text' value={firstname} placeholder='Indique Primer nombre...' onChange={({target}) => setFirstname(target.value)} />
                <Form.Text className='text-muted'>Campo obligatorio</Form.Text>
            </Form.Group>
            <Form.Group as={Col} >
                <Form.Label className='font-weight-bold text-uppercase'>Segundo Nombre</Form.Label>
                <Form.Control type='text' value={secondname} placeholder='Indique Segundo nombre...' onChange={({target}) => setSecondname(target.value)} />
            </Form.Group>
        </Form.Row>
        <Form.Row>
            <Form.Group as={Col} controlId='validation02'>
                <Form.Label className='font-weight-bold text-uppercase'>Primer Apellido *</Form.Label>
                <Form.Control required type='text' value={lastname} placeholder='Ingrese Primer apellido..' onChange={({target}) => setLastname(target.value)} />
                <Form.Text className='text-muted'>Campo obligatorio</Form.Text>
            </Form.Group>
            <Form.Group as={Col}>
                <Form.Label className='font-weight-bold text-uppercase'>Segundo Apellido</Form.Label>
                <Form.Control type='text' value={secondsurname} placeholder='Indique Segundo nombre...' onChange={({target}) => setSecondsurname(target.value)} />
            </Form.Group>
        </Form.Row>
        <Form.Row>
            <Form.Group as={Col}>
                <Form.Label className='font-weight-bold text-uppercase'>Cedula</Form.Label>
                <Form.Control required type='number' value={document} onChange={({target}) => setDocument(target.valueAsNumber)} />
                <Form.Text className='text-muted'>Campo obligatorio</Form.Text>
            </Form.Group>
            <Form.Group as={Col}>
                <Form.Label className='font-weight-bold text-uppercase'>Fecha de Ingreso</Form.Label>
                <Form.Control type='date' value={date} onChange={({target}) => setDate(target.value)} />
            </Form.Group>
        </Form.Row>
            <Row>
                <Col className='text-center'>
                    <Button variant='success' type='submit' onClick={() => setShow(false)} className='mr-2'>{editing ? 'EDITAR' : 'AGREGAR'}</Button>
                    <Button variant='danger' onClick={() => setShow(false)} >CANCELAR</Button>
                </Col>
            </Row>
        </Form>
    )

    if(isModal){
        return (
            <>
                <Button variant='primary' onClick={() => setShow(true)} size={sizeBtn}>{textBtn}</Button>
                <Modal show={show} onHide={() => setShow(false)} centered >
                    <Modal.Header closeButton className='bg-primary' >
                        <Modal.Title className='text-center w-100 text-white' >{editing ? 'EDITAR VENDEDOR' : 'CREAR VENDEDOR'}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {form}
                    </Modal.Body>
                </Modal>
            </>
        )
    }
    else return form

}

export default SellerForm