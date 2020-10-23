import React, { useState, Fragment, useEffect } from 'react';
import { Modal, Form, Row, Col, Button } from 'react-bootstrap';
import { createUser, updateUser } from '../../ducks/users';
import { connect } from 'react-redux';
import { faUserPlus, faUserEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Alerts from '../Alerts/alerts';


const UserForm = ({ btnText, createUser, user, updateUser, asModal, editing, selection }) => {
    const [showModal, setShowModal] = useState(false);
    const [name, setName] = useState(user ? user.name : "")
    const [document, setDocument] = useState(user ? user.document : "")
    const [location, setLocation] = useState(user ? user.location : "")
    const [bandwidth, setBandwidth] = useState(user ? user.bandwidth : "")
    const [status, setStatus] = useState(user ? user.status : "")
    const [service, setService] = useState(user ? user.service : "")
    const [ip, setIp] = useState(user ? user.ip : "")
    const [email, setEmail] = useState(user ? user.ip : "")
    const [phone, setPhone] = useState(user ? user.ip : "")
    const [mensuality, setMensuality] = useState(user ? user.ip : "")
    const [serial, setSerial] = useState(user ? user.ip : "")
    const [mac, setMac] = useState(user ? user.ip : "")


    useEffect(() => {
        if (user && editing) {
            setName(user.name)
            setDocument(user.document)
            setLocation(user.location)
            setBandwidth(user.bandwidth)
            setStatus(user.status)
            setService(user.service)
            setIp(user.ip)
            setEmail(user.email)
            setPhone(user.phone)
            setMensuality(user.mensuality)
            setSerial(user.serial)
            setMac(user.mac)
        }
    }, [user, editing])


    const [valid, setValid] = useState(false)
    const onSubmit = (event) => {
        event.preventDefault()
        const form = event.currentTarget
        if (form.checkValidity() === false) {
            event.stopPropagation()
        } else {
            let newUser = { name, document, location, bandwidth, status, service, ip, mac, email, phone, serial, mensuality }
            if (!user) {
                createUser(newUser)
                Alerts.InfoNotify("USUARIO AGREGADO EXITOSAMENTE")

            }
            else {
                updateUser({ ...newUser, id: user.id })
                Alerts.EditNotify("USUARIO EDITADO EXITOSAMENTE")

            }
            setShowModal(false)
            setName('')
            setDocument('')
            setLocation('')
            setBandwidth('')
            setStatus('')
            setService('')
            setIp('')
            setEmail('')
            setPhone('')
            setMensuality('')
            setSerial('')
            setMac('')
        }
        setValid(true)
    }

    const formjsx = (
        <Form onSubmit={onSubmit} noValidate validated={valid}>
            <Form.Row>
                <Form.Group as={Col} controlId='validation01' >
                    <Form.Label className='font-weight-bold text-uppercase' >Razon Social </Form.Label>
                    <Form.Control
                        required
                        type='text'
                        placeholder='Ingrese Nombre'
                        value={name}
                        onChange={({ target }) => setName(target.value)}
                    />
                    <Form.Text className='text-muted'>Campo obligatorio</Form.Text>
                </Form.Group>
                <Form.Group as={Col} controlId='validation02' >
                    <Form.Label className='font-weight-bold text-uppercase' >CI/RIF</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        placeholder='Ingrese Cedula o RIF'
                        value={document}
                        onChange={({ target }) => setDocument(target.value)}
                    />
                    <Form.Text className='text-muted'>Campo obligatorio</Form.Text>
                </Form.Group>
            </Form.Row>
            <Form.Row>
                <Form.Group as={Col} controlID='validation06' >
                    <Form.Label className='font-weight-bold text-uppercase' >Servicio</Form.Label>
                    <Form.Control as='select' value={service} onChange={({ target }) => setService(target.value)} required custom >
                        <option value='' disabled selected >Elija un Servicio</option>
                        <option value='Residencial' >Residencial</option>
                        <option value='PYMES' >PYMES</option>
                        <option value='Dedicado '>Dedicado</option>
                    </Form.Control>
                    <Form.Text className='text-muted'>Campo obligatorio</Form.Text>
                </Form.Group>
                <Form.Group as={Col} controlID='validation05' >
                    <Form.Label className='font-weight-bold text-uppercase' >Mensualidad</Form.Label>
                    <Form.Control
                        required
                        type='number'
                        placeholder='Ingrese Mensualidad'
                        value={mensuality}
                        onChange={({ target }) => setMensuality(target.valueAsNumber)}
                    />
                    <Form.Text className='text-muted'>Campo obligatorio</Form.Text>
                </Form.Group>
            </Form.Row>

            { editing && 
                <>
                <Form.Row>
                    <Form.Group as={Col} controlID='validation04' >
                        <Form.Label className='font-weight-bold text-uppercase' >Email</Form.Label>
                        <Form.Control
                            type='email'
                            placeholder='Ingrese email'
                            value={email}
                            onChange={({ target }) => setEmail(target.value)}
                        />
                    </Form.Group>
                    <Form.Group as={Col} controlID='validation04' >
                        <Form.Label className='font-weight-bold text-uppercase' >Telefono</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Ingrese Telefono'
                            value={phone}
                            onChange={({ target }) => setPhone(target.value)}
                        />
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col} controlID='validation04' >
                        <Form.Label className='font-weight-bold text-uppercase' >Bandwidth</Form.Label>
                        <Form.Control
                            type='number'
                            placeholder='Ingrese Ancho de Banda'
                            value={bandwidth}
                            onChange={({ target }) => setBandwidth(target.valueAsNumber)}
                        />
                    </Form.Group>
                    <Form.Group as={Col} controlID='validation05' >
                        <Form.Label className='font-weight-bold text-uppercase' >Direccion IP</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Ingrese Direccion IP'
                            value={ip}
                            onChange={({ target }) => setIp(target.value)}
                        />
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col} controlID='validation05' >
                        <Form.Label className='font-weight-bold text-uppercase' >Direccion MAC</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Ingrese MAC Address'
                            value={mac}
                            onChange={({ target }) => setMac(target.value)}
                        />
                    </Form.Group>
                    <Form.Group as={Col} controlID='validation04' >
                        <Form.Label className='font-weight-bold text-uppercase' >Serial</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Ingrese Serial'
                            value={serial}
                            onChange={({ target }) => setSerial(target.value)}
                        />
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col} controlID='validation03' >
                        <Form.Label className='font-weight-bold text-uppercase' >Ubicacion</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Indique Ubicacion'
                            value={location}
                            onChange={({ target }) => setLocation(target.value)}
                        />
                    </Form.Group>
                    <Form.Group as={Col} sm={6} controlID='validation07' >
                        <Form.Label className='font-weight-bold text-uppercase' >Status</Form.Label>
                        <Form.Control as='select' value={status} onChange={({ target }) => setStatus(target.value)} required custom >
                            <option value='' disabled selected >Elija un Status</option>
                            <option value='Activo' >Activo</option>
                            <option value='Cancelado' >Cancelado</option>
                            <option value='Suspendido' >Suspendido</option>
                        </Form.Control>
                    </Form.Group>
                </Form.Row>
                </>
            }
            <Row className='text-center'>
                <Col>
                    <Button variant='success' type='submit' >{btnText}</Button>
                </Col>
            </Row>
        </Form>
    )


    if (asModal) {
        return (
            <Fragment>
                <Button disabled={editing ? selection.length !== 1 : false} variant='warning' onClick={() => setShowModal(true)}><FontAwesomeIcon icon={editing ? faUserEdit : faUserPlus} size='lg' /></Button>
                <Modal show={showModal} onHide={() => setShowModal(false)} centered onExit={() => setValid(false)} >
                    <Modal.Header closeButton className='bg-warning' >
                        <Modal.Title className='text-center w-100 text-white' >{editing ? 'Editar Usuario' : 'Agregar Usuario'}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {formjsx}
                    </Modal.Body>
                </Modal>
            </Fragment>
        )
    }
    else return formjsx

}

const MSTP = state => (
    {
        user: state.users.selected[0],
        selection: state.users.selected
    }
)

const MDTP = dispatch => (
    {
        createUser: (user) => dispatch(createUser(user)),
        updateUser: (user) => dispatch(updateUser(user))
    }
)

export default connect(MSTP, MDTP)(UserForm)
