import React, { useState } from 'react'
import { Button, Modal, Table } from 'react-bootstrap'
import {toast} from 'react-toastify'
import DeleteAlert from '../../Utils/Alerts/DeleteAlert'
import Permission from '../../Layouts/Permission'

const OcupationList = ({ocupations, removeOcupation, role}) => {

    const [show, setShow] = useState(false)

    const handleDelete = (data) => {
        toast(<DeleteAlert action={() => removeOcupation(data)} />, {position: toast.POSITION.BOTTOM_CENTER, autoClose: false} )
    }

    return(
        <>
            <Button variant='primary' onClick={() => setShow(true)} className='my-2'>CARGOS</Button>
            <Modal show={show} onHide={() => setShow(false)} >
                <Modal.Header closeButton className='bg-primary' >
                    <Modal.Title className='text-center w-100 text-white' >LISTA DE CARGOS</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Table>
                        <thead className='bg-primary text-white text-center'>
                            <tr>
                                <th>CARGO</th>
                                <th>GERENCIA</th>
                                <th>ACCION</th>
                            </tr>
                        </thead>
                        <tbody>
                        {ocupations.map(ocu =>
                            <tr className='text-center'>
                                <td>{ocu.name}</td>
                                <td>{ocu.gerency}</td>
                                <td>
                                    <Permission
                                        role={role}
                                        perform='occupations:remove'
                                        yes={
                                            <Button variant='danger' size='sm' onClick={() => handleDelete(ocu.id)} >Eliminar</Button>
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

export default OcupationList