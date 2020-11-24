import React, {useState} from 'react';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import Alerts from '../../Alerts/alerts'

const PaymentForm = ({month, seller, clientsList, isModal, createSell}) => {

    const [show, setShow] = useState(false)

    const [client, setClient] = useState('')
    const [date, setDate] = useState('')
    const [percent, setPercent] = useState(0)
    const [currency, setCurrency] = useState('')
    const [totalAmount, setTotalAmount] = useState('')

    const payamount = (totalAmount * percent) / 100

    const handleSubmit = (e) => {
        e.preventDefault()
        let newPayment = {seller_id: seller.id ,client_id: parseInt(client), date, payamount, percent, currency, period: month.id +'-2020'}
        createSell(newPayment)
        Alerts.InfoNotify('PAGO CREADO CON EXITO')
        setClient('')
        setDate('')
        setPercent('')
        setCurrency('')
        setTotalAmount('')
        setShow(false)
    }

    const form = (
        <Form onSubmit={handleSubmit}>
            <Form.Row>
                <Form.Group as={Col} sm lg={6}>
                    <Form.Label>Vendedor</Form.Label>
                    <Form.Control type='text' readOnly plaintext value={seller.name.toUpperCase()} className='client-payment' />
                </Form.Group>
                <Form.Group as={Col} sm lg={6}>
                    <Form.Label>Cliente</Form.Label>
                    <Form.Control as='select' value={client} onChange={({target}) => setClient(target.value)}>
                        <option value='' selected disabled>Elija un cliente</option>
                        {clientsList.map(client =>
                            <option value={client.id}>{client.name}</option>
                        )}
                    </Form.Control>
                </Form.Group>
            </Form.Row>
            <Form.Row>
                <Form.Group as={Col} sm lg={3}>
                    <Form.Label>Fecha de Pago</Form.Label>
                    <Form.Control type='date' value={date} onChange={({target}) => setDate(target.value)} />
                </Form.Group>
                <Form.Group as={Col} sm lg={3}>
                    <Form.Label>Monto Total</Form.Label>
                    <Form.Control type='number' value={totalAmount} onChange={({target}) => setTotalAmount(target.value)} />
                </Form.Group>
                <Form.Group as={Col} sm lg={1} className='mr-2'>
                    <Form.Label>Moneda</Form.Label>
                    <Form.Check type='radio' label='BS' name='radioForm' id='radioForm1' onChange={() => setCurrency('BS')} />
                    <Form.Check type='radio' label='USD' name='radioForm' id='radioForm2' onChange={() => setCurrency('USD')} />
                </Form.Group>
                <Form.Group as={Col} sm lg={1} classname='ml-2'>
                    <Form.Label>Porcentaje</Form.Label>
                    <Form.Control type='number' value={percent} onChange={({target}) => setPercent(target.valueAsNumber)} />
                </Form.Group>
                <Form.Group as={Col} sm lg={2}>
                    <Form.Label>Total</Form.Label>
                    <Form.Control readOnly plaintext type='number' value={payamount} className='client-payment' />
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