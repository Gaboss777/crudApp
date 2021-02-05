import { faPlusSquare } from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { useDayspermonth } from 'components/Hooks/useDayspermonth'
import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Modal, Row } from 'react-bootstrap'
import Alerts from '../../../Utils/Alerts/alerts'

const PaymentForm = ({month, user, isModal, createPayment, year }) => {

    const [concept, setConcept] = useState('')
    const [amount, setAmount] = useState()
    const [currency, setCurrency] = useState('')
    const [date, setDate] = useState('')
    const [method, setMethod] = useState('')
    const [bank, setBank] = useState('')
    const [reference, setReference] = useState('')

    const [show, setShow] = useState(false)
    const [valid, setValid] = useState(false)

    const completeName = user.firstname.toUpperCase() +' '+ user.secondname.toUpperCase() +' '+ user.lastname.toUpperCase() +' '+ user.secondsurname.toUpperCase()

    const days = useDayspermonth(month, year)

    const onSubmit = (e) => {
        e.preventDefault()
        let form = e.currentTarget
        if(form.checkValidity() === false) {
            e.stopPropagation()
        } else {
            let newPayment = { user_id: user.id, concept, amount, date, currency, method, bank, reference, period: month+'-'+year }
            createPayment(newPayment)
            Alerts.InfoNotify('PAGO CREADO CON EXITO')
            setConcept('')
            setAmount('')
            setCurrency('')
            setDate('')
            setReference('')
            setBank('')
            setMethod('')
            setShow(false)
        }
        setValid(true)
    }

    useEffect(() =>{
    }, [month])

    const formjsx = (
        <Form onSubmit={onSubmit} notValidate validated={valid}>
            <Form.Row>
                <Form.Group as={Col} sm lg={9}>
                    <Form.Label className='font-weight-bold text-uppercase'>EMPLEADO</Form.Label>
                    <Form.Control type='text' value={completeName} readOnly plaintext className='form-disable' />
                </Form.Group>
                <Form.Group as={Col} sm lg={3}>
                    <Form.Label className='font-weight-bold text-uppercase'>FECHA DE PAGO</Form.Label>
                    <Form.Control required type='date' value={date} min={`${year}-${month}-01`} max={`${year}-${month}-${days}`} onChange={({target}) => setDate(target.value)} disabled={month ? false : true} />
                    <Form.Text className='text-muted'>Campo obligatorio</Form.Text>
                </Form.Group>
            </Form.Row>
            <Form.Row>
                <Form.Group as={Col} sm lg={3}>
                    <Form.Label className='font-weight-bold text-uppercase'>CONCEPTO</Form.Label>
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
                    <Form.Label className='font-weight-bold text-uppercase'>MONTO</Form.Label>
                    <Form.Control required type='number' value={amount} onChange={({target}) => setAmount(target.valueAsNumber)} />
                    <Form.Text className='text-muted'>Campo obligatorio</Form.Text>
                </Form.Group>
                <Form.Group as={Col} sm lg={2}>
                    <Form.Label className='font-weight-bold text-uppercase'>MONEDA</Form.Label>
                    <Form.Check required type='radio' label='BS' name='radioForm' id='radioForm1' onChange={() => setCurrency('BS')} />
                    <Form.Check required type='radio' label='USD' name='radioForm' id='radioForm2' onChange={() => setCurrency('USD')} />
                    <Form.Text className='text-muted mt-3'>Campo obligatorio</Form.Text>
                </Form.Group>
                <Form.Group as={Col} sm lg={4}>
                    <Form.Label className='font-weight-bold text-uppercase'>METODO</Form.Label>
                    <Form.Control required as='select' value={method} onChange={({target}) => setMethod(target.value)} >
                        <option value='' selected disabled>Elija una opcion</option>
                        <option value='efectivo'>Efectivo</option>
                        <option value='Transferencia Bancaria'>Transferencia Bancaria</option>
                        <option value='zelle'>Zelle</option>
                    </Form.Control>
                    <Form.Text className='text-muted'>Campo obligatorio</Form.Text>
                </Form.Group>
            </Form.Row>
            <Form.Row>
                <Form.Group as={Col}>
                    <Form.Label className='font-weight-bold text-uppercase'>BANCO</Form.Label>
                    <Form.Control required as='select' value={bank} onChange={({target}) => setBank(target.value)} disabled={method !== 'Transferencia Bancaria' ? true : false} className={method !== 'Transferencia Bancaria' ? 'form-disable' : '' } >
                        <option value='' selected disabled>Elija una opcion</option>
                        <option value='BNC'>BNC - Banco Nacional de Cretido</option>
                    </Form.Control>
                    { method === 'Transferencia Bancaria' && 
                        <Form.Text className='text-muted'>Campo obligatorio</Form.Text>
                    }
                </Form.Group>
                <Form.Group as={Col}>
                    <Form.Label className='font-weight-bold text-uppercase'># DE REFERENCIA</Form.Label>
                    <Form.Control required type='number' value={reference} placeholder='Numero de referencia' onChange={({target}) => setReference(target.valueAsNumber)} disabled={method !== 'Transferencia Bancaria' ? true : false} className={method !== 'Transferencia Bancaria' ? 'form-disable' : '' } />
                    { method === 'Transferencia Bancaria' && 
                        <Form.Text className='text-muted'>Campo obligatorio</Form.Text>
                    }
                </Form.Group>
            </Form.Row>
            <Row>
                <Col className='text-center'>
                    <Button variant='success' type='submit' className='mr-2 rounded' >CREAR</Button>
                    <Button variant='danger' className='rounded' onClick={() => setShow(false)}>CANCELAR</Button>
                </Col>
            </Row>
        </Form>
    )

    if(isModal) {
        return (
            <>
            <Button variant='success' onClick={() => setShow(true)} className='mr-2 rounded' disabled={year && month ? false : true}><FontAwesomeIcon icon={faPlusSquare} className='mr-2' />Pago</Button>
            <Modal show={show} dialogClassName='modal-m-sm' onHide={() => setShow(false)} centered onExit={() => setValid(false)} >
                <Modal.Header closeButton className='bg-success'>
                    <Modal.Title className='text-center w-100 text-white font-weight-bold' >AGREGAR PAGO</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {formjsx}
                </Modal.Body>
            </Modal>
            </>
        )
    } else return formjsx
}

export default PaymentForm