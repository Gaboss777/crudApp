import React, { useState } from 'react';
import {Col, Row, Container} from 'react-bootstrap';
import { ViewTablet } from './components/tabletInfo';
import { FormUsers } from './components/addUser';
import { EditForm } from './components/editUser';

const crudApp =()=> {
    const userData = []

    const initialFormState = { id: null, name:'', lastName:'', idDocument:'', zoneLocation:''}
    const [users, setUsers] = useState(userData)
    const [edit, setEdit] = useState(false)
    const [userActual, setUserActual] = useState(initialFormState)

    const addUser = (user) => {
        user.id = users.length + 1
        setUsers([...users, user])
    }

    const deleteUser = (id) => {
        setUsers(users.filter((user) => user.id !== id))
    }

    const editRow = (user) => {
        setEdit(true)
        setUserActual({id: user.id, name: user.name, lastName: user.lastName, idDocument: user.idDocument, zoneLocation: user.zoneLocation})
    }

    const updateUser = (id, updateUser) => {
        setEdit(false)
        setUsers(users.map((user) => (user.id === id ? updateUser : user)))
    }
    return (
        <Container fluid >
            <Row className='my-3'>
                <h1 className='mx-auto'>PROYECTO CRUD</h1>
            </Row>
            <Row className='text-center'>
            {edit ? (
                <Col>
                    <Col>
                        <h2>Editar Datos</h2>
                    </Col>
                    <Col>
                        <EditForm setEdit={setEdit} userActual={userActual} updateUser={updateUser} />
                    </Col>
                </Col>
                ) : (
                <Col>
                    <Col>
                    <h2>Agregar Datos</h2>
                    </Col>
                    <Col>
                        <FormUsers addUser={addUser} />
                    </Col>
                </Col>
            )}
                <Col>
                    <Col>
                        <h2>Datos</h2>
                    </Col>
                    <Col>
                        <ViewTablet users={users} deleteUser={deleteUser} editRow={editRow} />
                    </Col>
                </Col>
            </Row>
        </Container>
    )
}

export default crudApp;