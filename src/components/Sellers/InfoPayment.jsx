import React, { useState } from 'react'
import { Badge, Button, Modal, Table } from 'react-bootstrap'
import moment from 'moment'
import DeleteAlert from '../Alerts/DeleteAlert'
import { toast } from 'react-toastify'

const InfoPayment = ({month, sells, removeSell, clientsList, year}) => {

    const [show, setShow] = useState('')

    const handleDelete = (data) => {
        toast(<DeleteAlert action={() => removeSell(data)} />, {position: toast.POSITION.BOTTOM_CENTER, autoClose: false })
    }

    return (
        <>
            <Button variant='dark' size='sm' onClick={() => setShow(true)} className='mr-2'>Pagos</Button>
            <Modal show={show} onHide={() => setShow(false)} size='lg'>
                <Modal.Header closeButton className='bg-dark'>
                    <Modal.Title className='text-white w-100 text-center' >Pagos del {month.name.toUpperCase()}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Table>
                        <thead>
                            <tr>
                                <th>CLIENTE</th>
                                <th>MONTO</th>
                                <th>FECHA</th>
                                <th>MONEDA</th>
                                <th>STATUS</th>
                                <th>ACCION</th>
                            </tr>
                        </thead>
                        <tbody>
                        {sells.length > 0 ?
                            <>
                            {sells.filter(x=>x.period === month.id+'-'+year).map(p =>{
                                let clientName = clientsList.filter(x => x.id === p.client_id).map(x => {return x.name})
                                return( 
                                    <tr>
                                        <td>{clientName}</td>
                                        <td>{p.amount.toFixed(2)}</td>
                                        <td>{moment(p.date, 'YYYY-MM-DD').format('YYYY-MM-DD')}</td>
                                        <td>{p.currency}</td>
                                        <td><Badge variant='danger'>PENDIENTE</Badge> </td>
                                        <td><Button variant='danger' onClick={() => handleDelete(p.id)} size='sm'>Eliminar</Button> </td>
                                    </tr>
                                )}
                            )}
                            </>
                            : <tr><td colSpan={6} className='text-center'>NO HAY PAGOS REALIZADOS</td></tr>
                        }
                        </tbody>
                    </Table>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default InfoPayment