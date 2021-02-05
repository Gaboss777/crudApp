//import librerias
import React, { Fragment, useEffect, useState } from 'react';
import {  Row, Col, Form, Button, Modal, Table } from 'react-bootstrap';
import Alerts from 'components/Utils/Alerts/alerts';
import { useDayspermonth } from 'components/Hooks/useDayspermonth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusSquare, faUserEdit, faUserPlus } from '@fortawesome/free-solid-svg-icons';

//crear componente
const PayForm = ({client, createPayment, asModal, month, year, edit, updatePayment, payment, ...rest}) => {

    const [amount, setAmount] = useState(0)
    const [method, setMethod] = useState('')
    const [reference, setReference] = useState('')
    const [date, setDate] = useState('')
    const [comment, setComment] = useState('')
    const [currency, setCurrency] = useState('')
    const [bank, setBank] = useState('')
    const [discount, setDiscount] = useState(0)
    const [concept, setConcept] = useState('')
    const [numBill, setNumBill] = useState('')
    const [numControl, setNumControl] = useState('')
    const [exchangeRate, setExchangeRate] = useState(0)
    const [arrPayments, setArrPayments] = useState([])

    const [showModal, setShowModal] = useState(false)
    const [valid, setValid] = useState(false)

    const days = useDayspermonth(month.id, year)
    const discountAmount = (amount * discount ) / 100
    const newAmount = Math.round(amount - discountAmount)
    const paymentsList = { user_id: client.id, amount: newAmount, numcontrol: numControl, numbill: numBill, method, reference, date, comment, currency, bank,period: month.id+'-'+year, discount, concept, exchangerate: exchangeRate }
    
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
            setNumBill(payment.numbill)
            setNumControl(payment.numcontrol)
            setExchangeRate(payment.exchangerate)
        }
    }, [month, edit, payment])

    const addPayments = (e) => {
        if(concept, amount, currency, exchangeRate, method, numBill, numControl, date){
            let info = arrPayments
            info.push(paymentsList)
            setAmount(0)
            setMethod('')
            setReference('')
            setComment('')
            setCurrency('')
            setBank('')
            setDiscount(0)
            setConcept('')
            setExchangeRate(0)
        } else {
            Alerts.RemoveNotify('Complete todos los campos')
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
            // let newPayment = { user_id:client.id, amount: newAmount, numControl, numBill, method, reference, date, comment, currency, bank,period:month.id+'-'+year, discount, concept }
            if(edit){
                updatePayment({...paymentsList, id: payment.id})
                Alerts.EditNotify('PAGO ACTUALZIADO')
            } else {
                arrPayments.forEach(x => createPayment(x))
                // createPayment(newPayment)
                Alerts.InfoNotify("PAGOS AGREGADOS")
            }
            setDate('')
            setNumBill('')
            setNumControl('')
            setArrPayments([])
            setShowModal(false)
        }
        setValid(true)
    }

    const tablePayments = (
        <Table className='text-center' size='sm' responsive striped bordered >
            <thead className='bg-success text-white'>
                <tr>
                    <th>CONCEPTO</th>
                    <th>MONTO</th>
                    <th>MONEDA</th>
                    <th>DESCUENTO</th>
                    <th>METODO</th>
                    <th>TASA</th>
                    <th>BANCO</th>
                    <th>REFERENCIA</th>
                </tr>
            </thead>
            <tbody>
                {arrPayments.map(data => 
                    <tr>
                        <td>{data.concept}</td>
                        <td>{data.amount}</td>
                        <td>{data.currency}</td>
                        <td>{data.discount} %</td>
                        <td>{data.method}</td>
                        <td>{data.exchangerate}</td>
                        <td>{data.bank}</td>
                        <td>{data.reference}</td>
                    </tr>
                )}
            </tbody>
        </Table>
    )

    const formPay = (
        <Col>
            <Form onSubmit={onSubmit} noValidate validated={valid} >
            {/* Primera Linea */}
                <Form.Row>
                    <Form.Group as={Col} sm lg={6} className='mb-0'>
                        <Form.Label className='font-weight-bold text-uppercase mb-1'>Razon Social</Form.Label>
                        <Form.Control type='text' size='sm' value={client.name} readOnly className='form-disabled' />
                    </Form.Group>
                    <Form.Group as={Col} sm lg={2} controlId='validation04' className='mb-0'>
                        <Form.Label className='font-weight-bold text-uppercase mb-1'># Factura</Form.Label>
                        <Form.Control required type='text' size='sm' value={numBill} onChange={({target}) => setNumBill(target.value)} />
                        <Form.Text className='text-muted mb-2'>Obligatorio</Form.Text>
                    </Form.Group>
                    <Form.Group as={Col} sm lg={2} controlId='validation01' className='mb-0'>
                        <Form.Label className='font-weight-bold text-uppercase mb-1'># Control</Form.Label>
                        <Form.Control required type='text' size='sm' value={numControl} onChange={({target}) => setNumControl(target.value)} />
                        <Form.Text className='text-muted mb-2'>Obligatorio</Form.Text>
                    </Form.Group>
                    <Form.Group as={Col} sm lg={2} controlId='validation04' className='mb-0'>
                        <Form.Label className='font-weight-bold text-uppercase mb-1'>Fecha Pago</Form.Label>
                        <Form.Control required type='date' size='sm' min={`${year}-${month.id}-01`} max={`${year}-${month.id}-${days}`}  value={date} onChange={({ target }) => setDate(target.value)} />
                        <Form.Text className='text-muted mb-2'>Obligatorio</Form.Text>
                    </Form.Group>
                </Form.Row>
            {/* Segunda Linea */}
                <Form.Row className={edit ? ' ' : 'border border-dark border-3 rounded p-2 mb-2' } >
                    {!edit && 
                        <Col sm lg={12}>
                            <h5 className='text-center font-weight-bold'>AGREGAR PAGO</h5>
                        </Col>
                    }
                    <Form.Group as={Col} sm lg={3} controlId='validation20' className='mb-0' >
                        <Form.Label className='font-weight-bold text-uppercase mb-1'>Concepto:</Form.Label>
                        <Form.Control as='select' size='sm' value={concept} onChange={({target}) => setConcept(target.value)} >
                            <option value=''>...</option>
                            <option value='servicio'>Servicio</option>
                            <option value='alquiler'>Alquiler</option>
                            <option value='mantenimiento'>Mantenimiento</option>
                            <option value='instalacion'>Instalacion</option>
                            <option value='iva'>IVA</option>
                            <option value='otros'>Otros</option>
                        </Form.Control>
                        <Form.Text className='text-muted mb-2'>Obligatorio</Form.Text>
                    </Form.Group>
                    <Form.Group as={Col} sm lg={3} controlId='validation02' className='mb-0' >
                        <Form.Label className='font-weight-bold text-uppercase mb-1'>Monto</Form.Label>
                        <Form.Control type='number' min='0' step='any' size='sm' value={amount} onChange={({ target }) => setAmount(target.value)} />
                        <Form.Text className='text-muted mb-2'>Obligatorio</Form.Text>
                    </Form.Group>
                    <Form.Group as={Col} sm lg={2} controlId='validation11' className='mb-0'>
                        <Form.Label className='font-weight-bold text-uppercase mb-1'>Moneda</Form.Label>
                        <Form.Control as='select' size='sm' value={currency} onChange={({target}) => setCurrency(target.value)}>
                            <option value=''>...</option>
                            <option value='BS'>Bolivares</option>
                            <option value='USD'>Dolares</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group as={Col} sm lg={2} classNAme='mb-0'>
                        <Form.Label className='font-weight-bold text-uppercase mb-1'>Descuento</Form.Label>
                        <Form.Control type='number' size='sm' value={discount} onChange={({target}) => setDiscount(target.value)} disabled={concept === 'iva' ? true : false} className={concept === 'iva' ? 'form-disable' : ''} />
                    </Form.Group>
                    <Form.Group as={Col} sm lg={2} className='mb-0'>
                        <Form.Label className='font-weight-bold text-uppercase mb-1'>Tasa de cambio</Form.Label>
                        <Form.Control type='number' size='sm' value={exchangeRate} onChange={({target}) => setExchangeRate(target.valueAsNumber)} disabled={currency === 'BS' ? false : true} className={currency === 'BS' ? '' : 'form-disable'} />
                    </Form.Group>
                {/* </Form.Row>
                <Form.Row> */}
                    <Form.Group as={Col} sm lg={4} controlId='validation03' className='mb-0' >
                        <Form.Label className='font-weight-bold text-uppercase mb-1'>Metodo de Pago</Form.Label>
                        <Form.Control as='select' size='sm' value={method} onChange={({ target }) => setMethod(target.value)} >
                            <option value='' disabled selected hidden >...</option>
                            <option value='Efectivo' >Efectivo</option>
                            <option value='Credito de Cortesia' >Credito de Cortesia</option>
                            <option value='Transferencia Bancaria' >Transferencia Bancaria</option>
                            <option value='Zelle' >Zelle</option>
                        </Form.Control>
                        <Form.Text className='text-muted mb-2'>Obligatorio</Form.Text>
                    </Form.Group>
                    <Form.Group as={Col} sm lg={5} controlId='validation06' className='mb-0' >
                            <Form.Label className='font-weight-bold text-uppercase mb-1'>Banco</Form.Label>
                            <Form.Control as='select' size='sm' value={bank} onChange={({ target }) => setBank(target.value)} disabled={method !== 'Transferencia Bancaria' ? true : false} className={method !== 'Transferencia Bancaria' ? 'form-disable' : '' }>
                                <option value='' selected disabled>...</option>
                                <option value='BNC'>BNC - Banco Nacional de Credito</option>
                            </Form.Control>
                            { method === 'Transferencia Bancaria' &&
                                <Form.Text className='text-muted mb-2'>Obligatorio</Form.Text>
                            }
                        </Form.Group>
                        <Form.Group as={Col} sm lg={3} controlId='validation07' className='mb-0'>
                            <Form.Label className='font-weight-bold text-uppercase mb-1'># de Referencia</Form.Label>
                            <Form.Control required type='number' size='sm' value={reference} onChange={({ target }) => setReference(target.valueAsNumber) } disabled={method !== 'Transferencia Bancaria' ? true : false} className={method !== 'Transferencia Bancaria' ? 'form-disable' : '' } />
                            { method === 'Transferencia Bancaria' && 
                                <Form.Text className='text-muted mb-2'>Obligatorio</Form.Text>
                            }
                        </Form.Group>
                        <Form.Group as={Col} sm lg={12} controlId='validation05'>
                            <Form.Label className='font-weight-bold text-uppercase mb-1'>Comentarios: </Form.Label>
                            <Form.Control as='textarea' value={comment} rows='1' id='pay-textarea' onChange={({ target }) => setComment(target.value)} />
                        </Form.Group>
                        { !edit &&
                            <Col sm lg={12} className='text-center'>
                                <Button variant='primary' className='rounded' onClick={addPayments}>AGREGAR</Button>
                            </Col>
                        }
                </Form.Row>
                { !edit &&
                    <>
                    <h5 className='text-center font-weight-bold'>PAGOS</h5>
                    {tablePayments}
                    </>
                }
                <Col className='text-center'>
                    <Button variant='success' type='submit' className='mr-2 rounded' disabled={arrPayments ? false : true} >{edit ? 'EDITAR' : 'CREAR'}</Button>
                    <Button variant='danger' onClick={() => setShowModal(false)} className='ml-2 rounded'>CANCELAR</Button>
                </Col>
            </Form>
        </Col>
        )

    if (asModal) {
        return (
            <Fragment>
                <Button size='sm' variant={edit ? 'primary' : 'success'} onClick={() => setShowModal(true)} className='ml-2 rounded' {...rest} >{edit ? <FontAwesomeIcon icon={faUserEdit} /> : <FontAwesomeIcon icon={faPlusSquare} className='mr-2' />}{!edit && 'PAGOS'} </Button>
                <Modal show={showModal} onHide={() => setShowModal(false)} onExit={() => setValid(false)} dialogClassName='modal-m-lg' >
                    <Modal.Header closeButton className='bg-success py-1' >
                        <Modal.Title className='text-center w-100 text-white font-weight-bold' >{edit ? 'EDITAR' : 'REGISTRAR'} PAGO</Modal.Title>
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
