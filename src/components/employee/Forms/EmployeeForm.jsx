import { faUserPlus, faUserEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Fragment, useState, useEffect } from 'react';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import { createEmployee, getOcupationsList, updateEmployee } from '../../../ducks/rrhh';
import Alerts from '../../Alerts/alerts';
import moment from 'moment';

const EmployeeForm = ({ isModal, createEmployee, ocupations, editing, user, selection, updateEmployee, getOcupationsList }) => {

    const [firstname, setFirstname] = useState('')
    const [secondname, setSecondname] = useState('')
    const [lastname, setLastname] = useState('')
    const [secondsurname, setSecondsurname] = useState('')
    const [document, setDocument] = useState('')
    const [initialdate, setInitialdate] = useState('')
    const [lastdate, setLastdate] = useState('')
    const [salary, setSalary] = useState('')
    const [ocupation, setOcupation] = useState('')

    const [check, setCheck] = useState(false)
    const [show, setShow] = useState(false)
    const [valid, setValid] = useState(false)

    useEffect(() => {
        getOcupationsList()
        if (user && editing) {
            setFirstname(user.firstname)
            setSecondname(user.secondname)
            setLastname(user.lastname)
            setSecondsurname(user.secondsurname)
            setDocument(user.document)
            setInitialdate(moment(user.initialdate, 'YYYY-MM-DD').format('YYYY-MM-DD'))
            setLastdate(user.lastdate === null ? '' : moment(user.lastdate, 'YYYY-MM-DD').format('YYYY-MM-DD'))
            setSalary(user.salary)
            setOcupation(user.ocupation_id)
        }
    }, [user, editing])

    const handleCheck = (e) => {
        setCheck(e.target.checked)
        if(check) {
            setLastdate(null)
            setCheck(false)
        }
    }

    const onSubmit = (event) => {
        event.preventDefault()
        let form = event.currentTarget
        if(form.checkValidity() === false) {
            event.stopPropagation()
        } else {
            let newEmployee = { firstname, secondname, lastname, secondsurname, document, initialdate, lastdate, salary, ocupation_id: ocupation }
            if(!user){
                createEmployee(newEmployee)
                Alerts.InfoNotify('EMPLEADO CREADO')
            } else {
                updateEmployee({...newEmployee, id: user.id})
                Alerts.EditNotify('DATOS ACTUALIZADOS')
            }
            setShow(false)
            setFirstname('')
            setSecondname('')
            setLastname('')
            setSecondsurname('')
            setDocument('')
            setInitialdate('')
            setLastdate('')
            setSalary('')
            setOcupation('')
            setCheck(false)
        }
        setValid(true)
    }
    console.log(lastdate)
    console.log(check)

    const formEmploye = (
        <Form onSubmit={onSubmit} noValidate validated={valid}>
        <Form.Row>
            <Form.Group as={Col} controlId='validation01'>
                <Form.Label>Primer Nombre *</Form.Label>
                <Form.Control required type='text' value={firstname} placeholder='Indique Primer nombre...' onChange={({target}) => setFirstname(target.value)} />
                <Form.Text className='text-muted'>Campo obligatorio</Form.Text>
            </Form.Group>
            <Form.Group as={Col} >
                <Form.Label>Segundo Nombre</Form.Label>
                <Form.Control type='text' value={secondname} placeholder='Indique Segundo nombre...' onChange={({target}) => setSecondname(target.value)} />
            </Form.Group>
            <Form.Group as={Col} controlId='validation02'>
                <Form.Label>Primer Apellido *</Form.Label>
                <Form.Control required type='text' value={lastname} placeholder='Ingrese Primer apellido..' onChange={({target}) => setLastname(target.value)} />
                <Form.Text className='text-muted'>Campo obligatorio</Form.Text>
            </Form.Group>
            <Form.Group as={Col}>
                <Form.Label>Segundo Apellido</Form.Label>
                <Form.Control type='text' value={secondsurname} placeholder='Indique Segundo nombre...' onChange={({target}) => setSecondsurname(target.value)} />
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
                <Form.Control required type='date' value={initialdate} onChange={({target}) => setInitialdate(target.value)} />
                <Form.Text className='text-muted'>Campo obligatorio</Form.Text>
            </Form.Group>
            <Form.Group as={Col} controlId='validation07'>
                <Row>
                    <Col sm lg={6}><Form.Label>Fecha de Egreso:</Form.Label></Col>
                    <Col sm lg={6}><Form.Check className='w-50' type='checkbox' label='Actualmente' name='checkForm' id='checkForm1' onChange={handleCheck} /></Col>
                </Row>
                <Form.Control type='date' value={lastdate} onChange={({target}) => setLastdate(target.value)} disabled={check ? true : false} />
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
                <Form.Control required type='number' value={salary} placeholder='Ingrese Salario...' onChange={({target}) => setSalary(target.valueAsNumber)} />
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
        updateEmployee: (data) => dispatch(updateEmployee(data)),
        getOcupationsList: () => dispatch(getOcupationsList())
    }
)

export default connect(MSTP, MDTP)(EmployeeForm)