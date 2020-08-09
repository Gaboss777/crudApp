/* Dependencias */
import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import { Col, Row, Container, Button } from 'react-bootstrap';

/* Componentes APP */
import { ViewTablet } from './tabletInfo';
import { NewUser } from './addUser';
import { EditUser } from './editUser';
import { DeleteUser } from './deleteUser';
import API from './api';

const CrudApp = () => {
    /* Data */
    const [users, setUsers] = useState([])

    /* Valores iniciales */
    const initialFormState = { id: '', name: '', lastName: '', idDocument: '', zoneLocation: '' }
    const [userActual, setUserActual] = useState(initialFormState)
    const [edit, setEdit] = useState(false)
    const [show, setShow] = useState(false)
    const [confirm, setConfirm] = useState(false)

    /* Mostrar valores de la Api */
    useEffect(() => {
        axios.get(`http://localhost:3000/usersData`)
            .then(response => {
                setUsers(response.data)
                console.log(response.data)
            })
            .catch(err => console.log('Error en datos', err))
    }, [setUsers])

    /* Funciones Modal */
    const handleClose = () => {
        setShow(false)
        setEdit(false)
        setConfirm(false)
    }
    const handleOpen = () => setShow(true)

    /* Acciones */

    /* Agregar usuario */
    const addUser = user => {
        user.id = users.length + 1
        setUsers([...users, user])
    }

    /* Eliminar usuario */
    const deleteUser = (id) => {
        setEdit(false)
        setConfirm(false)

        setUsers(users.filter(user => user.id !== id))
    }

    /* Editar usuario */
    const updateUser = (id, updateUser) => {
        let update = users.map(user => (user.id === id ? updateUser : user))
        setEdit(false)
        setConfirm(false)

        setUsers(update)

        API.put(`/${id}`, update)
        .then(response => {
            const data = response.data
            console.log('Actualziado correctamente')
            console.log(data)
        })
        .catch(err => console.log('Error al actualziar', err))

        handleClose()
    }

    /* Botones Editar o Borrar */
    const editRow = (user, estado) => {
        let userInfo = { id: user.id, name: user.name, lastName: user.lastName, idDocument: user.idDocument, zoneLocation: user.zoneLocation }
        setEdit(estado)

        if (edit) {
            setConfirm(false)
            setUserActual(userInfo)
            handleOpen()
        } else {
            setConfirm(true)
            setUserActual(userInfo)
            handleOpen()
        }
    }

    const updateList = id => {
        let list = users.map(user => {
            const ListId = { id: user.id, name: user.name, lastName: user.lastName, idDocument: user.idDocument, zoneLocation: user.zoneLocation }
            return ListId
        })
    }

    return (
        <Container fluid className='w-75'>
            <Row className='my-3'>
                <Col sm={12}>
                    <h1 className='mx-auto'>PROYECTO CRUD</h1>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Button variant='outline-primary' className='my-3' onClick={handleOpen} >Nuevo Usuario</Button>
                    {/* No renderizes divs al pedo, usa Fragments cuando necesites englobar vainas */}
                    <Fragment>
                        {edit ?
                            <EditUser show={show} handleClose={handleClose} userActual={userActual} updateUser={updateUser} setEdit={setEdit} setConfirm={setConfirm} /> :
                            <Fragment>
                                {
                                    confirm ?
                                        <DeleteUser show={show} handleClose={handleClose} userActual={userActual} setConfirm={setConfirm} deleteUser={deleteUser} />
                                        :
                                        <NewUser show={show} handleClose={handleClose} addUser={addUser} />
                                }
                            </Fragment>
                        }
                    </Fragment>
                </Col>
            </Row>
            <Row className='text-center mx-auto'>
                <Col>
                    <Col>
                        <h2>Datos</h2>
                    </Col>
                    <Col className='my-3'>
                        <ViewTablet users={users} editRow={editRow} setEdit={setEdit} handleOpen={handleOpen} />
                    </Col>
                </Col>
            </Row>
        </Container>
    )
}

export default CrudApp;