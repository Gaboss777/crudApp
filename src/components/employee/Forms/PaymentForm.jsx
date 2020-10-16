import React, { useState } from 'react'
import { Button, Col, Form, Modal, Row } from 'react-bootstrap'
import { connect } from 'react-redux'
import { createPayment } from '../../../ducks/rrhh'

const PaymentForm = ({months, user, isModal, createPayment, year }) => {

    const [month, setMonth] = useState('')
    const [concept, setConcept] = useState('')
    const [amount, setAmount] = useState('')
    const [currency, setCurrency] = useState('')
    const [date, setDate] = useState('')
    const [method, setMethod] = useState('')
    const [bank, setBank] = useState('')
    const [reference, setReference] = useState('')

    const [show, setShow] = useState(false)
    const [valid, setValid] = useState(false)
    const [days, setDays] = useState(0)

    const [count, setCount] = useState()
    const id = count + 1
    const completeName = user.firstName.toUpperCase()+' '+user.secondName.toUpperCase()+' '+user.lastName.toUpperCase()+' '+user.secondSurname.toUpperCase()

    const handlerDays = (id) => {
        setMonth(id)
        if(id === '01' || id === '03' || id === '05' || id === '07' || id === '08' || id === '10' || id === '12' ) {
            setDays(31)
        } if(id === '04' || id === '06' || id === '09' || id === '11') {
            setDays(30)
        } if(id === '02') {
            if((year - 2016) % 4 === 0 ) {
                setDays(29)
            } else {
                setDays(28)
            }
        }
    }

    const onSubmit = (e) => {
        e.preventDefault()
        let form = e.currentTarget
        if(form.CheckValidity() === false) {
            e.stopPropagation()
        } else {
            setCount(id)
            let newPayment = { id: count, user_id: user.id, concept, amount, date, currency, method, bank, reference, period: month+'-'+year }
            createPayment(newPayment)
            setConcept('')
            setAmount('')
            setCurrency('')
            setDate('')
            setShow(false)
        }
        setValid(true)
    }

    const formjsx = (
        <Form onSubmit={onSubmit}>
            <Form.Row>
                <Form.Group as={Col} sm lg={6}>
                    <Form.Label>EMPLEADO</Form.Label>
                    <Form.Control type='text' value={completeName} readOnly plaintext className='client-payment' />
                </Form.Group>
                <Form.Group as={Col} sm lg={3}>
                    <Form.Label>MES</Form.Label>
                    <Form.Control required as='select' value={month} onChange={({target}) => handlerDays(target.value)} >
                        <option value='' selected disabled>Elegir Mes..</option>
                        {months.map(m =>
                            <option value={m.id}>{m.name}</option>
                        )}
                    </Form.Control>
                    <Form.Text className='text-muted'>Campo obligatorio</Form.Text>
                </Form.Group>
                <Form.Group as={Col} sm lg={3}>
                    <Form.Label>FECHA DE PAGO</Form.Label>
                    <Form.Control required type='date' value={date} min={`${year}-${month}-01`} max={`${year}-${month}-${days}`} onChange={({target}) => setDate(target.value)} disabled={month ? false : true} pattern='[0-9]{4}-[0-9]{2}-[0-9]{2}' />
                </Form.Group>
            </Form.Row>
            <Form.Row>
                <Form.Group as={Col} sm lg={4}>
                    <Form.Label>CONCEPTO</Form.Label>
                    <Form.Control required as='select' value={concept} onChange={({target}) => setConcept(target.value)}>
                        <option value='' selected disabled>Elija una opcion</option>
                        <option value='salario'>Salario</option>
                        <option value='bono'>Bono</option>
                        <option value='utilidades'>Utilidades</option>
                        <option value='vacaciones'>Vacaciones</option>
                        <option value='adelanto'>Adelanto</option>
                        <option value='liquidacion'>Liquidacion</option>
                    </Form.Control>
                    <Form.Text className='text-muted'>Campo obligatorio</Form.Text>
                </Form.Group>
                <Form.Group as={Col} sm lg={3}>
                    <Form.Label>MONTO</Form.Label>
                    <Form.Control required type='number' value={amount} onChange={({target}) => setAmount(target.value)} />
                </Form.Group>
                <Form.Group as={Col} sm lg={1}>
                    <Form.Label>MONEDA</Form.Label>
                    <Form.Check required type='radio' label='BS' name='radioForm' id='radioForm1' onChange={() => setCurrency('BS')} />
                    <Form.Check required type='radio' label='USD' name='radioForm' id='radioForm2' onChange={() => setCurrency('USD')} />
                </Form.Group>
                <Form.Group as={Col} sm lg={4}>
                    <Form.Label>METODO</Form.Label>
                    <Form.Control required as='select' value={method} onChange={({target}) => setMethod(target.value)} >
                        <option value='' selected disabled>Elija una opcion</option>
                        <option value='efectivo'>Efectivo</option>
                        <option value='transferencia'>Transferencia Bancaria</option>
                        <option value='zelle'>Zelle</option>
                    </Form.Control>
                    <Form.Text className='text-muted'>Campo obligatorio</Form.Text>
                </Form.Group>
            </Form.Row>
            { method === 'transferencia' &&
                <Form.Row>
                    <Form.Group as={Col}>
                        <Form.Label>BANCO</Form.Label>
                        <Form.Control required={method === 'transferencia' ? true : false} as='select' value={bank} onChange={({target}) => setBank(target.value)} >
                            <option value='' selected disabled>Elija una opcion</option>
                            <option value='BNC'>BNC - Banco Nacional de Cretido</option>
                        </Form.Control>
                        <Form.Text className='text-muted'>Campo obligatorio</Form.Text>
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label># DE REFERENCIA</Form.Label>
                        <Form.Control required={method === 'transferencia' ? true : false} type='text' value={reference} placeholder='Numero de referencia' onChange={({target}) => setReference(target.value)} />
                    </Form.Group>
                    <Form.Text className='text-muted'>Campo obligatorio</Form.Text>
                </Form.Row>
            }
            <Row>
                <Col className='text-center'>
                    <Button variant='success' type='submit' className='mr-2' >Crear Pago</Button>
                    <Button variant='danger' onClick={() => setShow(false)}>Cancelar</Button>
                </Col>
            </Row>
        </Form>
    )

    if(isModal) {
        return (
            <>
            <Button variant='success' onClick={() => setShow(true)} className='mr-2'>Pago</Button>
            <Modal show={show} dialogClassName='modal-m-sm' onHide={() => setShow(false)} centered onExit={() => setValid(false)} >
                <Modal.Header closeButton className='bg-success'>
                    <Modal.Title className='text-center w-100 text-white' >AGREGAR PAGO</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {formjsx}
                </Modal.Body>
            </Modal>
            </>
        )
    } else return formjsx
}

const MDTP = dispatch => (
    {
        createPayment: (data) => dispatch(createPayment(data))
    }
)

export default connect(null, MDTP)(PaymentForm)