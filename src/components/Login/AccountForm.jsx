import { faUserEdit, faUserPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Modal, Row } from 'react-bootstrap'

const AccountForm = ({isModal, registerAccount, edit, account, selected, updateAccount, roles}) => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [role, setRole] = useState('')

    const [showModal, setShowModal] = useState(false)
    const [valid, setValid] = useState(false)

    const onSubmit = (e) => {
        e.preventDefault()
        let form = e.currentTarget
        if(form.checkValidity() === false){
            e.stopPropagation()
        } else {
            let data = {username, password, firstname, lastname, role_id: role}
            if(!account && !edit){
                registerAccount(data)
            } else {
                updateAccount({...data, id: account.id})
            }
            setShowModal(false)
            setUsername('')
            setPassword('')
            setFirstname('')
            setLastname('')
            setRole('')
        }
        setValid(true)
    }

    useEffect(() => {
        if(account && edit){
            setUsername(account.username)
            setPassword(account.password)
            setFirstname(account.firstname)
            setLastname(account.lastname)
            setRole(account.role)
        }
    }, [account, edit])

    const formjsx = (
        <Form onSubmit={onSubmit} validated={valid} noValidate >
            <Form.Group as={Row}>
                <Form.Label column sm lg={4}>USERNAME</Form.Label>
                <Col sm lg={8}>
                    <Form.Control required type='text' value={username} onChange={({target}) => setUsername(target.value)} />
                </Col>
            </Form.Group>
            <Form.Group as={Row}>
                <Form.Label column sm lg={4}>PASSWORD</Form.Label>
                <Col sm lg={8}>
                    <Form.Control required type='text' value={password} onChange={({target}) => setPassword(target.value)} />
                </Col>
            </Form.Group>
            <Form.Group as={Row}>
                <Form.Label column sm lg={4}>NOMBRES</Form.Label>
                <Col sm lg={8}>
                    <Form.Control required type='text' value={firstname} onChange={({target}) => setFirstname(target.value)} />
                </Col>
            </Form.Group>
            <Form.Group as={Row}>
                <Form.Label column sm lg={4}>APELLIDOS</Form.Label>
                <Col sm lg={8}>
                    <Form.Control required type='text' value={lastname} onChange={({target}) => setLastname(target.value)} />
                </Col>
            </Form.Group>
            <Form.Group as={Row}>
                <Form.Label column sm lg={4}>ROLES</Form.Label>
                <Col sm lg={8}>
                    <Form.Control required as='select' value={role} onChange={({target}) => setRole(target.value)}>
                        <option value='' selected>Elija una opcion</option>
                        {roles.map(rol => 
                            <option value={rol.id}>{rol.name}</option>
                        )}
                    </Form.Control>
                </Col>
            </Form.Group>
            <Row>
                <Col className='text-center'>
                    <Button variant='success' type='submit' >REGISTRAR</Button>
                    <Button variant='danger' onClick={() => setShowModal(false)} className='ml-2'>CANCELAR</Button>
                </Col>
            </Row>
        </Form>
    )

    if(isModal){
        return (
            <>
                <Button disabled={edit? selected.length !== 1 : false} variant='warning' onClick={() => setShowModal(true)}><FontAwesomeIcon icon={edit ? faUserEdit : faUserPlus}/></Button>
                <Modal onHide={() => setShowModal(false)} show={showModal} onExit={() => setValid(false)} centered>
                    <Modal.Header closeButton className='bg-warning'>
                        <Modal.Title className='text-center w-100 text-white'>{edit ? 'Editar' :  'Crear' } Cuenta</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {formjsx}
                    </Modal.Body>
                </Modal>
            </>
        )
    } else return formjsx
}

export default AccountForm