
import React, { useState, Fragment } from 'react';
import { Row, Col, Form, Button, Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import { createBill, createProvider } from '../../ducks/provider';
import CreateProvider from './CreateProvider';

//crear componente
const PaymentForm = ({ providers, createBill, isModal, month, year }) => {

    const [provider, setProvider] = useState()
    const [billnumber, setBillnumber] = useState('')
    const [amount, setAmount] = useState('')
    const [method, setMethod] = useState('')
    const [date, setDate] = useState('')
    const [comment, setComment] = useState('')
    const [currency, setCurrency] = useState('')
    const [bank, setBank] = useState("")
    const [reference, setReference] = useState("")

    const [showModal, setShowModal] = useState(false)
    const [valid, setValid] = useState(false)

    const onSubmit = (event) => {
        event.preventDefault()
        let form = event.currentTarget
        if(form.checkValidity() === false) {
            event.stopPropagation()
        } else {
            let newBill = {provider_id: provider, billnumber, amount, currency, method, bank, reference, date, comment, period:month.id+'-'+year}
            createBill(newBill)
            setProvider('')
            setBillnumber('')
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
            <Form.Group as={Row}  controlId='validation01' >
                <Form.Label column sm lg={3} >Proveedor: </Form.Label>
                <Col sm lg={7} >
                    <Form.Control required as='select' value={provider} onChange={({target}) => setProvider(target.value)} >
                        <option value='' disabled selected >Elija un proveedor</option>
                        {providers.map(x => (
                            <option value={x.id} >{x.name}</option>
                            )
                        )}
                    </Form.Control>
                </Col>
                <Col sm lg={2} >
                    <CreateProvider isModal={true} />
                </Col>
            </Form.Group>
            <Form.Group as={Row}  controlId='validation02'>
                <Form.Label column sm lg={3} ># de Factura: </Form.Label>
                <Col sm lg={7}>
                    <Form.Control required type='number' value={billnumber} placeholder='Ingrese numero de factura' onChange={({target}) => setBillnumber(target.value)} />
                </Col>
            </Form.Group>
            <Form.Group as={Row}  controlId='validation03'>
                <Form.Label column sm lg={3}>Monto: </Form.Label>
                <Col sm lg={5}>
                    <Form.Control required type='number' value={amount} placeholder='Ingrese monto' onChange={({target}) => setAmount(target.value)} />
                </Col>
                <Col sm lg={2} >
                    <Form.Check required type='radio' label='BS' name='radioForm' id='radioForm1' onChange={() => setCurrency('BS')} />
                    <Form.Check required type='radio' label='USD' name='radioForm' id='radioForm2' onChange={() => setCurrency('USD')} />
                </Col>
            </Form.Group>
            <Form.Group as={Row} controlId='validation03' >
                <Form.Label column sm={3}>Metodo de Pago: </Form.Label>
                <Col sm={7}>
                    <Form.Control  required as='select' value={method} onChange={({ target }) => setMethod(target.value)} >
                        <option value='' disabled selected hidden >Elegir metodo de pago</option>
                        <option value='Efectivo' >Efectivo</option>
                        <option value='Transferencia Bancaria' >Transferencia Bancaria</option>
                        <option value='Zelle' >Zelle</option>
                    </Form.Control>
                </Col>
            </Form.Group>
            {method === "Transferencia Bancaria" &&
            <>
                <Form.Group as={Row} >
                    <Form.Label column sm lg={3}>Banco</Form.Label>
                    <Col sm lg={7} >
                        <Form.Control required as="select" value={bank} onChange={({target}) => setBank(target.value)} >
                            <option value="" selected disabled>Elija una opcion</option>
                            <option value="BNC">BNC - Banco Nacional de Credito</option>
                        </Form.Control>
                    </Col>
                </Form.Group>
                <Form.Group as={Row}>
                    <Form.Label column sm lg={3}># de Referencia</Form.Label>
                    <Col sm lg={7}>
                        <Form.Control required type="number" value={reference} placeholder="Numero de referencia" onChange={({target}) => setReference(target.value)} />
                    </Col>
                </Form.Group>
            </>
            }
            <Form.Group as={Row}  controlId='validation04'>
                <Form.Label column sm lg={3}>Fecha: </Form.Label>
                <Col sm lg={7}>
                    <Form.Control required type='date' value={date} onChange={({target}) => setDate(target.value)} />
                </Col>
            </Form.Group>
            <Form.Group as={Row}  controlId='validation05' >
                <Form.Label column sm lg={3}>Comentarios: </Form.Label>
                <Col sm lg={7}>
                    <Form.Control required as='textarea' value={comment} rows='3' placeholder='Comentarios...' id='pay-textarea' onChange={({ target }) => setComment(target.value)} />
                </Col>
            </Form.Group>
            <Row>
                <Col className='text-center'>
                    <Button type='submit' variant='success' className='text-center'>Crear Factura</Button>
                </Col>
            </Row>
        </Form>
    )

    if(isModal){
        return (
            <Fragment>
                <Button variant='success' size='sm' onClick={() => setShowModal(true)} className='mt-3 mb-1' disabled={year ? false : true} >Agregar Pago</Button>
                <Modal show={showModal} onHide={() => setShowModal(false)} centered >
                    <Modal.Header closeButton className='bg-warning' >
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

const MSTP = state => (
    {
        providers: state.providers.providers,
        year: state.dates.year
    }
)

const MDTP = dispatch => (
    {
        createBill: (data) => dispatch(createBill(data)),
        createProvider: (data) => dispatch(createProvider(data))
    }
)

export default connect(MSTP, MDTP)(PaymentForm);
