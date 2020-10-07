
import React, { useState, Fragment } from 'react';
import { Row, Col, Form, Button, Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import { createBill, createProvider } from '../../ducks/provider';
import NewProvider from './NewProvides';

//crear componente
const PaymentForm = ({ providers, createBill, isModal, month }) => {

    const [provider, setProvider] = useState('')
    const [billNumber, setBillNumber] = useState('')
    const [amount, setAmount] = useState('')
    const [method, setMethod] = useState('')
    const [date, setDate] = useState('')
    const [comment, setComment] = useState('')

    const [showModal, setShowModal] = useState(false)
    const [valid, setValid] = useState(false)

    const onSubmit = (event) => {
        event.preventDefault()
        let form = event.currentTarget
        let newYear = new Date().getFullYear()
        if(form.checkValidity() === false) {
            event.stopPropagation()
        } else {
            let newBill = {provider_id: provider, billNumber, amount, method, date, comment, period:month.id+'-'+newYear}
            createBill(newBill)
            setProvider('')
            setBillNumber('')
            setAmount('')
            setDate('')
            setComment('')
            setShowModal(false)
            console.log(newBill)
        }
        setValid(true)
    }

    const billform = (
        <Form onSubmit={onSubmit} noValidate validated={valid}>
            <Form.Group as={Row}  controlId='validation01' >
                <Form.Label column sm lg={3} >Proveedor: </Form.Label>
                <Col sm lg={7} >
                    <Form.Control required as='select' value={provider} onChange={({target}) => setProvider(target.value)} >
                        <option value='' disabled selected >Elija un proveedor</option>
                        {providers.map(x => (
                            <option value={x.id} >{x.name}</option>
                            )
                        )}
                    </Form.Control>
                </Col>
                <Col sm lg={2} >
                    <NewProvider isModal={true} />
                </Col>
            </Form.Group>
            <Form.Group as={Row}  controlId='validation02'>
                <Form.Label column sm lg={3} ># de Factura: </Form.Label>
                <Col sm lg={7}>
                    <Form.Control required type='text' value={billNumber} placeholder='Ingrese numero de factura' onChange={({target}) => setBillNumber(target.value)} />
                </Col>
            </Form.Group>
            <Form.Group as={Row}  controlId='validation03'>
                <Form.Label column sm lg={3}>Monto: </Form.Label>
                <Col sm lg={7}>
                    <Form.Control required type='number' value={amount} placeholder='Ingrese monto' onChange={({target}) => setAmount(target.value)} />
                </Col>
            </Form.Group>
            <Form.Group as={Row} controlId='validation03' >
                    <Form.Label column sm={3}>Metodo de Pago: </Form.Label>
                    <Col sm={7}>
                        <Form.Control  required as='select' value={method} onChange={({ target }) => setMethod(target.value)} >
                            <option value='' disabled selected hidden >Elegir metodo de pago</option>
                            <option value='Efectivo' >Efectivo</option>
                            <option value='Transferencia Bancaria' >Transferencia Bancaria</option>
                            <option value='Zelle' >Zelle</option>
                        </Form.Control>
                    </Col>
                </Form.Group>
            <Form.Group as={Row}  controlId='validation04'>
                <Form.Label column sm lg={3}>Fecha: </Form.Label>
                <Col sm lg={7}>
                    <Form.Control required type='date' value={date} onChange={({target}) => setDate(target.value)} />
                </Col>
            </Form.Group>
            <Form.Group as={Row}  controlId='validation05' >
                <Form.Label column sm lg={3}>Comentarios: </Form.Label>
                <Col sm lg={7}>
                    <Form.Control required as='textarea' value={comment} rows='3' placeholder='Comentarios...' id='pay-textarea' onChange={({ target }) => setComment(target.value)} />
                </Col>
            </Form.Group>
            <Row>
                <Col className='text-center'>
                    <Button type='submit' variant='success' className='text-center'>Crear Factura</Button>
                </Col>
            </Row>
        </Form>
    )

    if(isModal){
        return (
            <Fragment>
                <Button variant='success' size='sm' onClick={() => setShowModal(true)} className='mt-3 mb-1'  >Agregar Pago</Button>
                <Modal show={showModal} onHide={() => setShowModal(false)} centered >
                    <Modal.Header closeButton className='bg-warning' >
                        <Modal.Title className='text-center w-100 text-white' >CREAR FACTURA</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {billform}
                    </Modal.Body>
                </Modal>
            </Fragment>
        )
    } else return billform
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
