import React, {useState}  from 'react';
import {Col, Row, Container} from 'react-bootstrap';
import { ViewTablet } from './tabletInfo';
import { FormUsers } from './addUser';
import { EditForm } from './editUser';

const CrudApp =()=> {
    const userData = []

    const initialFormState = { id: null, name:'', lastName:'', idDocument:'', zoneLocation:''}
    const [users, setUsers] = useState(userData)
    const [userActual, setUserActual] = useState(initialFormState)
    const [edit, setEdit] = useState(false)

    const addUser = (user) => {
        user.id = users.length + 1
        setUsers([...users, user])
    }

    const deleteUser = (id) => {
        setUsers(users.filter((user) => user.id !== id))
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
            <Row className='text-center mx-auto'>
            {edit ? (
                <Col>
                    <Col>
                        <h2>Editar Datos</h2>
                    </Col>
                    <Col className='my-3'>
                        <EditForm setEdit={setEdit} userActual={userActual} updateUser={updateUser} edit={edit}/>
                    </Col>
                </Col>
                ) : (
                <Col>
                    <Col>
                    <h2>Nuevo usuario</h2>
                    </Col>
                    <Col className='my-3'>
                        <FormUsers addUser={addUser} />
                    </Col>
                </Col>
            )}
                <Col>
                    <Col>
                        <h2>Datos</h2>
                    </Col>
                    <Col className='my-3'>
                        <ViewTablet users={users} deleteUser={deleteUser} editRow={editRow} />
                    </Col>
                </Col>
            </Row>
        </Container>
    )
}

export default CrudApp;