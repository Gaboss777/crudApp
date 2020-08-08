/* Dependencias */
import React, {useState, useEffect}  from 'react';
import {Col, Row, Container, Button} from 'react-bootstrap';

/* Componentes APP */
import { ViewTablet } from './tabletInfo';
import { DeleteUser, EditUser, NewUser } from './userOperations';
import API from './api';

const CrudApp =()=> {
    /* Data */
    const usersData = []
    const [users, setUsers] = useState(usersData)

    useEffect(() => {
        API.get()
            .then(response => {
                const data = response.data
                setUsers(data)
            })
            .catch(err => console.log('Error en datos', err))
        }, [setUsers])

    /* Valores iniciales */
    const initialFormState = { id: null, name:'', lastName:'', idDocument:'', zoneLocation:''}

    const [userActual, setUserActual] = useState(initialFormState)
    const [edit, setEdit] = useState(false)
    const [show, setShow] = useState(false)
    const [confirm, setConfirm] = useState(false)

    /* Funciones Modal Show */
    const handleClose =()=> setShow(false)
    const handleOpen =()=> setShow(true)

    /* Funciones acciones */
    const addUser = user => {
        user.id = users.length + 1
        setUsers([ ...users, user ])

    }

    const deleteUser = id => {
        setEdit(false)
        setConfirm(false)

        setUsers(users.filter(user => user.id !== id))
    }

    const updateUser = (id, updateUser) => {
        let update = users.map(user => (user.id === id ? updateUser : user))
        setEdit(false)
        setConfirm(false)
        setUsers(update)

    }

    const editRow = user => {
        let userInfo = { id: user.id, name: user.name, lastName: user.lastName, idDocument: user.idDocument, zoneLocation: user.zoneLocation }

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

    const checkId = id => {
        let idCheck = users.map(user => (user.id !== id ? user.id - 1 : user))
        setUsers(idCheck)

        API.put(`/${id}`, users)
            .then(response => {
                console.log(response.data)
            })

    }

    return (
        <Container fluid className='w-75'>
            <Row className='my-3'>
                <h1 className='mx-auto'>PROYECTO CRUD</h1>
            </Row>
            <Col>
                <Button variant='outline-primary' className='my-3' onClick={handleOpen} >Nuevo Usuario</Button>
                <div>{ edit
                        ?   <EditUser show={show} handleClose={handleClose} userActual={userActual} updateUser={updateUser} setEdit={setEdit} setConfirm={setConfirm} />   :
                        <div>{ confirm
                            ?   <DeleteUser show={show} handleClose={handleClose} userActual={userActual} setConfirm={setConfirm} deleteUser={deleteUser} checkId={checkId} />
                            :   <NewUser show={show} handleClose={handleClose} addUser={addUser} />
                        }</div>
                }</div>
            </Col>
            <Row className='text-center mx-auto'>
                <Col>
                    <Col>
                        <h2>Datos</h2>
                    </Col>
                    <Col className='my-3'>
                        <ViewTablet users={users} editRow={editRow} setEdit={setEdit} handleOpen={handleOpen}/>
                    </Col>
                </Col>
            </Row>
        </Container>
    )
}

export default CrudApp;