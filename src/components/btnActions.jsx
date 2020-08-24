import React, {useState, Fragment} from 'react';
import { Button, ButtonGroup, OverlayTrigger, Tooltip, Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserEdit, faTrashAlt, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import NewUser from './Forms/addUser';
import EditUser from './Forms/editUser';
import DeleteUser from './Forms/deleteUser';

const ButtonActions =()=> {
    const [show, setShow] = useState(false)
    const [edit, setEdit] = useState(false)
    const [remove, setRemove] = useState(false)

    const handleOpen =()=> setShow(true)
    const handleClose=()=> {
        setShow(false)
        setEdit(false)
        setRemove(false)
    }

    const editRow =()=> {
        setEdit(true)
        setRemove(false)
        handleOpen()
    }

    const removeRow=()=>{
        setEdit(false)
        setRemove(true)
        handleOpen()
    }

    return (
        <Container fluid  className='my-2' >
            <Row>
                <Col xs={12} >
                    <ButtonGroup >
                        <OverlayTrigger
                            placement='bottom'
                            overlay={
                                <Tooltip >Editar</Tooltip>
                            }>
                            <Button variant='warning' size='sm' onClick={handleOpen} ><FontAwesomeIcon icon={faUserPlus} /></Button>
                        </OverlayTrigger>
                        <OverlayTrigger
                            placement='bottom'
                            overlay={
                                <Tooltip >Editar</Tooltip>
                            }>
                            <Button variant='warning' size='sm' onClick={editRow} ><FontAwesomeIcon icon={faUserEdit} /></Button>
                        </OverlayTrigger>
                        <OverlayTrigger
                            placement='bottom'
                            overlay={
                                <Tooltip >Eliminar</Tooltip>
                            }>
                            <Button variant='warning' size='sm' onClick={removeRow} ><FontAwesomeIcon icon={faTrashAlt} /></Button>
                        </OverlayTrigger>
                    </ButtonGroup>
                </Col>
            </Row>
            <Fragment>
                { edit
                    ? <EditUser show={show} handleClose={handleClose} /> :
                    <Fragment>
                        {
                            remove
                            ? <DeleteUser show={show} handleClose={handleClose} />
                            : <NewUser show={show} handleClose={handleClose} />
                        }
                    </Fragment>
                }
            </Fragment>
        </Container>
    )
}

export default ButtonActions