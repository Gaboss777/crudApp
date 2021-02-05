import React, { Fragment, useState } from 'react'
import { Button, Modal, Table } from 'react-bootstrap'
import SellerForm from './forms/SellerForm'
import moment from 'moment';
import { toast } from 'react-toastify';
import ConfirmAlert from '../../Utils/Alerts/ConfirmAlert';
import Permission from '../../Layouts/Permission';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faUserEdit } from '@fortawesome/free-solid-svg-icons';

const SellersList = ({list, removeSeller, updateSellUser, role}) => {

    const [show, setShow] = useState(false)

    const handleDelete = (data) => {
        toast(<ConfirmAlert title='Desea eliminar el siguiente dato?' action={() => removeSeller(data)}/>, {position: toast.POSITION.BOTTOM_CENTER, autoClose: false })
    }

    return (
        <Fragment>
            <Button variant='primary' className='rounded-right' onClick={() => setShow(true)} >VENDEDORES</Button>
            <Modal show={show} onHide={() => setShow(false)} size='lg' >
                <Modal.Header closeButton className='bg-primary'>
                    <Modal.Title className='text-center w-100 text-white'>LISTA DE VENDEDORES</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Table responsive striped bordered size='sm' className='text-center' >
                        <thead className='bg-primary text-white'>
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
                                <tr className='font-cerecom-sm'>
                                    <td>{user.id}</td>
                                    <td>{user.firstname} {user.secondname} </td>
                                    <td>{user.lastname} {user.secondsurname}</td>
                                    <td>{user.document}</td>
                                    <td>{moment(user.date, 'YYYY-MM-DD').format('YYYY-MM-DD')}</td>
                                    <td>
                                        <Permission 
                                            role={role}
                                            perform='sellers:edit'
                                            yes={
                                                <SellerForm isModal={true} editing={true} user={user} textBtn={<FontAwesomeIcon icon={faUserEdit} />} sizeBtn='sm' className='ml-2' updateSellUser={updateSellUser} />
                                            }
                                        />
                                        <Permission
                                            role={role}
                                            perform='sellers:remove'
                                            yes={
                                                <Button className='ml-2 rounded' variant='danger' onClick={() => handleDelete(user.id)} size='sm' ><FontAwesomeIcon icon={faTrash} /></Button>
                                            }

                                        />
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