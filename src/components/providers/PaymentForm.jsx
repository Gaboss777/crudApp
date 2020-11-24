import React, { useState, Fragment, useEffect } from 'react';
import { Row, Col, Form, Button, Modal } from 'react-bootstrap';
import Alerts from '../Alerts/alerts'

//crear componente
const PaymentForm = ({ providers, createBill, isModal, month, year }) => {

    const [provider, setProvider] = useState('')
    const [billNumber, setBillNumber] = useState('')
    const [amount, setAmount] = useState('')
    const [method, setMethod] = useState('')
    const [date, setDate] = useState('')
    const [comment, setComment] = useState('')
    const [currency, setCurrency] = useState('')
    const [bank, setBank] = useState("")
    const [reference, setReference] = useState('')

    const [showModal, setShowModal] = useState(false)
    const [valid, setValid] = useState(false)
    const [days, setDays] = useState('')

    useEffect(() => {
        if(month.id === '01' || month.id === '03' || month.id === '05' || month.id === '07' || month.id === '08' || month.id === '10' || month.id === '12' ) {
            setDays(31)
        } if(month.id === '04' || month.id === '06' || month.id === '09' || month.id === '11') {
            setDays(30)
        } if(month.id === '02') {
            if((year - 2016) % 4 === 0 ) {
                setDays(29)
            } else {
                setDays(28)
            }
        }
    }, [month])

    const onSubmit = (event) => {
        event.preventDefault()
        let form = event.currentTarget
        if(form.checkValidity() === false) {
            event.stopPropagation()
        } else {
            let newBill = {provider_id: provider, billNumber, amount, currency, method, bank, reference, date, comment, period:month.id+'-'+year}
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
            console.log(newBill)
        }
        setValid(true)
    }

    const billform = (
        <Form onSubmit={onSubmit} noValidate validated={valid}>
            <Form.Row>
                <Form.Group as={Col} sm lg={8}  controlId='validation01' >
                    <Form.Label >Proveedor</Form.Label>
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
                    <Form.Label>Fecha</Form.Label>
                    <Form.Control required type='date' min={`${year}-${month.id}-01`} max={`${year}-${month.id}-${days}`} value={date} onChange={({target}) => setDate(target.value)} />
                    <Form.Text className='text-muted'>Campo obligatorio</Form.Text>
                </Form.Group>
            </Form.Row>
            <Form.Row>
                <Form.Group as={Col} sm lg={5}  controlId='validation02'>
                    <Form.Label ># de Factura</Form.Label>
                    <Form.Control required type='number' value={billNumber} placeholder='Ingrese factura' onChange={({target}) => setBillNumber(target.valueAsNumber)} />
                    <Form.Text className='text-muted'>Campo obligatorio</Form.Text>
                </Form.Group>
                <Form.Group as={Col} sm lg={4} controlId='validation03'>
                    <Form.Label>Monto</Form.Label>
                        <Form.Control required type='number' value={amount} placeholder='Ingrese monto' onChange={({target}) => setAmount(target.valueAsNumber)} />
                        <Form.Text className='text-muted'>Campo obligatorio</Form.Text>
                </Form.Group>
                <Form.Group as={Col} sm lg={3}>
                    <Form.Label>Moneda</Form.Label>
                    <Form.Check required type='radio' label='BS' name='radioForm' id='radioForm1' onChange={() => setCurrency('BS')} />
                    <Form.Check required type='radio' label='USD' name='radioForm' id='radioForm2' onChange={() => setCurrency('USD')} />
                    <Form.Text className='text-muted mt-3'>Campo obligatorio</Form.Text>
                </Form.Group>
            </Form.Row>
            <Form.Row>
                <Form.Group as={Col} sm lg={4} controlId='validation03' >
                    <Form.Label>Metodo de Pago</Form.Label>
                    <Form.Control  required as='select' value={method} onChange={({ target }) => setMethod(target.value)} >
                        <option value='' disabled selected hidden >Elegir..</option>
                        <option value='Efectivo' >Efectivo</option>
                        <option value='Transferencia Bancaria' >Transferencia Bancaria</option>
                        <option value='Zelle' >Zelle</option>
                    </Form.Control>
                    <Form.Text className='text-muted'>Campo obligatorio</Form.Text>
                </Form.Group>
                <Form.Group as={Col} sm lg={5} >
                    <Form.Label>Banco</Form.Label>
                    <Form.Control required as="select" value={bank} onChange={({target}) => setBank(target.value)} disabled={method !== 'Transferencia Bancaria' ? true : false} className={method !== 'Transferencia Bancaria' ? 'form-disable' : '' } >
                        <option value="" selected disabled hidden>Elija una opcion</option>
                        <option value="BNC">BNC - Banco Nacional de Credito</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group as={Col} sm lg={3}>
                    <Form.Label># de Referencia</Form.Label>
                    <Form.Control required type="number" value={reference} placeholder="Ingrese Ref" onChange={({target}) =>setReference(target.valueAsNumber)} disabled={method !== 'Transferencia Bancaria' ? true : false} className={method !== 'Transferencia Bancaria' ? 'form-disable' : '' } />
                </Form.Group>
            </Form.Row>
            <Form.Group as={Row}  controlId='validation05' >
                <Form.Label column sm lg={2}>Comentarios: </Form.Label>
                <Col sm lg={10}>
                    <Form.Control as='textarea' value={comment} rows='3' placeholder='Comentarios...' id='pay-textarea' onChange={({ target }) => setComment(target.value)} />
                </Col>
            </Form.Group>
            <Row>
                <Col className='text-center'>
                    <Button type='submit' variant='success'>Crear</Button>
                    <Button variant='danger' className='ml-2' onClick={() => setShowModal(false)}>Cancelar</Button>
                </Col>
            </Row>
        </Form>
    )

    if(isModal){
        return (
            <Fragment>
                <Button variant='success' size='sm' onClick={() => setShowModal(true)} className='mt-3 mb-1' disabled={year ? false : true} >Agregar Pago</Button>
                <Modal show={showModal} onHide={() => setShowModal(false)} centered dialogClassName='modal-m-sm' >
                    <Modal.Header closeButton className='bg-success' >
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

export default PaymentForm
