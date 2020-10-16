import { faUserPlus, faUserEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Fragment, useState, useEffect } from 'react';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import { createEmployee, updateEmployee } from '../../../ducks/rrhh';
import Alerts from '../../Alerts/alerts';

const EmployeeForm = ({ isModal, createEmployee, ocupations, editing, user, selection, updateEmployee }) => {

    const [firstName, setFirstName] = useState(user ? user.firstName : '')
    const [secondName, setSecondName] = useState(user ? user.secondName : '')
    const [lastName, setLastName] = useState(user ? user.lastName : '')
    const [secondSurname, setSecondSurname] = useState(user ? user.secondSurname : '')
    const [document, setDocument] = useState(user ? user.document : '')
    const [initialDate, setInitialDate] = useState(user ? user.initialDate : '')
    const [lastDate, setLastDate] = useState(user ? user.lastDate : '')
    const [salary, setSalary] = useState(user ? user.salary : '')
    const [ocupation, setOcupation] = useState(user ? user.ocupation : '')
    const [count, setCount] = useState(0)

    const [check, setCheck] = useState(false)
    const [show, setShow] = useState(false)
    const [valid, setValid] = useState(false)

    useEffect(() => {
        if (user && editing) {
            setFirstName(user.firstName)
            setSecondName(user.secondName)
            setLastName(user.lastName)
            setSecondSurname(user.secondSurname)
            setDocument(user.document)
            setInitialDate(user.initialDate)
            setLastDate(user.lastDate)
            setSalary(user.salary)
            setOcupation(user.ocupation)
        }
    }, [user, editing])

    const onSubmit = (event) => {
        event.preventDefault()
        let form = event.currentTarget
        const id = count + 1
        if(form.checkValidity() === false) {
            event.stopPropagation()
        } else {
            setCount(id)
            let newEmployee = { id: count, firstName, secondName, lastName, secondSurname, document, initialDate, lastDate, salary, ocupation }
            console.log(newEmployee)
            if(!user){
                createEmployee(newEmployee)
                Alerts.InfoNotify('EMPLEADO CREADO')
            } else {
                updateEmployee(newEmployee)
                Alerts.EditNotify('DATOS ACTUALIZADOS')
            }
            setShow(false)
            setFirstName('')
            setSecondName('')
            setLastName('')
            setSecondSurname('')
            setDocument('')
            setInitialDate('')
            setLastDate('')
            setSalary('')
            setOcupation('')
            setCheck(false)
        }
        setValid(true)
    }

    console.log(ocupations)

    const formEmploye = (
        <Form onSubmit={onSubmit} noValidate validated={valid}>
        <Form.Row>
            <Form.Group as={Col} controlId='validation01'>
                <Form.Label>Primer Nombre *</Form.Label>
                <Form.Control required type='text' value={firstName} placeholder='Indique Primer nombre...' onChange={({target}) => setFirstName(target.value)} />
                <Form.Text className='text-muted'>Campo obligatorio</Form.Text>
            </Form.Group>
            <Form.Group as={Col} >
                <Form.Label>Segundo Nombre</Form.Label>
                <Form.Control type='text' value={secondName} placeholder='Indique Segundo nombre...' onChange={({target}) => setSecondName(target.value)} />
            </Form.Group>
            <Form.Group as={Col} controlId='validation02'>
                <Form.Label>Primer Apellido *</Form.Label>
                <Form.Control required type='text' value={lastName} placeholder='Ingrese Primer apellido..' onChange={({target}) => setLastName(target.value)} />
                <Form.Text className='text-muted'>Campo obligatorio</Form.Text>
            </Form.Group>
            <Form.Group as={Col}>
                <Form.Label>Segundo Apellido</Form.Label>
                <Form.Control type='text' value={secondSurname} placeholder='Indique Segundo nombre...' onChange={({target}) => setSecondSurname(target.value)} />
            </Form.Group>
        </Form.Row>
        <Form.Row>
            <Form.Group as={Col} controlId='validation03'>
                <Form.Label>Cedula *</Form.Label>
                <Form.Control required type='number' value={document} placeholder='Indique Cedula...' onChange={({target}) => setDocument(target.value)} />
                <Form.Text className='text-muted'>Campo obligatorio</Form.Text>
            </Form.Group>
            <Form.Group as={Col} controlId='validation04'>
                <Form.Label>Fecha de Ingreso *</Form.Label>
                <Form.Control required type='date' value={initialDate} onChange={({target}) => setInitialDate(target.value)} />
                <Form.Text className='text-muted'>Campo obligatorio</Form.Text>
            </Form.Group>
            <Form.Group as={Col} controlId='validation07'>
                <Row>
                    <Col sm lg={6}><Form.Label>Fecha de Egreso:</Form.Label></Col>
                    <Col sm lg={6}><Form.Check className='w-50' type='checkbox' label='Actualmente' name='checkForm' id='checkForm1' onChange={({target}) => setCheck(target.checked)} /></Col>
                </Row>
                <Form.Control type='date' value={lastDate} onChange={({target}) => setLastDate(target.value)} disabled={check ? true : false } />
            </Form.Group>
        </Form.Row>
        <Form.Row>
            <Form.Group as={Col} controlId='validation05'>
                <Form.Label>Cargo *</Form.Label>
                <Form.Control required as='select' value={ocupation} onChange={({target}) => setOcupation(target.value)} aria-describedby='add-ocupation1' >
                    <option value='' selected disabled >Elija un cargo</option>
                    {ocupations.map(x =>
                        <option value={x.id}>{x.name}</option>
                    )}
                </Form.Control>
                <Form.Text className='text-muted'>Campo obligatorio</Form.Text>
            </Form.Group>
            <Form.Group as={Col} controlId='validation06'>
                <Form.Label>Salario *</Form.Label>
                <Form.Control required type='number' value={salary} placeholder='Ingrese Salario...' onChange={({target}) => setSalary(target.value)} />
                <Form.Text className='text-muted'>Campo obligatorio</Form.Text>
            </Form.Group>
        </Form.Row>
            <Row>
                <Col className='text-center' >
                    <Button variant='success' type='submit' className='mr-2'>{editing ? 'EDITAR' : 'CREAR'}</Button>
                    <Button variant='danger' type='submit' onClick={() => setShow(false)} >Cancelar</Button>
                </Col>
            </Row>
        </Form>
    )

    if(isModal) {
        return(
        <Fragment>
            <Button disabled={editing ? selection.length !== 1 : false} variant='warning' onClick={() => setShow(true)} className='my-2' ><FontAwesomeIcon icon={editing ? faUserEdit : faUserPlus} size='lg' /></Button>
            <Modal show={show} onHide={() => setShow(false)} centered onExit={() => setValid(false)} size='lg' >
                <Modal.Header closeButton className='bg-warning' >
                    <Modal.Title className='text-center w-100 text-white' >{editing ? 'EDITAR EMPLEADO' : 'CREAR EMPLEADO'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {formEmploye}
                </Modal.Body>
            </Modal>
        </Fragment>
        )
    } else return formEmploye
}

const MSTP = state => (
    {
        user: state.rrhh.selected[0],
        selection: state.rrhh.selected,
        ocupations: state.rrhh.ocupations
    }
)

const MDTP = dispatch => (
    {
        createEmployee: (data) => dispatch(createEmployee(data)),
        updateEmployee: (data) => dispatch(updateEmployee(data))
    }
)

export default connect(MSTP, MDTP)(EmployeeForm)