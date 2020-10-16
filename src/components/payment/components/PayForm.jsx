//import librerias
import React, { Fragment, useEffect, useState } from 'react';
import {  Row, Col, Form, Button, Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import Alerts from '../../Alerts/alerts';
import { createPayment } from '../../../ducks/payment';

//crear componente
const PayForm = ({client, createPayment, asModal, month,disabled, year}) => {

    const [amount, setAmount] = useState('')
    const [method, setMethod] = useState('')
    const [reference, setReference] = useState('')
    const [date, setDate] = useState('')
    const [comment, setComment] = useState('')
    const [currency, setCurrency] = useState('')
    const [bank, setBank] = useState('')
    const [discount, setDiscount] = useState(0)
    const [concept, setConcept] = useState('')
    const [check, setCheck] = useState(false)

    const [imgUrl, setImgUrl] = useState()
    const [preview, setPreview] = useState()

    const [showModal, setShowModal] = useState(false)

    const [valid, setValid] = useState(false)

    useEffect(() => {
        if (!imgUrl){
            setPreview(undefined)
            return
        }

        const objectUrl = URL.createObjectURL(imgUrl)
        setPreview(objectUrl)
        return () => URL.revokeObjectURL(objectUrl)
    }, [imgUrl])

    const onSubmit = (event) => {
        event.preventDefault()
        const form = event.currentTarget
        if (form.checkValidity() === false) {
            event.stopPropagation()
        } else {
            let newPayment = { user_id:client.id, amount, method, reference, date, comment, currency, bank,period:month.id+'-'+year, discount, imgUrl, concept }
            createPayment(newPayment)
            Alerts.InfoNotify("PAGO AGREGADO")
            setAmount('')
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
        }
        setValid(true)
    }

    const handlerImage = (event) => {
        if( !event.target.files || event.target.length === 0) {
            setImgUrl(undefined)
            return
        }
        setImgUrl(event.target.files[0])
    }

    const formPay = (
        <Col>
            <Form onSubmit={onSubmit} noValidate validated={valid} >
            <Form.Row>
                <Form.Group as={Col} sm lg={8} controlId='validation01' >
                    <Form.Label>Razon Social: </Form.Label>
                    <Form.Control required type='text' value={client.name} placeholder='Razon Social' plaintext readOnly className='client-payment pl-2' />
                    <Form.Text className='text-muted'>Campo obligatorio</Form.Text>
                </Form.Group>
                <Form.Group as={Col} sm lg={4} controlId='validation04'>
                    <Form.Label>Mes: </Form.Label>
                    <Form.Control required type='text' value={month.name} placeholder='MES' plaintext readOnly className='client-payment pl-2 text-uppercase' />
                    <Form.Text className='text-muted'>Campo obligatorio</Form.Text>
                </Form.Group>
            </Form.Row>
            <Form.Row>
                <Form.Group as={Col} sm lg={6} controlId='validation02' >
                    <Form.Label>Monto: </Form.Label>
                    <Form.Control required type='number' value={amount} placeholder='Indique monto' onChange={({ target }) => setAmount(target.value)} />
                    <Form.Text className='text-muted'>Campo obligatorio</Form.Text>
                </Form.Group>
                <Form.Group as={Col} sm lg={3} controlId='validation11'>
                    <Form.Label>Moneda:</Form.Label>
                    <Form.Check required type='radio' label='BS' name='radioForm' id='radioForm1' onChange={() => setCurrency('BS')} />
                    <Form.Check required type='radio' label='USD' name='radioForm' id='radioForm2' onChange={() => setCurrency('USD')} />
                    <Form.Check type='checkbox' label='Descuento' name='checkDiscount' id='checkForm3' onChange={({target}) => setCheck(target.checked)} />
                    <Form.Text className='text-muted'>Campo obligatorio: BS o USD</Form.Text>
                </Form.Group>
                <Form.Group as={Col} sm lg={3} controlId='validation10'  >
                    <Form.Label >Descuento %: </Form.Label>
                    <Form.Control required type='number' value={discount} onChange={({ target }) => setDiscount(target.value)} disabled={check ? false : true} className={!check ? 'client-payment' : '' } />
                    <Form.Text className='text-muted'>Campo obligatorio</Form.Text>
                </Form.Group>
            </Form.Row>
                <Form.Group as={Row} controlId='validation03' >
                    <Form.Label column sm={4}>Metodo de Pago: </Form.Label>
                    <Col sm={8}>
                        <Form.Control  required as='select' value={method} onChange={({ target }) => setMethod(target.value)} >
                            <option value='' disabled selected hidden >Elegir metodo de pago</option>
                            <option value='Efectivo' >Efectivo</option>
                            <option value='Credito de Cortesia' >Credito de Cortesia</option>
                            <option value='Transferencia Bancaria' >Transferencia Bancaria</option>
                            <option value='Zelle' >Zelle</option>
                        </Form.Control>
                        <Form.Text className='text-muted'>Campo obligatorio</Form.Text>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} controlId='validation20' >
                    <Form.Label column sm={4}>Concepto:</Form.Label>
                    <Col sm={8}>
                        <Form.Control required as='select' value={concept} onChange={({target}) => setConcept(target.value)} >
                            <option value='' selected disabled>Elija una opcion</option>
                            <option value='mensualidad'>Mensualidad</option>
                            <option value='alquiler'>Alquiler</option>
                            <option value='otros'>Otros</option>
                        </Form.Control>
                        <Form.Text className='text-muted'>Campo obligatorio</Form.Text>
                    </Col>
                </Form.Group>
                {method === 'Transferencia Bancaria' &&
                    <>
                    <Form.Group as={Row} controlId='validation06' >
                        <Form.Label column sm={4}>Banco: </Form.Label>
                        <Col sm={8}>
                            <Form.Control required as='select' value={bank} onChange={({ target }) => setBank(target.value) }>
                                <option value='' selected disabled>Elija una opcion</option>
                                <option value='BNC'>BNC - Banco Nacional de Credito</option>
                            </Form.Control>
                            <Form.Text className='text-muted'>Campo obligatorio</Form.Text>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId='validation07'>
                        <Form.Label column sm={4}># de Referencia: </Form.Label>
                        <Col sm={8}>
                            <Form.Control required type='number' value={reference} placeholder='Numero de Referencia' onChange={({ target }) => setReference(target.value) } />
                            <Form.Text className='text-muted'>Campo obligatorio</Form.Text>
                        </Col>
                    </Form.Group>
                    </>
                }
                <Form.Group as={Row} controlId='validation04'>
                    <Form.Label column sm={4}>Fecha de Pago: </Form.Label>
                    <Col sm={8}>
                        <Form.Control required type='date' value={date} placeholder='Indique fecha' onChange={({ target }) => setDate(target.value)} />
                        <Form.Text className='text-muted'>Campo obligatorio</Form.Text>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} controlId='validation05'>
                    <Form.Label column sm={4}>Comentarios: </Form.Label>
                    <Col sm={8} >
                        <Form.Control as='textarea' value={comment} rows='3' placeholder='Comentarios...' id='pay-textarea' onChange={({ target }) => setComment(target.value)} />
                    </Col>
                </Form.Group>
                <Form.Group as={Row}>
                    <Form.Label column sm={4}>Archivo Adjunto: </Form.Label>
                    <Col sm={8}>
                        <Form.File label='Elija un archivo' onChange={handlerImage} custom data-browse='Agregar' accept='image/*' />
                    </Col>
                </Form.Group>
                { imgUrl &&
                <>
                    <h5 className='text-center'>VISTA PREVIA</h5>
                    <p className='text-center'>Nombre del archivo: {imgUrl.name}</p>
                    <div className='mb-3 px-auto'>
                        <img src={preview} alt='factura' height='350' className='center-img' />
                    </div>
                </>
                }
                <Col className='text-center'>
                    <Button variant='success' type='submit' className='mr-2' >Crear Pago</Button>
                </Col>
            </Form>
        </Col>
        )

    if (asModal) {
        return (
            <Fragment>
                <Button size='sm' variant='success' onClick={() => setShowModal(true)} className='ml-2' disabled={disabled}>AGREGAR PAGO</Button>
                <Modal show={showModal} onHide={() => setShowModal(false)} centered onExit={() => setValid(false)} >
                    <Modal.Header closeButton className='bg-warning' >
                        <Modal.Title className='text-center w-100 text-white' >AGREGAR PAGO</Modal.Title>
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

const MSTP = state => (
    {
        client: state.payment.client,
        year: state.dates.year
    }
)

const MDTP = dispatch => (
    {
        createPayment: (data) => dispatch(createPayment(data))
    }
)

export default connect(MSTP, MDTP)(PayForm);
