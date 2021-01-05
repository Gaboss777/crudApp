import { faUserEdit, faUserPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { Alert, Button, Col, Form, Modal, Row } from 'react-bootstrap'
import Alerts from '../../../Utils/Alerts/alerts'

const AccountForm = ({isModal, registerAccount, edit, account, selected, updateAccount, employies, sellers}) => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] =  useState('')
    const [user, setUser] = useState('')
    const [role, setRole] = useState('')
    const [dataB, setDataB] = useState('')
    const [dataA, setDataA] = useState('')
    const [id, setId] = useState('')
    const [list, setList] =  useState([])

    const [showModal, setShowModal] = useState(false)
    const [valid, setValid] = useState(false)
    const [check, setCheck] = useState(false)
    
    const onSubmit = (e) => {
        e.preventDefault()
        const strongPass = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})")
        const isOk = strongPass.test(password)

        let form = e.currentTarget
        if(form.checkValidity() === false){
            e.stopPropagation()
        } else {
            if(password !== confirmPassword){
                Alerts.RemoveNotify('Contrasena no coinciden')
                e.stopPropagation()
            } else if(!isOk){
                Alerts.RemoveNotify(
                    <>
                    <p>Contrasena debil. Debe contener: </p>
                    <p>- Minimo 8 caracteres</p>
                    <p>- Al menos una letra minuscula</p>
                    <p>- Al menos una letra mayuscula</p>
                    <p>- Al menos un numero</p>
                    <p>- Al menos un caracter especial (! @ # $ % & *)</p>
                    </>
                )
                e.stopPropagation()
            } else {
                let data = {username, password, user_id: dataA, user: user, role: role}
                if(!account && !edit){
                    registerAccount(data)
                } else {
                    updateAccount({...data, id: id})
                }
                setShowModal(false)
                setUsername('')
                setPassword('')
                setUser('')
                setRole('')
                setDataA('')
                setDataB('')
                setList([])
                setCheck(false)
            }
        }
        setValid(true)
    }

    const handleUserInfo = (e) =>{
        if(list && check){
            let dataFilter = list.filter(x => x.id === parseInt(e)).map(x => {return {id: x.id, assign: x.firstname+' '+x.secondname+' '+x.lastname+' '+x.secondsurname}})
            setUser(dataFilter[0].assign)
            setDataA(dataFilter[0].id)
        } else {
            setUser(e)
            setDataA(null)
        }
    }

    const handleCheck = (e) => {
        console.log(e.target.checked)
        if(e.target.checked){
            setCheck(e.target.checked)
        } else {
            setUser('')
            setCheck(e.target.checked)
        }
    }

    const handleList = (e) => {
        switch(e.target.value){
            case '1':
                setList(employies)
                setDataB(e.target.value)
                break
            case '2':
                setList(sellers)
                setDataB(e.target.value)
                break
            default:
                setList([])
                setDataB('')
        }
    }

    useEffect(() => {
        if(account && edit){
            setUsername(account.username)
            setRole(account.role)
            setUser(account.user)
            setId(account.id)
        }
    }, [account, edit])

    const formjsx = (
        <Form onSubmit={onSubmit} validated={valid} noValidate >
            <Form.Row>
                <Form.Group as={Col} sm lg={edit ? 4 : 3}>
                    <Form.Label>USERNAME</Form.Label>
                    <Form.Control disabled={edit} className={edit ? 'form-disable text-dark' : ''} required type='text' value={username} onChange={({target}) => setUsername(target.value)} />
                </Form.Group>
                <Form.Group as={Col} sm lg={edit ? 4 : 3}>
                    <Form.Label>PASSWORD</Form.Label>
                    <Form.Control required type='password' value={password} onChange={({target}) => setPassword(target.value)} />
                </Form.Group>
                <Form.Group as={Col} sm lg={edit ? 4 : 3}>
                    <Form.Label>CONFIRMAR PASSWORD</Form.Label>
                    <Form.Control required type='password' value={confirmPassword} onChange={({target}) => setConfirmPassword(target.value)} />
                </Form.Group>
                {!edit &&
                    <Form.Group as={Col} sm lg={3}>
                        <Row>
                            <Col sm lg={8}><Form.Label>BASE DE DATOS</Form.Label></Col>
                            <Col sm lg={4}><Form.Check type='checkbox' onChange={handleCheck} /></Col>
                        </Row>
                        <Form.Control required={check} disabled={!check} className={!check ? 'form-disable' : ''} as='select' value={dataB} onChange={handleList}>
                            <option value=''>Elija una Lista</option>
                            <option value='1'>Empleados</option>
                            <option value='2'>Vendedores</option>
                        </Form.Control>
                    </Form.Group>
                }
            </Form.Row>
            <Form.Row>
                <Form.Group as={Col}>
                <Form.Label>ASIGNADO A</Form.Label>
                    { !check || edit
                        ?
                        <Form.Control required disabled={edit} className={edit ? 'form-disable text-dark' : ''} type='text' value={user} onChange={({target}) => handleUserInfo(target.value)} />
                        :
                        <Form.Control required as='select' value={dataA} onChange={({target}) => handleUserInfo(target.value)} >
                            <option value=''>Elija una opcion</option>
                            { list.map(e => {
                                let completeName = e.firstname+' '+e.secondname+' '+e.lastname+' '+e.secondsurname
                                return (
                                    <option value={e.id}>{completeName}</option>
                                    )
                                }
                            )}
                        </Form.Control>
                    }
                </Form.Group>
                <Form.Group as={Col}>
                    <Form.Label>NIVEL DE ACCESO</Form.Label>
                    <Form.Control required as='select' value={role} onChange={({target}) => setRole(target.value)}>
                        <option value=''>Elija una opcion</option>
                        <option value='admin'>Administrador</option>
                        <option value='vendedor'>Vendedor</option>
                        <option value='asistente'>Asistente</option>
                        <option value='cobranza'>Cobranza</option>
                    </Form.Control>
                </Form.Group>
            </Form.Row>
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
                <Modal onHide={() => setShowModal(false)} show={showModal} onExit={() => setValid(false)} centered size={edit ? '' : 'lg'} >
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