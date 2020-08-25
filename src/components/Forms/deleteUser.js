import React from 'react';
import { Row, Col, Button, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import { removeUser } from '../../ducks/users';

const DeleteUser =({handleClose, deleteUser, userActual, show})=>{

    console.log(userActual.id)

    const handleSubmit = event => {
        event.preventDefault()
        deleteUser(userActual.id)
        handleClose()
    }

    return (
        <Modal show={show} onHide={handleClose} centered size='sm' animation='fade'>
            <Modal.Header className='bg-danger'>
                <Modal.Title className='text-center w-100 text-white' >CONFIRM</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Row>
                <Col className='text-center'>
                    <FontAwesomeIcon icon={faExclamationTriangle} size="6x" className='my-2 text-danger' />
                    <p>Esta seguro de eliminar los siguiente(s) dato(s)</p>
                </Col>
            </Row>
                    <Row className='text-center'>
                        <Col>
                            <Button variant='outline-danger' type='submit' className='mx-2' onClick={handleSubmit} >Eliminar</Button>
                            <Button variant='outline-dark' type='submit' className='mx-2' onClick={handleClose}>Cancelar</Button>
                        </Col>
                    </Row>
            </Modal.Body>
        </Modal>
    )
}

const mapStateToProps = state => (
    {
        userActual: state.users.selected
    }
)

const mapDispatchToProps = dispatch => (
    {
        deleteUser: (data) => dispatch(removeUser(data))
    }
)

export default connect(mapStateToProps, mapDispatchToProps)(DeleteUser)