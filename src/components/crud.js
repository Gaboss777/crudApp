import React, {useState}  from 'react';
import {Col, Row, Container, Button} from 'react-bootstrap';
import { ViewTablet } from './tabletInfo';
import { ModalForm } from './modalForm';

const CrudApp =()=> {
    /* Data */
    const userData = [
        { id: 1, name:'Gabriel', lastName:'Palacios', idDocument:'18667937', zoneLocation:'Caracas'}
    ]

    /* Valores iniciales */
    const initialFormState = { id: null, name:'', lastName:'', idDocument:'', zoneLocation:''}
    const [users, setUsers] = useState(userData)
    const [userActual, setUserActual] = useState(initialFormState)
    const [edit, setEdit] = useState(false)
    const [show, setShow] = useState(false)

    /* Funciones Modal Show */
    const handleClose =()=> setShow(false)
    const handleOpen =()=> setShow(true)

    /* Funciones acciones */
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

    const editRow = (userID) => {
        let user = users.find(x=>x.id===userID)
        setEdit(true)
        setUserActual(user)
        handleOpen()
    }

    return (
        <Container fluid >
            <Row className='my-3'>
                <h1 className='mx-auto'>PROYECTO CRUD</h1>
            </Row>
            <Col>
                <Button variant='outline-primary' onClick={handleOpen} >Agregar Usuario</Button>
                {edit ? (
                    <ModalForm
                        show={show}
                        handleClose={handleClose}
                        edit={edit}
                        userActual={userActual}
                        updateUser={updateUser}
                        setEdit={setEdit} />
                ) : (
                    <ModalForm
                        show={show}
                        handleClose={handleClose}
                        addUser={addUser}
                     />
                )}
            </Col>
            <Row className='text-center mx-auto'>
                <Col>
                    <Col>
                        <h2>Datos</h2>
                    </Col>
                    <Col className='my-3'>
                        <ViewTablet users={users} deleteUser={deleteUser} editRow={editRow} handleOpen={handleOpen}/>
                    </Col>
                </Col>
            </Row>
        </Container>
    )
}

export default CrudApp;