/* Dependencias y otros*/
import React, { useState, useEffect, Fragment } from 'react';
import { uuid } from 'uuidv4';
import { ToastContainer, toast, Zoom } from 'react-toastify';
import { Col, Row, Container, Badge, Button, ButtonGroup, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserEdit, faTrashAlt, faSyncAlt, faTimes } from '@fortawesome/free-solid-svg-icons';

/* Funciones externas */
import Calls from '../axios-common/callaxios'; //Interactua con API
import AlertNotify from './alerts'; //Interactua con Alertas

/* Componentes */
import { NewUser } from './Forms/addUser';
import { EditUser } from './Forms/editUser';
import { DeleteUser } from './Forms/deleteUser';
import { MenuCrud } from './Navbar';
import { TableNew } from './tablets/newTable';

toast.configure()
const CrudApp = () => {
    /* Data */
    const [users, setUsers] = useState([])
    const [userActual, setUserActual] = useState([])

    /* Valores comparativos */
    const [edit, setEdit] = useState(false)
    const [show, setShow] = useState(false)
    const [confirm, setConfirm] = useState(false)
    const [estado, setEstado] = useState(false)

    /* Mostrar valores de la Api */
    useEffect(() => {
        showAll()
    }, []);

    /* Mostrar todos */
    const showAll=()=>{
        Calls.getApi({setUsers})
        setEstado(false)
    }

    /* Funciones Modal */
    const handleClose = () => {
        setShow(false)
        setEdit(false)
        setConfirm(false)
    }
    const handleOpen = () => setShow(true)

    /* Acciones */

    /* Encontrar dato */
    const Buscar = (data) =>{
        let filtrarDatos = users.filter(user => user.idDocument === data || user.name === data || user.lastName === data || user.zoneLocation === data)

        if (filtrarDatos.length) {
            setUsers(filtrarDatos)
            setEstado(true)
        } else {
            AlertNotify.NoFoundNotify("DATO NO ENCONTRADO")
        }
    }

    /* Agregar usuario */
    const addUser = lastuser => {
        lastuser.id = uuid()
        setUsers([...users, lastuser])
        handleClose()
        AlertNotify.InfoNotify("USUARIO AGREGADO")
    }

    /* Editar usuario */
    const updateUser = (id, updateUser) => {
        let update = users.map(user => (user.id === id ? updateUser : user))
        setUsers(update)
        Calls.updateApi(id, updateUser)
        handleClose()
        AlertNotify.EditNotify("USUARIO EDITADO")
    }

    /* Eliminar usuario */
    const deleteUser = (id) => {
        Calls.removeApi(id)
        setUsers(users.filter(user => user.id !== id))
        handleClose()
        AlertNotify.RemoveNotify("USUARIO ELIMINADO")

    }

    /* Botones Editar o Borrar */
    const editRow =(id)=> {
            setUserActual(users.filter(user => user.id === id))
            setConfirm(false)
            setEdit(true)
            handleOpen()
            console.log(userActual)
    }

    const removeData=()=> {
    }

    return (
        <Container fluid >
            <Row className='my-3'>
                <Col sm={12}>
                    <MenuCrud Buscar={Buscar} handleOpen={handleOpen} />
                </Col>
            </Row>
            <Row>
                <Col>
                    <Col className='text-center'>
                        <h1 className='mb-0'>DATOS</h1>
                    </Col>
                    <Row className='px-3'>
                        <Col className='text-center py-3' xs lg='6'>
                            <h4  className='text-left'>Total de Datos: <Badge variant='dark'>{users.length}</Badge></h4>
                        </Col>
                        <Col xs lg='6' className='text-right my-auto'>
                            <ButtonGroup>
                                <OverlayTrigger
                                    placement='top'
                                    overlay={
                                        <Tooltip >Editar</Tooltip>
                                    }>
                                    <Button variant='dark' size='sm' onClick={editRow}><FontAwesomeIcon icon={faUserEdit} /></Button>
                                </OverlayTrigger>
                                <OverlayTrigger
                                    placement='top'
                                    overlay={
                                        <Tooltip >Eliminar</Tooltip>
                                    }>
                                    <Button variant='dark' size='sm' onClick={removeData}><FontAwesomeIcon icon={faTrashAlt} /></Button>
                                </OverlayTrigger>
                                <OverlayTrigger
                                    placement='top'
                                    overlay={
                                        <Tooltip >Actualizar</Tooltip>
                                    }>
                                    <Button variant={ estado ? 'danger' : 'dark' } size='sm' onClick={showAll} >{ estado ? <FontAwesomeIcon icon={faTimes} /> : <FontAwesomeIcon icon={faSyncAlt} /> }</Button>
                                </OverlayTrigger>
                            </ButtonGroup>
                        </Col>
                    </Row>
                    <Fragment>
                        {edit ?
                            <EditUser show={show} handleClose={handleClose} userActual={userActual} updateUser={updateUser}  /> :
                            <Fragment>
                                {
                                    confirm ?
                                        <DeleteUser show={show} handleClose={handleClose} userActual={userActual} deleteUser={deleteUser} />
                                        :
                                        <NewUser show={show} handleClose={handleClose} addUser={addUser} />
                                }
                            </Fragment>
                        }
                    </Fragment>
                </Col>
            </Row>
            {/*  Controlador de Alertas */}
            <ToastContainer transition={Zoom} position="bottom-center" autoClose={2000} hideProgressBar closeOnClick draggable pauseOnHover={false} />
            {/* TABLA */}
            <Row>
                <Col>
                    <TableNew users={users} updateUser={updateUser} />
                </Col>
            </Row>
        </Container>
    )
}

export default CrudApp;