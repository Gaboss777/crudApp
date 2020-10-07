import React, { Fragment, useState } from 'react'
import { Button, Col, Form, Modal, Row } from 'react-bootstrap'
import { connect } from 'react-redux'
import { createEmployee } from '../../ducks/rrhh'

const EmployeeForm = ({ isModal, createEmployee }) => {

    const [name, setName] = useState('')
    const [lastName, setLastName] = useState('')
    const [document, setDocument] = useState('')
    const [initialDate, setInitialDate] = useState('')
    const [salary, setSalary] = useState('')

    const [show, setShow] = useState(false)

    const onSubmit = (event) => {
        event.preventDefault()
        let newEmployee = { name, lastName, document, initialDate, salary }
        createEmployee(newEmployee)
        setShow(false)
        setName('')
        setLastName('')
        setDocument('')
        setInitialDate('')
        setSalary('')
    }

    const form = (
        <Form onSubmit={onSubmit}>
        <Form.Row>
            <Form.Group as={Col}>
                <Form.Label>NOMBRE:</Form.Label>
                <Form.Control type='text' value={name} placeholder='Indique Nombres...' onChange={({target}) => setName(target.value)} />
            </Form.Group>
            <Form.Group as={Col}>
                <Form.Label>APELLIDO:</Form.Label>
                <Form.Control type='text' value={lastName} placeholder='Ingrese Apellidos..' onChange={({target}) => setLastName(target.value)} />
            </Form.Group>
        </Form.Row>
            <Form.Group>
                <Form.Label>Cedula:</Form.Label>
                <Form.Control type='number' value={document} placeholder='Indique Cedula...' onChange={({target}) => setDocument(target.value)} />
            </Form.Group>
            <Form.Group>
                <Form.Label>Fecha de Ingreso:</Form.Label>
                <Form.Control type='date' value={initialDate} onChange={({target}) => setInitialDate(target.value)} />
            </Form.Group>
            <Form.Group>
                <Form.Label>Salario:</Form.Label>
                <Form.Control type='number' value={salary} placeholder='Ingrese Salario...' onChange={({target}) => setSalary(target.value)} />
            </Form.Group>
            <Row>
                <Col className='text-center' >
                    <Button variant='success' type='submit'>Crear</Button>
                    <Button variant='danger' type='submit' onClick={() => setShow(false)} >Cancelar</Button>
                </Col>
            </Row>
        </Form>
    )

    if(isModal) {
        return(
        <Fragment>
            <Button variant='primary' onClick={() => setShow(true)} size='sm' className='my-2' >Crear Empleado</Button>
            <Modal show={show} onHide={() => setShow(false)} centered >
                <Modal.Header closeButton className='bg-warning' >
                    <Modal.Title className='text-center w-100 text-white' >CREAR EMPLEADO</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {form}
                </Modal.Body>
            </Modal>
        </Fragment>
        )
    } else return form
}

const MDTP = dispatch => (
    {
        createEmployee: (data) => dispatch(createEmployee(data))
    }
)

export default connect(null, MDTP)(EmployeeForm)