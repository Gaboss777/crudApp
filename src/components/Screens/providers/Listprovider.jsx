import React, { useState } from 'react'
import { Button, Modal, Table } from 'react-bootstrap'
import ConfirmAlert from '../../Utils/Alerts/ConfirmAlert'
import {toast} from 'react-toastify'
import Permission from '../../Layouts/Permission'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import NewProvider from './CreateProvider'

const Listprovider = ({providers, removeProvider, user, updateProvider}) => {

    const [show, setShow] = useState(false)

    const handleDelete = (data) => {
        toast(<ConfirmAlert title='Desea eliminar los datos?' action={() => removeProvider(data)} />, {position: toast.POSITION.BOTTOM_CENTER, autoClose: false} )
    }

    return (
        <>
            <Button variant='primary' onClick={() => setShow(true)} className='rounded-right' >Proveedores</Button>
            <Modal show={show} onHide={() => setShow(false)}>
                <Modal.Header closeButton className='bg-primary'>
                    <Modal.Title className='text-white text-center w-100 font-weight-bold'>Lista de Proveedores</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Table size='sm' responsive striped bordered className='text-center' >
                        <thead className='bg-primary text-white'>
                            <tr>
                                <th>RAZON SOCIAL</th>
                                <th>SERVICIO</th>
                                <th>ACCION</th>
                            </tr>
                        </thead>
                        <tbody>
                        {providers.map(provider => 
                            <tr  className='font-cerecom-sm'>
                                <td>{provider.name}</td>
                                <td>{provider.service}</td>
                                <td>
                                    <Permission 
                                        role={user.role}
                                        perform='providers:edit'
                                        yes={
                                            <NewProvider edit={true} provider={provider} updateProvider={updateProvider} isModal={true} />
                                        }
                                    />
                                    <Permission 
                                        role={user.role}
                                        perform='providers:remove'
                                        yes={
                                            <Button variant='danger' size='sm' className='ml-2' onClick={() => handleDelete(provider.id)} ><FontAwesomeIcon icon={faTrash} /></Button>
                                        }
                                    />
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </Table>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default Listprovider