import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//import librerias
import React, { useState, Fragment } from 'react';
import { Row, Col, Form, Button, Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import { createBill, createProvider } from '../../ducks/provider';
import Alerts from '../Alerts/alerts';

//crear componente
const PaymentForm = ({ providers, createBill, isModal, createProvider }) => {
    const [provider, setProvider] = useState('')
    const [billNumber, setBillNumber] = useState('')
    const [amount, setAmount] = useState('')
    const [date, setDate] = useState('')
    const [comment, setComment] = useState('')
    const [addProvider, setAddProvider] = useState(false)

    const [name, setName] = useState('')
    const [service, setService] = useState('')

    const [showModal, setShowModal] = useState(false)

    const newProvider = () => {
        if(name === '' && service === '') {
            Alerts.NoFoundNotify('INGRESE UN PROVEEDOR')
        } else {
        let newProvider = {name, service}
        createProvider(newProvider)
        setAddProvider(false)
        }
        setName('')
        setService('')
    }

    const onSubmit = (event) => {
        event.preventDefault()
        let newBill = {provider, billNumber, amount, date, comment}
        createBill(newBill)
        setProvider('')
        setBillNumber('')
        setAmount('')
        setDate('')
        setComment('')
        setAddProvider(false)
    }

    console.log(addProvider)
    console.log(name)

    const providerform = (
        <Form onSubmit={onSubmit}>
        { addProvider ?
        <>
            <Form.Group as={Row}>
                <Form.Label column sm lg={3} >Nombre: </Form.Label>
                <Col sm lg={7}>
                    <Form.Control required type='text' value={name} placeholder='Ingrese Proveedor' onChange={({target}) => setName(target.value)} />
                </Col>
            </Form.Group>
            <Form.Group as={Row} >
                <Form.Label column sm lg={3} >Servicio: </Form.Label>
                <Col sm lg={7}>
                    <Form.Control required type='text' value={service} placeholder='Area de Servicio' onChange={({target}) => setService(target.value)} />
                </Col>
            </Form.Group>
            <Row>
                <Col className='text-center'>
                    <Button  variant='success' onClick={() => newProvider()} >Crear</Button>
                    <Button variant='danger' onClick={() => setAddProvider(false)} className='ml-2'>Cancelar</Button>
                </Col>
            </Row>
        </>
        :
        <>
            <Form.Group as={Row} >
                <Form.Label column sm lg={3} >Proveedor: </Form.Label>
                <Col sm lg={7} >
                    <Form.Control as='select' value={provider} onChange={({target}) => setProvider(target.value)} >
                        <option value='' disabled selected >Elija un proveedor</option>
                        {providers.map(x => (
                            <option value={x.name} >{x.name}</option>
                            )
                        )}
                    </Form.Control>
                </Col>
                <Col sm lg={2} >
                    <Button variant='warning' onClick={() => setAddProvider(true)} ><FontAwesomeIcon icon={faPlus} /></Button>
                </Col>
            </Form.Group>
            <Form.Group as={Row}>
                <Form.Label column sm lg={3} ># de Factura: </Form.Label>
                <Col sm lg={7}>
                    <Form.Control type='text' value={billNumber} placeholder='Ingrese numero de factura' onChange={({target}) => setBillNumber(target.value)} />
                </Col>
            </Form.Group>
            <Form.Group as={Row}>
                <Form.Label column sm lg={3}>Monto: </Form.Label>
                <Col sm lg={7}>
                    <Form.Control type='number' value={amount} placeholder='Ingrese monto' onChange={({target}) => setAmount(target.value)} />
                </Col>
            </Form.Group>
            <Form.Group as={Row}>
                <Form.Label column sm lg={3}>Fecha: </Form.Label>
                <Col sm lg={7}>
                    <Form.Control type='date' value={date} onChange={({target}) => setDate(target.value)} />
                </Col>
            </Form.Group>
            <Form.Group as={Row} >
                <Form.Label column sm lg={3}>Comentarios: </Form.Label>
                <Col sm lg={7}>
                    <Form.Control as='textarea' value={comment} rows='3' placeholder='Comentarios...' id='pay-textarea' onChange={({ target }) => setComment(target.value)} />
                </Col>
            </Form.Group>
            <Row>
                <Col className='text-center'>
                    <Button type='submit' variant='success' className='text-center' onClick={() => setShowModal(false)} >Crear Factura</Button>
                </Col>
            </Row>
            </>
        }
        </Form>
    )

    if(isModal){
        return (
            <Fragment>
                <Button variant='warning' onClick={() => setShowModal(true)}><FontAwesomeIcon icon={faPlus} className='mr-2' />Agregar Pago</Button>
                <Modal show={showModal} onHide={() => setShowModal(false)} centered onExit={() => setAddProvider(false)} >
                    <Modal.Header closeButton className='bg-warning' >
                        <Modal.Title className='text-center w-100 text-white' >{addProvider ? 'CREAR PROVEEDOR' : 'PAGO PROVEEDOR'}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {providerform}
                    </Modal.Body>
                </Modal>
            </Fragment>
        )
    } else return providerform
}

const MSTP = state => (
    {
        providers: state.providers.providers
    }
)

const MDTP = dispatch => (
    {
        createBill: (data) => dispatch(createBill(data)),
        createProvider: (data) => dispatch(createProvider(data))
    }
)

export default connect(MSTP, MDTP)(PaymentForm);
