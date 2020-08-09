import React from 'react';
import API from './api';
import { Row, Col, Button, Modal } from 'react-bootstrap';

export const DeleteUser =({handleClose, deleteUser, userActual, show})=>{

    const handleSubmit = event => {
        event.preventDefault()

        deleteUser(userActual.id)

        API.delete(`/${userActual.id}`)
        .then(response => {
            console.log('Usuario borrado')
        })
        .catch(err => console.log('Error al eliminar usuario', err))

        handleClose()
    }

    return (
        <Modal show={show} onHide={handleClose} centered size='sm'>
            <Modal.Header closeButton >
                <Modal.Title>Desea borrar los siguientes datos?</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Row>
                <Col className='text-center'>
                    <p className='font-weight-bolder text-uppercase'>Cedula / RIF: 
                        <p className='font-weight-normal'>{userActual.idDocument} </p>
                    </p>
                    <p className='font-weight-bolder text-uppercase'>Nombre y Apellido: 
                        <p className='font-weight-normal'>{userActual.name} {userActual.lastName} </p>
                    </p>
                    <p className='font-weight-bolder text-uppercase'>Zona: 
                        <p className='font-weight-normal'>{userActual.zoneLocation} </p>
                    </p>
                </Col>
            </Row>
                    <Row className='justify-content-md-center'>
                        <Col xs lg='4'>
                            <Button variant='outline-danger' type='submit' className='mx-2' onClick={handleSubmit} >Eliminar</Button>
                        </Col>
                        <Col xs lg='5'>
                            <Button variant='outline-dark' type='submit' className='mx-2' onClick={() => handleClose()}>Cancelar</Button>
                        </Col>
                    </Row>
            </Modal.Body>
        </Modal>
    )
}