//import librerias
import React, { Fragment, useEffect, useState } from 'react';
import {  Row, Col, Form, Button, Modal } from 'react-bootstrap';
import Alerts from '../../Alerts/alerts';

//crear componente
const PayForm = ({client, createPayment, asModal, month, disabled, year}) => {

    const [amount, setAmount] = useState(0)
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
    const [days, setDays] = useState()

    const discountAmount = (amount * discount ) / 100
    const newAmount = Math.round(amount - discountAmount)

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

        if (!imgUrl){
            setPreview(undefined)
            return
        }

        const objectUrl = URL.createObjectURL(imgUrl)
        setPreview(objectUrl)
        return () => URL.revokeObjectURL(objectUrl)
    }, [imgUrl, month])

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
            let newPayment = { user_id:client.id, amount: newAmount, method, reference, date, comment, currency, bank,period:month.id+'-'+year, discount, concept }
            createPayment(newPayment)
            Alerts.InfoNotify("PAGO AGREGADO")
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
        }
        setValid(true)
    }

    const onFileUpload = (event) => {
        const file =  event.target.files[0]
        console.log(event)
        if( !event.target.files || event.target.length === 0) {
            setImgUrl(undefined)
            return
        }
        if (file.size > 2097152) {
            Alerts.RemoveNotify('Tamano de archivo mayor a 2 MB')
        } else {
            setImgUrl(file)
        }
    }

    const formPay = (
        <Col>
            <Form onSubmit={onSubmit} noValidate validated={valid} >
            <Form.Row>
                <Form.Group as={Col} sm lg={6} controlId='validation01' >
                    <Form.Label>Razon Social</Form.Label>
                    <Form.Control required type='text' value={client.name} placeholder='Razon Social' plaintext readOnly className='form-disable pl-2' />
                </Form.Group>
                <Form.Group as={Col} sm lg={3} controlId='validation04'>
                    <Form.Label>Mes</Form.Label>
                    <Form.Control required type='text' value={month.name} placeholder='MES' plaintext readOnly className='form-disable pl-2 text-uppercase' />
                </Form.Group>
                <Form.Group as={Col} sm lg={3} controlId='validation04'>
                    <Form.Label>Fecha de Pago</Form.Label>
                    <Form.Control required type='date' min={`${year}-${month.id}-01`} max={`${year}-${month.id}-${days}`}  value={date} placeholder='Indique fecha' onChange={({ target }) => setDate(target.value)} />
                    <Form.Text className='text-muted'>Campo obligatorio</Form.Text>
                </Form.Group>
            </Form.Row>
            <Form.Row>
                <Form.Group as={Col} sm lg={3} controlId='validation02' >
                    <Form.Label>Monto</Form.Label>
                    <Form.Control required type='number' value={amount} placeholder='Indique monto' onChange={({ target }) => setAmount(target.valueAsNumber)} />
                    <Form.Text className='text-muted'>Campo obligatorio</Form.Text>
                </Form.Group>
                <Form.Group as={Col} sm lg={2} controlId='validation11'>
                    <Form.Label>Moneda</Form.Label>
                    <Form.Check required type='radio' label='BS' name='radioForm' id='radioForm1' onChange={() => setCurrency('BS')} />
                    <Form.Check required type='radio' label='USD' name='radioForm' id='radioForm2' onChange={() => setCurrency('USD')} />
                    <Form.Text className='text-muted mt-3'>Campo Obligatorio</Form.Text>
                </Form.Group>
                <Form.Group as={Col} sm lg={4} controlId='validation10'  >
                    <Form.Label><Form.Check type='checkbox' label='Descuento %' name='checkDiscount' id='checkForm3' onChange={({target}) => handleCheck(target.checked)} /></Form.Label>
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
                    <Form.Label>Concepto:</Form.Label>
                    <Form.Control required as='select' value={concept} onChange={({target}) => setConcept(target.value)} >
                        <option value='' selected disabled>Elija una opcion</option>
                        <option value='mensualidad'>Mensualidad</option>
                        <option value='alquiler'>Alquiler</option>
                        <option value='otros'>Otros</option>
                    </Form.Control>
                    <Form.Text className='text-muted'>Campo obligatorio</Form.Text>
                </Form.Group>
            </Form.Row>
            <Form.Row>
                <Form.Group as={Col} sm lg={4} controlId='validation03' >
                    <Form.Label>Metodo de Pago</Form.Label>
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
                        <Form.Label>Banco</Form.Label>
                        <Form.Control required as='select' value={bank} onChange={({ target }) => setBank(target.value)} disabled={method !== 'Transferencia Bancaria' ? true : false} className={method !== 'Transferencia Bancaria' ? 'form-disable' : '' }>
                            <option value='' selected disabled>Elija una opcion</option>
                            <option value='BNC'>BNC - Banco Nacional de Credito</option>
                        </Form.Control>
                        { method === 'Transferencia Bancaria' && 
                            <Form.Text className='text-muted'>Campo obligatorio</Form.Text>
                        }
                    </Form.Group>
                    <Form.Group as={Col} sm lg={3} controlId='validation07'>
                        <Form.Label># de Referencia</Form.Label>
                        <Form.Control required type='number' value={reference} placeholder='Numero de Referencia' onChange={({ target }) => setReference(target.valueAsNumber) } disabled={method !== 'Transferencia Bancaria' ? true : false} className={method !== 'Transferencia Bancaria' ? 'form-disable' : '' } />
                        { method === 'Transferencia Bancaria' && 
                            <Form.Text className='text-muted'>Campo obligatorio</Form.Text>
                        }
                    </Form.Group>
            </Form.Row>
                <Form.Group as={Row} controlId='validation05'>
                    <Form.Label column sm={2}>Comentarios: </Form.Label>
                    <Col sm={10} >
                        <Form.Control as='textarea' value={comment} rows='3' placeholder='Comentarios...' id='pay-textarea' onChange={({ target }) => setComment(target.value)} />
                    </Col>
                </Form.Group>
                {/* <Form.Group as={Row}>
                    <Form.Label column sm={4}>Archivo Adjunto: </Form.Label>
                    <Col sm={8}>
                        <Form.File label='Elija un archivo' onChange={onFileUpload} custom data-browse='Agregar' accept='image/*' />
                        <Form.Text className='text-muted'>Maximo: 2Mb</Form.Text>
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
                } */}
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
                <Button size='sm' variant='success' onClick={() => setShowModal(true)} className='ml-2' disabled={disabled}>AGREGAR PAGO</Button>
                <Modal show={showModal} onHide={() => setShowModal(false)} centered onExit={() => setValid(false)} dialogClassName='modal-m-sm' >
                    <Modal.Header closeButton className='bg-success' >
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

export default PayForm
