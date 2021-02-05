import React, { useState } from 'react'
import { Button, Modal, Table } from 'react-bootstrap'
import {toast} from 'react-toastify'
import ConfirmAlert from '../../Utils/Alerts/ConfirmAlert'
import Permission from '../../Layouts/Permission'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import OcupationForm from './Forms/OcupationForm'

const OcupationList = ({ocupations, removeOcupation, role, updateOcupation}) => {

    const [show, setShow] = useState(false)

    const handleDelete = (data) => {
        toast(<ConfirmAlert title='Desea eliminar los datos?' action={() => removeOcupation(data)} />, {position: toast.POSITION.BOTTOM_CENTER, autoClose: false} )
    }

    return(
        <>
            <Button variant='primary' onClick={() => setShow(true)} className='rounded-right'>CARGOS</Button>
            <Modal show={show} onHide={() => setShow(false)} >
                <Modal.Header closeButton className='bg-primary' >
                    <Modal.Title className='text-center w-100 text-white font-weight-bold'>LISTA DE CARGOS</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Table size='sm' striped bordered responsive className='text-center'>
                        <thead className='bg-primary text-white'>
                            <tr>
                                <th>CARGO</th>
                                <th>GERENCIA</th>
                                <th>ACCION</th>
                            </tr>
                        </thead>
                        <tbody>
                        {ocupations.map(ocu =>
                            <tr className='font-cerecom-sm'>
                                <td>{ocu.name}</td>
                                <td>{ocu.gerency}</td>
                                <td>
                                    <Permission 
                                        role={role}
                                        perform='employies:edit'
                                        yes={
                                            <OcupationForm edit={true} isModal={true} updateOcupation={updateOcupation} occupation={ocu} />
                                        }
                                    />
                                    <Permission
                                        role={role}
                                        perform='employies:remove'
                                        yes={
                                            <Button variant='danger' className='ml-2' size='sm' onClick={() => handleDelete(ocu.id)} ><FontAwesomeIcon icon={faTrash} /></Button>
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