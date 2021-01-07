//import librerias
import React, { Fragment, useEffect, useState } from 'react';
import {  Row, Col, Form, Button, Modal } from 'react-bootstrap';
import Alerts from 'components/Utils/Alerts/alerts';
import { useDayspermonth } from 'components/Hooks/useDayspermonth';

//crear componente
const PayForm = ({client, createPayment, asModal, month, disabled, year, edit, updatePayment, payment}) => {

    const [amount, setAmount] = useState(0)
    const [method, setMethod] = useState('')
    const [reference, setReference] = useState('')
    const [date, setDate] = useState('')
    const [comment, setComment] = useState('')
    const [currency, setCurrency] = useState('')
    const [bank, setBank] = useState('')
    const [discount, setDiscount] = useState(0)
    const [concept, setConcept] = useState('')
    const [bill, setBill] = useState('')

    const [check, setCheck] = useState(false)

    const [imgUrl, setImgUrl] = useState()
    const [preview, setPreview] = useState()

    const [showModal, setShowModal] = useState(false)
    const [valid, setValid] = useState(false)

    const days = useDayspermonth(month.id, year)
    const discountAmount = (amount * discount ) / 100
    const newAmount = Math.round(amount - discountAmount)

    useEffect(() => {
        if(edit && payment){
            setAmount(payment.amount)
            setMethod(payment.method)
            setReference(payment.reference)
            setDate(payment.date)
            setComment(payment.comment)
            setCurrency(payment.currency)
            setBank(payment.bank)
            setDiscount(payment.discount)
            setConcept(payment.concept)
            setBill(payment.bill)
        }
    }, [month, edit, payment])

    const handleCheck = (checked) => {
        setCheck(checked)
        if(!check) {
            setDiscount(0)
        }
    }

    const onSubmit = (event) => {
        event.preventDefault()
        const form = event.currentTarget
        if (form.checkValidity() === false) {
            event.stopPropagation()
        } else {
            if(method !== "Transferencia Bancaria") {
                setBank('')
                setReference('')
            }
            let newPayment = { user_id:client.id, amount: newAmount, bill, method, reference, date, comment, currency, bank,period:month.id+'-'+year, discount, concept }
            if(edit){
                updatePayment({...newPayment, id: payment.id})
                Alerts.EditNotify('PAGO ACTUALZIADO')
            } else {
                createPayment(newPayment)
                Alerts.InfoNotify("PAGO AGREGADO")
            }
            setAmount(0)
            setMethod('')
            setReference('')
            setDate('')
            setComment('')
            setCurrency('')
            setBank('')
            setImgUrl('')
            setDiscount(0)
            setConcept('')
            setShowModal(false)
            setCheck(false)
            setBill('')
        }
        setValid(true)
    }

    const formPay = (
        <Col>
            <Form onSubmit={onSubmit} noValidate validated={valid} >
            <Form.Row>
                <Form.Group as={Col} sm lg={6} controlId='validation01' >
                    <Form.Label className='font-weight-bold text-uppercase'>Razon Social</Form.Label>
                    <Form.Control required type='text' value={client.name} placeholder='Razon Social' plaintext readOnly className='form-disable pl-2' />
                </Form.Group>
                <Form.Group as={Col} sm lg={3} controlId='validation04'>
                    <Form.Label className='font-weight-bold text-uppercase'># Factura</Form.Label>
                    <Form.Control required type='text' value={bill} placeholder='Ingrese factura' onChange={({target}) => setBill(target.value)} />
                </Form.Group>
                <Form.Group as={Col} sm lg={3} controlId='validation04'>
                    <Form.Label className='font-weight-bold text-uppercase'>Fecha de Pago</Form.Label>
                    <Form.Control required type='date' min={`${year}-${month.id}-01`} max={`${year}-${month.id}-${days}`}  value={date} placeholder='Indique fecha' onChange={({ target }) => setDate(target.value)} />
                    <Form.Text className='text-muted'>Campo obligatorio</Form.Text>
                </Form.Group>
            </Form.Row>
            <Form.Row>
                <Form.Group as={Col} sm lg={3} controlId='validation02' >
                    <Form.Label className='font-weight-bold text-uppercase'>Monto</Form.Label>
                    <Form.Control required type='number' value={amount} placeholder='Indique monto' onChange={({ target }) => setAmount(target.valueAsNumber)} />
                    <Form.Text className='text-muted'>Campo obligatorio</Form.Text>
                </Form.Group>
                <Form.Group as={Col} sm lg={2} controlId='validation11'>
                    <Form.Label className='font-weight-bold text-uppercase'>Moneda</Form.Label>
                    <Form.Check required type='radio' label='BS' name='radioForm' id='radioForm1' onChange={(e) => setCurrency('BS')} />
                    <Form.Check required type='radio' label='USD' name='radioForm' id='radioForm2' onChange={(e) => setCurrency('USD')} />
                    <Form.Text className='text-muted mt-3'>Campo Obligatorio</Form.Text>
                </Form.Group>
                <Form.Group as={Col} sm lg={4} controlId='validation10'  >
                    <Form.Label className='font-weight-bold text-uppercase'><Form.Check type='checkbox' label='Descuento %' name='checkDiscount' id='checkForm3' onChange={({target}) => handleCheck(target.checked)} /></Form.Label>
                    <Row>
                        <Col sm lg={6} className='pr-0'>
                            <Form.Control required type='number' value={discount} onChange={({ target }) => setDiscount(target.valueAsNumber)} disabled={check ? false : true} className={!check ? 'form-disable' : '' } />
                        </Col>
                        <Col sm lg={6}>
                            <Form.Control required type='number' value={discountAmount} disabled={check ? false : true} className={!check ? 'form-disable' : ''} readOnly plaintext />
                        </Col>
                    </Row>
                </Form.Group>
                <Form.Group as={Col} sm lg={3} controlId='validation20' >
                    <Form.Label className='font-weight-bold text-uppercase'>Concepto:</Form.Label>
                    <Form.Control required as='select' value={concept} onChange={({target}) => setConcept(target.value)} >
                        <option value='' selected disabled>Elija una opcion</option>
                        <option value='mensualidad'>Mensualidad</option>
                        <option value='alquiler'>Alquiler</option>
                        <option value='mantenimiento'>Mantenimiento</option>
                        <option value='instalacion'>Instalacion</option>
                        <option value='otros'>Otros</option>
                    </Form.Control>
                    <Form.Text className='text-muted'>Campo obligatorio</Form.Text>
                </Form.Group>
            </Form.Row>
            <Form.Row>
                <Form.Group as={Col} sm lg={4} controlId='validation03' >
                    <Form.Label className='font-weight-bold text-uppercase'>Metodo de Pago</Form.Label>
                    <Form.Control  required as='select' value={method} onChange={({ target }) => setMethod(target.value)} >
                        <option value='' disabled selected hidden >Elegir metodo de pago</option>
                        <option value='Efectivo' >Efectivo</option>
                        <option value='Credito de Cortesia' >Credito de Cortesia</option>
                        <option value='Transferencia Bancaria' >Transferencia Bancaria</option>
                        <option value='Zelle' >Zelle</option>
                    </Form.Control>
                    <Form.Text className='text-muted'>Campo obligatorio</Form.Text>
                </Form.Group>
                <Form.Group as={Col} sm lg={5} controlId='validation06' >
                        <Form.Label className='font-weight-bold text-uppercase'>Banco</Form.Label>
                        <Form.Control required as='select' value={bank} onChange={({ target }) => setBank(target.value)} disabled={method !== 'Transferencia Bancaria' ? true : false} className={method !== 'Transferencia Bancaria' ? 'form-disable' : '' }>
                            <option value='' selected disabled>Elija una opcion</option>
                            <option value='BNC'>BNC - Banco Nacional de Credito</option>
                        </Form.Control>
                        { method === 'Transferencia Bancaria' && 
                            <Form.Text className='text-muted'>Campo obligatorio</Form.Text>
                        }
                    </Form.Group>
                    <Form.Group as={Col} sm lg={3} controlId='validation07'>
                        <Form.Label className='font-weight-bold text-uppercase'># de Referencia</Form.Label>
                        <Form.Control required type='number' value={reference} placeholder='Numero de Referencia' onChange={({ target }) => setReference(target.valueAsNumber) } disabled={method !== 'Transferencia Bancaria' ? true : false} className={method !== 'Transferencia Bancaria' ? 'form-disable' : '' } />
                        { method === 'Transferencia Bancaria' && 
                            <Form.Text className='text-muted'>Campo obligatorio</Form.Text>
                        }
                    </Form.Group>
            </Form.Row>
                <Form.Group as={Row} controlId='validation05'>
                    <Form.Label className='font-weight-bold text-uppercase' column sm={3}>Comentarios: </Form.Label>
                    <Col sm={9} >
                        <Form.Control as='textarea' value={comment} rows='3' placeholder='Comentarios...' id='pay-textarea' onChange={({ target }) => setComment(target.value)} />
                    </Col>
                </Form.Group>
                <Col className='text-center'>
                    <Button variant='success' type='submit' className='mr-2' >CREAR</Button>
                    <Button variant='danger' onClick={() => setShowModal(false)} className='ml-2'>CANCELAR</Button>
                </Col>
            </Form>
        </Col>
        )

    if (asModal) {
        return (
            <Fragment>
                <Button size='sm' variant={edit ? 'primary' : 'success'} onClick={() => setShowModal(true)} className='ml-2' disabled={disabled}>{edit ? 'EDITAR' : 'AGREGAR PAGO'}</Button>
                <Modal show={showModal} onHide={() => setShowModal(false)} centered onExit={() => setValid(false)} dialogClassName='modal-m-sm' >
                    <Modal.Header closeButton className='bg-success' >
                        <Modal.Title className='text-center w-100 text-white' >{edit ? 'EDITAR' : 'AGREGAR'} PAGO</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {formPay}
                    </Modal.Body>
                </Modal>
            </Fragment>
        )
    }
    else return formPay
}

export default PayForm
