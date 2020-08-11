/* Dependencias y otros*/
import React, { useState, useEffect, Fragment } from 'react';
import { Col, Row, Container, Button, Alert, Badge } from 'react-bootstrap';
import Calls from '../axios-common/callaxios';
import ServicesData from '../axios-common/Services';

/* Componentes */
import { ViewTablet } from './tabletInfo';
import { NewUser } from './addUser';
import { EditUser } from './editUser';
import { DeleteUser } from './deleteUser';
import { EncontrarDatos } from './findData';

const CrudApp = () => {
    /* Data */
    const [users, setUsers] = useState([])

    /* Valores iniciales */
    const [userActual, setUserActual] = useState(null)
    const [edit, setEdit] = useState(false)
    const [show, setShow] = useState(false)
    const [confirm, setConfirm] = useState(false)
    const [find, setFind] = useState('')

    /* Valores alertas */
    const [alert, setAlert] = useState(true)
    const [alertAdd, setAlertAdd] = useState(false)
    const [alertRemove, setAlertRemove] = useState(false)
    const [alertUpdate, setAlertUpdate] = useState(false)

    /* Mostrar valores de la Api */
    useEffect(() => {
        showAll()
    }, []);

    /* Mostrar datos */
    const showAll =()=> {
        ServicesData.getAll()
        .then(response => {
            setUsers(response.data)
            console.log(response.data)
        })
        .catch(err => console.log('error en la data', err))
    }

    /* Funciones Modal */
    const handleClose = () => {
        setShow(false)
        setEdit(false)
        setConfirm(false)
    }
    const handleOpen = () => setShow(true)

    /* Funciones Alertas */
    const alertOpen =(esUno, esDos, esTres)=> {
        setAlert(true)
        setAlertAdd(esTres)
        setAlertRemove(esUno)
        setAlertUpdate(esDos)
    }

    const alertClose=()=> {
        setAlert(false)
        setAlertAdd(false)
        setAlertRemove(false)
        setAlertUpdate(false)
    }

    /* Acciones */

    /* Encontrar dato */
    const findDatas = () =>{
        ServicesData.findData(find)
        .then(response => {
            setUsers(response.data)
            console.log(response.data)
        })
        
        setUsers(users.filter(user => user.name === find))
    }

    /* Agregar usuario */
    const addUser = user => {
        user.id = users.length + 1
        setUsers([...users, user])
        handleClose()
        alertOpen(false, false, true)
    }

    /* Eliminar usuario */
    const deleteUser = (id) => {
        setEdit(false)
        setConfirm(false)

        Calls.removeApi(id)
        setUsers(users.filter(user => user.id !== id))
        handleClose()
        alertOpen(true, false)

    }

    /* Remover todos los datos */
    const removeAll =()=>{
        ServicesData.removeAll()
        .then(response => {
            console.log('Datos Eliminados')
            console.log(response.data)
            setUsers(response.data)
        })
        .catch(err => console.log('Error al eliminar datos', err))
    }

    /* Editar usuario */
    const updateUser = (id, updateUser) => {
        let update = users.map(user => (user.id === id ? updateUser : user))
        setEdit(false)
        setConfirm(false)

        setUsers(update)
        Calls.updateApi(id, updateUser)
        handleClose()
        alertOpen(false, true)
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

    return (
        <Container fluid className='w-75'>
            <Row className='my-3'>
                <Col sm={12}>
                    <h1 className='text-center'>PROYECTO CRUD</h1>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Button variant='outline-primary' className='my-3' onClick={handleOpen} >Nuevo Usuario</Button>
                    <Button variant='outline-warning' className='mx-2' onClick={removeAll} >Eliminar todos</Button>
                    <EncontrarDatos find={find} finDatas={findDatas} setFind={setFind} />
                    <Fragment>
                        {edit ?
                            <EditUser show={show} handleClose={handleClose} userActual={userActual} updateUser={updateUser}  /> :
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
                        <h4  className='text-left'>Total de Datos: <Badge variant='dark'>{users.length}</Badge></h4>
                    </Col>
                    <Col className='my-3'>
                        <ViewTablet users={users} editRow={editRow} setEdit={setEdit} handleOpen={handleOpen} />
                    </Col>
                </Col>
            </Row>
            <Row className='w-50 justify-content-center'>
                <Col>
                    { alert && alertAdd
                        ? <Alert variant='primary' onClose={alertClose} transition dismissible>El usuario ha sido agregado</Alert>
                        : ''
                    }
                    { alert && alertUpdate
                        ? <Alert variant='success' onClose={alertClose} transition dismissible>El usuario se ha editado</Alert> 
                        : ''
                    }
                    { alert && alertRemove
                            ? <Alert variant='danger' onClose={alertClose} transition dismissible>El usuario ha sido eliminado</Alert>
                            : ''
                    }
                </Col>
            </Row>
        </Container>
    )
}

export default CrudApp;