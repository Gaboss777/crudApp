import React, {useState} from 'react';
import { Form, Row, Col, Button, Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import { updateUser } from '../../ducks/users';

const EditUser = ({userActual, editUser, handleClose, show}) => {

    const [user, setUser] = useState(userActual)

    const handleInputChange = event => {
        const {name, value} = event.target
        setUser({...user, [name]: value})
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        editUser(user.id, user)
        handleClose()
    }

    return(
        <Modal show={show} onHide={handleClose} centered >
            <Modal.Header className='bg-success' >
                <Modal.Title className='text-center w-100 text-white' >Editar Datos</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit} >
                            <Form.Group as={Row} >
                                <Form.Label column sm='4' className='font-weight-bold text-uppercase' >Razon Social</Form.Label>
                                <Col sm='8'>
                                    <Form.Control
                                        required
                                        type='text'
                                        name='razonSocial'
                                        placeholder='Ingrese Nombre'
                                        value={user.razonSocial}
                                        onChange={handleInputChange}
                                        />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} >
                                <Form.Label column sm='4' className='font-weight-bold text-uppercase' >Servicio</Form.Label>
                                <Col sm='8'>
                                <Form.Control as='select' value={user.services} onChange={handleInputChange} name='services' >
                                    <option value='Residencial' >Residencial</option>
                                    <option value='PYMES' >PYMES</option>
                                    <option value='Dedicado '>Dedicado</option>
                                </Form.Control>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} >
                                <Form.Label column sm='4' className='font-weight-bold text-uppercase' >CI/RIF</Form.Label>
                                <Col sm='8'>
                                    <Form.Control
                                        required
                                        type='text'
                                        name='idDocument'
                                        placeholder='Ingrese Cedula o RIF'
                                        value={user.idDocument}
                                        onChange={handleInputChange}
                                        />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} >
                                <Form.Label column sm='4' className='font-weight-bold text-uppercase' >Zona</Form.Label>
                                <Col sm='8'>
                                    <Form.Control
                                        required
                                        type='text'
                                        name='zoneLocation'
                                        placeholder='Zona donde Vive'
                                        value={user.zoneLocation}
                                        onChange={handleInputChange}
                                        />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} >
                                <Form.Label column sm='4' className='font-weight-bold text-uppercase' >MB</Form.Label>
                                <Col sm='8'>
                                    <Form.Control
                                        required
                                        type='text'
                                        name='MB'
                                        placeholder='MB'
                                        value={user.MB}
                                        onChange={handleInputChange}
                                        />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} >
                                <Form.Label column sm='4' className='font-weight-bold text-uppercase' >Estado</Form.Label>
                                <Col sm='8'>
                                <Form.Control as='select' value={user.Estado} onChange={handleInputChange} name='Estado' >
                                    <option value='Activo' >Activo</option>
                                    <option value='Cancelado' >Cancelado</option>
                                    <option value='Suspendido' >Suspendido</option>
                                </Form.Control>
                                </Col>
                            </Form.Group> 
                    <Row className='text-center'>
                        <Col>
                            <Button variant='outline-success' type='submit' className='mx-2' >Editar</Button>
                            <Button variant='outline-danger' type='submit' onClick={handleClose} >Cerrar</Button>
                        </Col>
                    </Row>
                </Form>
            </Modal.Body>
        </Modal>
    )
}

const mapStateToProp = state =>(
    {
        userActual: state.users.selected
    }
)

const mapDispatchToProps = dispatch => (
    {
        editUser: (id, data) => dispatch(updateUser(id, data))
    }
)

export default connect(mapStateToProp, mapDispatchToProps)(EditUser) 