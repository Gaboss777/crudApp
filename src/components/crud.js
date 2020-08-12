/* Dependencias y otros*/
import React, { useState, useEffect, Fragment } from 'react';
import { uuid } from 'uuidv4';
import { ToastContainer, toast, Zoom } from 'react-toastify';
import { Col, Row, Container, Badge, Button } from 'react-bootstrap';

/* Funciones externas */
import Calls from '../axios-common/callaxios';
import AlertNotify from './alerts';

/* Componentes */
import { ViewTablet } from './tablets/tabletInfo';
import { NewUser } from './UserMods/addUser';
import { EditUser } from './UserMods/editUser';
import { DeleteUser } from './UserMods/deleteUser';
import { MenuCrud } from './Navbar';
import FindTable from './tablets/tableFind';

toast.configure()
const CrudApp = () => {
    /* Data */
    const [users, setUsers] = useState([])
    const [findUser, setFindUser] = useState([])

    /* Valores iniciales */
    const [userActual, setUserActual] = useState(null)
    const [edit, setEdit] = useState(false)
    const [show, setShow] = useState(false)
    const [confirm, setConfirm] = useState(false)
    const [estado, setEstado] = useState(false)

    /* Mostrar valores de la Api */
    useEffect(() => {
        Calls.getApi({setUsers})
    }, []);

    /* Funciones Modal */
    const handleClose = () => {
        setShow(false)
        setEdit(false)
        setConfirm(false)
    }
    const handleOpen = () => setShow(true)

    /* Funciones tabla buscar */
    const handleEstadoOpen =()=> setEstado(true)
    const handleEstadoClose =()=> setEstado(false)

    /* Acciones */

    /* Encontrar dato */
    const Buscar = (data) =>{
        let filtrarDatos = users.filter(user => user.idDocument === data || user.name === data || user.lastName === data || user.zoneLocation === data)

        if (filtrarDatos.length) {
            handleEstadoOpen()
            setFindUser(filtrarDatos)
        } else {
            AlertNotify.NoFoundNotify("DATO NO ENCONTRADO")
        }
    }

    /* Agregar usuario */
    const addUser = lastuser => {
        lastuser.id = uuid()
        setUsers([...users, lastuser])
        handleClose()
        handleEstadoClose()
        AlertNotify.InfoNotify("USUARIO AGREGADO")
    }

    /* Eliminar usuario */
    const deleteUser = (id) => {
        setEdit(false)
        setConfirm(false)

        Calls.removeApi(id)
        setUsers(users.filter(user => user.id !== id))
        handleClose()
        handleEstadoClose()
        AlertNotify.RemoveNotify("USUARIO ELIMINADO")

    }

    /* Editar usuario */
    const updateUser = (id, updateUser) => {
        let update = users.map(user => (user.id === id ? updateUser : user))
        setEdit(false)
        setConfirm(false)

        setUsers(update)
        Calls.updateApi(id, updateUser)
        handleClose()
        handleEstadoClose()
        AlertNotify.EditNotify("USUARIO EDITADO")
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
        <Container fluid >
            <Row className='my-3'>
                <Col sm={12}>
                    <MenuCrud Buscar={Buscar} handleOpen={handleOpen} />
                </Col>
            </Row>
            <Row>
                <Col>
                    <Col className='text-center'>
                        <h2>Datos</h2>
                    </Col>
                    <Row>
                        <Col className='text-center py-3' xs lg='6'>
                            <h4  className='text-left'>Total de Datos: <Badge variant='dark'>{estado ? findUser.length :users.length}</Badge></h4>
                        </Col>
                        <Col xs lg='6' className='text-right'>
                            { estado
                                ? <Button variant='danger' onClick={handleEstadoClose} >Cerrar</Button>
                                : ''
                            }
                        </Col>
                    </Row>
                    <Col className='text-center'>
                    { estado
                        ?   <FindTable findUser={findUser} editRow={editRow} /> 
                        :   <ViewTablet users={users} editRow={editRow} />
                    }
                    </Col>
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
            <ToastContainer transition={Zoom} position="bottom-center" autoClose={2000} hideProgressBar closeOnClick draggable pauseOnHover={false} />
        </Container>
    )
}

export default CrudApp;