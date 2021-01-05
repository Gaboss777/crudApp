import React, {useEffect, useState} from 'react';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';

import { Typeahead } from 'react-bootstrap-typeahead';

import Alerts from '../../../Utils/Alerts/alerts'

const PaymentForm = ({month, seller, clientsList, isModal, createSell, year}) => {

    const [show, setShow] = useState(false)

    const [client, setClient] = useState('')
    const [date, setDate] = useState('')
    const [percent, setPercent] = useState(0)
    const [currency, setCurrency] = useState('')
    const [totalAmount, setTotalAmount] = useState('')

    const [days, setDays] = useState('')
    const [key, setKey] = useState('')

    const [valid, setValid] = useState(false)

    const payamount = (totalAmount * percent) / 100

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

    const handleSubmit = (e) => {
        e.preventDefault()
        let form = e.currentTarget
        if(form.checkValidity() === false){
            e.stopPropagation()
        } else {
            let clientId = client[0].id
            let newPayment = {seller_id: seller.id ,client_id: clientId, date, amount: payamount, percent, currency, period: month.id +'-2020'}
            createSell(newPayment)
            Alerts.InfoNotify('PAGO CREADO CON EXITO')
            setClient('')
            setDate('')
            setPercent('')
            setCurrency('')
            setTotalAmount('')
            setShow(false)
        }
        setValid(true)
    }

    const form = (
        <Form onSubmit={handleSubmit} noValidate validated={valid}>
            <Form.Row>
                <Form.Group as={Col} sm lg={6}>
                    <Form.Label className='font-weight-bold text-uppercase'>Vendedor</Form.Label>
                    <Form.Control type='text' readOnly plaintext value={seller.name.toUpperCase()} className='form-disable' />
                </Form.Group>
                <Form.Group as={Col} sm lg={6}>
                    <Form.Label className='font-weight-bold text-uppercase'>Cliente</Form.Label>
                    <Typeahead id='sellers-list' defaultSelected='' labelKey='name' options={clientsList} onChange={(selected) => setClient(selected)} placeholder='Elija un cliente' clearButton />
                    <Form.Text className='text-muted'>Campo obligatorio</Form.Text>
                </Form.Group>
            </Form.Row>
            <Form.Row>
                <Form.Group as={Col} sm lg={3}>
                    <Form.Label className='font-weight-bold text-uppercase'>Fecha de Pago</Form.Label>
                    <Form.Control required type='date' value={date} min={`${year}-${month.id}-01`} max={`${year}-${month.id}-${days}`} onChange={({target}) => setDate(target.value)} />
                    <Form.Text className='text-muted'>Campo obligatorio</Form.Text>
                </Form.Group>
                <Form.Group as={Col} sm lg={3}>
                    <Form.Label className='font-weight-bold text-uppercase'>Monto Total</Form.Label>
                    <Form.Control required type='number' value={totalAmount} onChange={({target}) => setTotalAmount(target.value)} />
                    <Form.Text className='text-muted'>Campo obligatorio</Form.Text>
                </Form.Group>
                <Form.Group as={Col} sm lg={1}>
                    <Form.Label className='font-weight-bold text-uppercase'>Moneda</Form.Label>
                    <Form.Check required type='radio' label='BS' name='radioForm' id='radioForm1' onChange={() => setCurrency('BS')} />
                    <Form.Check required type='radio' label='USD' name='radioForm' id='radioForm2' onChange={() => setCurrency('USD')} />
                    <Form.Text className='text-muted mt-2'>Campo obligatorio</Form.Text>
                </Form.Group>
                <Form.Group as={Col} sm lg={2} >
                    <Form.Label className='font-weight-bold text-uppercase'>Porcentaje</Form.Label>
                    <Form.Control required type='number' value={percent} onChange={({target}) => setPercent(target.valueAsNumber)} />
                    <Form.Text className='text-muted'>Campo obligatorio</Form.Text>
                </Form.Group>
                <Form.Group as={Col} sm lg={3}>
                    <Form.Label className='font-weight-bold text-uppercase'>Total</Form.Label>
                    <Form.Control required readOnly plaintext type='number' value={payamount} className='form-disable' />
                </Form.Group>
            </Form.Row>
            <Row>
                <Col className='text-center'>
                    <Button type='submit' variant='success'>Agregar</Button>
                    <Button variant='danger' onClick={() => setShow(false)} className='ml-2'>Cerrar</Button>
                </Col>
            </Row>
        </Form>
    )

    if(isModal) {
        return (
            <>
                <Button variant='success' size='sm' onClick={() => setShow(true)} >Agregar Pago</Button>
                <Modal show={show} onHide={() => setShow(false)} size='lg' centered>
                    <Modal.Header closeButton className='bg-success'>
                        <Modal.Title className='text-white w-100 text-center'>AGREGAR PAGO</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {form}
                    </Modal.Body>
                </Modal>
            </>
        )
    } else return form
}

export default PaymentForm