import React, {useState}  from 'react';
import {Col, Row, Container} from 'react-bootstrap';
import { ViewTablet } from './tabletInfo';
import { FormUsers } from './addUser';
import { EditForm } from './editUser';

const CrudApp =()=> {
    const userData = [
        { id: 1, name:'Gabriel', lastName:'Palacios', idDocument:'654654', zoneLocation:'Caracas'}
    ]

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

    const updateUser = (id, updateUser) => {
        setEdit(false)
        setUsers(users.map((user) => (user.id === id ? updateUser : user)))
    }

    /* Aqui no estas recibiendo el user, estas recibiendo el ID del user, te cambio el nombre del argumento para que se entienda mejor */
    const editRow = (userID) => {
        let user = users.find(x=>x.id===userID) // Usamos el find para conseguir el elemento cuyo ID es igual al que recibe nuestra funcion
      
        setEdit(true)
        /* Ya conseguimos el user no hace falta destructurar, lo podemos pasar completo */
        setUserActual(user)
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

export default CrudApp;