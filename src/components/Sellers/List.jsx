import React, { Fragment, useState } from 'react'
import { Button, Modal, Table } from 'react-bootstrap'
import SellerForm from './forms/SellerForm'
import moment from 'moment';
import { toast } from 'react-toastify';
import DeleteAlert from '../Alerts/DeleteAlert';

const SellersList = ({list, removeSeller, updateSellUser}) => {

    const [show, setShow] = useState(false)

    const handleDelete = (data) => {
        toast(<DeleteAlert action={() => removeSeller(data)}/>, {position: toast.POSITION.BOTTOM_CENTER, autoClose: false })
    }

    return (
        <Fragment>
            <Button variant='primary' onClick={() => setShow(true)} >VENDEDORES</Button>
            <Modal show={show} onHide={() => setShow(false)} size='lg' >
                <Modal.Header closeButton className='bg-primary'>
                    <Modal.Title className='text-center w-100 text-white'>LISTA DE VENDEDORES</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Table >
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>NOMBRES</th>
                                <th>APELLIDOS</th>
                                <th>CEDULA</th>
                                <th>FECHA INGRESO</th>
                                <th>ACCION</th>
                            </tr>
                        </thead>
                        <tbody>
                            {list.map(user =>
                                <tr>
                                    <td>{user.id}</td>
                                    <td>{user.firstname} {user.secondname} </td>
                                    <td>{user.lastname} {user.secondsurname}</td>
                                    <td>{user.document}</td>
                                    <td>{moment(user.date, 'YYYY-MM-DD').format('YYYY-MM-DD')}</td>
                                    <td>
                                        <Button variant='danger' onClick={() => handleDelete(user.id)} size='sm' >ELIMINAR</Button>
                                        <SellerForm isModal={true} editing={true} user={user} textBtn='Editar' sizeBtn='sm' className='ml-2' updateSellUser={updateSellUser} />
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </Modal.Body>
            </Modal>
        </Fragment>
    )
}

export default SellersList