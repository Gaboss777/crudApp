import React, { useState } from 'react'
import { Button, Modal, Table } from 'react-bootstrap'
import DeleteAlert from '../Alerts/DeleteAlert'
import {toast} from 'react-toastify'

const Listprovider = ({providers, removeProvider}) => {

    const [show, setShow] = useState(false)

    const handleDelete = (data) => {
        toast(<DeleteAlert action={() => removeProvider(data)} />, {position: toast.POSITION.BOTTOM_CENTER, autoClose: false} )
    }

    return (
        <>
            <Button variant='primary' onClick={() => setShow(true)} className='my-2' >Proveedores</Button>
            <Modal show={show} onHide={() => setShow(false)}>
                <Modal.Header closeButton className='bg-primary'>
                    <Modal.Title className='text-white text-center w-100'>Lista de Proveedores</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Table>
                        <thead>
                            <tr>
                                <th>RAZON SOCIAL</th>
                                <th>SERVICIO</th>
                                <th>ACCION</th>
                            </tr>
                        </thead>
                        <tbody>
                        {providers.map(p => 
                            <tr>
                                <td>{p.name}</td>
                                <td>{p.service}</td>
                                <td><Button variant='danger' onClick={() => handleDelete(p.id)} size='sm'>Eliminar</Button></td>
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