import React, { useState } from 'react'
import { Badge, Button, Modal, Table } from 'react-bootstrap'
import moment from 'moment'
import ConfirmAlert from '../../Utils/Alerts/ConfirmAlert'
import { toast } from 'react-toastify'
import Permission from '../../Layouts/Permission'
import Alerts from 'components/Utils/Alerts/alerts'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckSquare, faTrash, faWindowClose } from '@fortawesome/free-solid-svg-icons'

const InfoPayment = ({month, sells, removeSell, clientsList, year, user, validationSell}) => {

    const [show, setShow] = useState('')

    const handleDelete = (data) => {
        toast(<ConfirmAlert title='Desea eliminar los datos?' action={() => removeSell(data)} />, {position: toast.POSITION.BOTTOM_CENTER, autoClose: false })
    }

    const handleValidation = (data, confirm) => {
        if(confirm === 1) {
            Alerts.EditNotify('Pago Validado')
        } else {
            Alerts.RemoveNotify('Pago Invalidado')
        }
        let newData = {...data, validation: confirm}
        validationSell(newData)
    }

    return (
        <>
            <Button variant='dark' size='sm' onClick={() => setShow(true)} className='mr-2 rounded'>VER PAGOS</Button>
            <Modal show={show} onHide={() => setShow(false)} size='lg'>
                <Modal.Header closeButton className='bg-dark'>
                    <Modal.Title className='text-white w-100 text-center font-weight-bold' >Pagos del {month.name.toUpperCase()}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Table size='sm' responsive bordered striped className='text-center'>
                        <thead className='bg-dark text-white'>
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
                                    <tr className='font-cerecom-sm'>
                                        <td>{clientName}</td>
                                        <td>{new Intl.NumberFormat().format(p.amount)}</td>
                                        <td>{moment(p.date, 'YYYY-MM-DD').format('YYYY-MM-DD')}</td>
                                        <td>{p.currency}</td>
                                        <td><Badge variant={ p.validation === 1 ? 'success' : 'danger' }>{ p.validation === 1 ? 'PAGADO' : 'PENDIENTE' }</Badge> </td>
                                        <td>
                                            <Permission
                                                role={user.role}
                                                perform='sellers:remove'
                                                yes={
                                                    <Button variant='danger' onClick={() => handleDelete(p.id)} size='sm' ><FontAwesomeIcon icon={faTrash} /></Button>
                                                }
                                            />
                                            { p.validation !== 1 
                                                ? <Button variant='success' size='sm' className='ml-2' onClick={() => handleValidation(p, 1)} ><FontAwesomeIcon icon={faCheckSquare} /></Button>
                                                : <Button variant='warning' size='sm' className='ml-2' onClick={() => handleValidation(p, 0)}><FontAwesomeIcon icon={faWindowClose} /></Button>
                                            }
                                        </td>
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