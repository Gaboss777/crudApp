import { faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDayspermonth } from 'components/Hooks/useDayspermonth';
import React, { useState, Fragment, useEffect } from 'react';
import { Row, Col, Form, Button, Modal } from 'react-bootstrap';
import Alerts from '../../Utils/Alerts/alerts'

//crear componente
const PaymentForm = ({ providers, createBill, isModal, month, year }) => {

    const [provider, setProvider] = useState('')
    const [billNumber, setBillNumber] = useState('')
    const [amount, setAmount] = useState('')
    const [method, setMethod] = useState('')
    const [date, setDate] = useState('')
    const [comment, setComment] = useState('')
    const [currency, setCurrency] = useState('')
    const [bank, setBank] = useState(null)
    const [reference, setReference] = useState(null)

    const [showModal, setShowModal] = useState(false)
    const [valid, setValid] = useState(false)

    const days = useDayspermonth(month, year)

    useEffect(() => {
    }, [month])

    const onSubmit = (event) => {
        event.preventDefault()
        let form = event.currentTarget
        if(form.checkValidity() === false) {
            event.stopPropagation()
        } else {
            let newBill = {provider_id: parseInt(provider), billNumber, amount, currency, method, bank, reference, date, comment, period:month+'-'+year}
            createBill(newBill)
            Alerts.InfoNotify('FACTURA CREADA CON EXITO')
            setProvider('')
            setBillNumber('')
            setAmount('')
            setMethod('')
            setDate('')
            setComment('')
            setCurrency('')
            setBank("")
            setReference("")
            setShowModal(false)
        }
        setValid(true)
    }

    console.log(valid)

    const billform = (
        <Form onSubmit={onSubmit} noValidate validated={valid}>
            <Form.Row>
                <Form.Group as={Col} sm lg={8}  controlId='validation01' >
                    <Form.Label className='font-weight-bold text-uppercase' >Proveedor</Form.Label>
                    <Form.Control required as='select' value={provider} onChange={({target}) => setProvider(target.value)} >
                        <option value='' disabled selected hidden >Elija un proveedor</option>
                        {providers.map(x => (
                            <option value={x.id} >{x.name}</option>
                            )
                        )}
                    </Form.Control>
                    <Form.Text className='text-muted'>Campo obligatorio</Form.Text>
                </Form.Group>
                <Form.Group as={Col} sm lg={4} controlId='validation04'>
                    <Form.Label className='font-weight-bold text-uppercase'>Fecha</Form.Label>
                    <Form.Control required type='date' min={`${year}-${month}-01`} max={`${year}-${month}-${days}`} value={date} onChange={({target}) => setDate(target.value)} />
                    <Form.Text className='text-muted'>Campo obligatorio</Form.Text>
                </Form.Group>
            </Form.Row>
            <Form.Row>
                <Form.Group as={Col} sm lg={5}  controlId='validation02'>
                    <Form.Label className='font-weight-bold text-uppercase' ># Factura</Form.Label>
                    <Form.Control required type='number' value={billNumber} placeholder='Ingrese factura' onChange={({target}) => setBillNumber(target.valueAsNumber)} />
                    <Form.Text className='text-muted'>Campo obligatorio</Form.Text>
                </Form.Group>
                <Form.Group as={Col} sm lg={4} controlId='validation03'>
                    <Form.Label className='font-weight-bold text-uppercase'>Monto</Form.Label>
                        <Form.Control required type='number' value={amount} placeholder='Ingrese monto' onChange={({target}) => setAmount(target.valueAsNumber)} />
                        <Form.Text className='text-muted'>Campo obligatorio</Form.Text>
                </Form.Group>
                <Form.Group as={Col} sm lg={3}>
                    <Col sm lg={12}>
                        <Form.Label className='font-weight-bold text-uppercase'>Moneda</Form.Label>
                    </Col>
                    <Col sm lg={12}>
                        <Form.Check required type='radio' label='BS' name='radioForm' id='radioForm1' onChange={() => setCurrency('BS')} inline />
                        <Form.Check required type='radio' label='USD' name='radioForm' id='radioForm2' onChange={() => setCurrency('USD')} inline />
                        <Form.Text className='text-muted mt-3'>Campo obligatorio</Form.Text>
                    </Col>
                </Form.Group>
            </Form.Row>
            <Form.Row>
                <Form.Group as={Col} sm lg={4} controlId='validation03' >
                    <Form.Label className='font-weight-bold text-uppercase'>Metodo de Pago</Form.Label>
                    <Form.Control  required as='select' value={method} onChange={({ target }) => setMethod(target.value)} >
                        <option value='' selected>Elija una opcion</option>
                        <option value='Efectivo' >Efectivo</option>
                        <option value='Transferencia Bancaria' >Transferencia Bancaria</option>
                        <option value='Zelle' >Zelle</option>
                    </Form.Control>
                    <Form.Text className='text-muted'>Campo obligatorio</Form.Text>
                </Form.Group>
                <Form.Group as={Col} sm lg={5} >
                    <Form.Label className='font-weight-bold text-uppercase'>Banco</Form.Label>
                    <Form.Control required as="select" value={bank} onChange={({target}) => setBank(target.value)} disabled={method !== 'Transferencia Bancaria' ? true : false} className={method !== 'Transferencia Bancaria' ? 'form-disable' : '' } >
                        <option value='' selected>Elija una opcion</option>
                        <option value="BNC">BNC - Banco Nacional de Credito</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group as={Col} sm lg={3}>
                    <Form.Label className='font-weight-bold text-uppercase'># de Referencia</Form.Label>
                    <Form.Control required type="number" value={reference} placeholder="Ingrese Ref" onChange={({target}) =>setReference(target.valueAsNumber)} disabled={method !== 'Transferencia Bancaria' ? true : false} className={method !== 'Transferencia Bancaria' ? 'form-disable' : '' } />
                </Form.Group>
            </Form.Row>
            <Form.Group as={Row}  controlId='validation05' >
                <Form.Label className='font-weight-bold text-uppercase' column sm lg={3}>Comentarios: </Form.Label>
                <Col sm lg={9}>
                    <Form.Control as='textarea' value={comment} rows='3' placeholder='Comentarios...' id='pay-textarea' onChange={({ target }) => setComment(target.value)} />
                </Col>
            </Form.Group>
            <Row>
                <Col className='text-center'>
                    <Button type='submit' variant='success' className='rounded'>CREAR</Button>
                    <Button variant='danger' className='ml-2 rounded' onClick={() => setShowModal(false)}>CANCELAR</Button>
                </Col>
            </Row>
        </Form>
    )

    if(isModal){
        return (
            <Fragment>
                <Button variant='success' className='rounded' onClick={() => setShowModal(true)} disabled={year && month ? false : true} ><FontAwesomeIcon icon={faPlusSquare} className='mr-2' />Pago</Button>
                <Modal show={showModal} onHide={() => setShowModal(false)} centered dialogClassName='modal-m-sm' >
                    <Modal.Header closeButton className='bg-success' >
                        <Modal.Title className='text-center w-100 text-white font-weight-bold' >CREAR FACTURA</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {billform}
                    </Modal.Body>
                </Modal>
            </Fragment>
        )
    } else return billform
}

export default PaymentForm
