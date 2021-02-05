import React, { useState } from 'react';
import { Button, Modal, Table } from 'react-bootstrap';
import {toast} from 'react-toastify'
import ConfirmAlert from 'components/Utils/Alerts/ConfirmAlert'
import Permission from 'components/Layouts/Permission';
import PayForm from './PayForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const InfoModal = ({month,payments, user, year, removePayment, updatePayment, client}) => {
    const [showModal, setShowModal] = useState(false)

    const handleDelete = (data) => {
        toast(<ConfirmAlert title='Desea eliminar los datos?' action={() => removePayment(data)} />, {position: toast.POSITION.BOTTOM_CENTER, autoClose: false} )
    }

    return (
        <>
            <Button variant='dark' onClick={() => setShowModal(true)} size='sm' className='rounded' >VER PAGOS</Button>
            <Modal show={showModal} onHide={()=> setShowModal(false)} dialogClassName='modal-xlg' >
                <Modal.Header closeButton className='bg-dark' >
                    <Modal.Title className=' text-center w-100 text-uppercase text-white'> PAGOS REALIZADOS EN {month.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body  >
                    <Table size='sm' responsive bordered striped >
                        <thead className='bg-dark text-white'>
                            <tr>
                                <th>FECHA</th>
                                <th>FACTURA</th>
                                <th>CONTROL</th>
                                <th>MONTO</th>
                                <th>MONEDA</th>
                                <th>DESCUENTO</th>
                                <th>CONCEPTO</th>
                                <th>METODO</th>
                                <th>BANCO</th>
                                <th>#REFERENCIA</th>
                                <th>COMENTARIOS</th>
                                <th>ACCION</th>
                            </tr>
                        </thead>
                        <tbody>
                        { payments.length > 0 ?
                            <>
                            { payments.filter(x=>x.period===month.id+'-'+year).map(pay =>{

                                return(
                                    <tr className='font-cerecom-sm'>
                                        <td>{pay.date}</td>
                                        <td>{pay.numbill}</td>
                                        <td>{pay.numcontrol}</td>
                                        <td>{new Intl.NumberFormat('es-VE', {minimumFractionDigits: 2}).format(pay.amount)}</td>
                                        <td>{pay.currency}</td>
                                        <td>{pay.discount} %</td>
                                        <td>{pay.concept}</td>
                                        <td>{pay.method}</td>
                                        <td>{pay.bank}</td>
                                        <td>{pay.reference}</td>
                                        <td>{pay.comment}</td>
                                        <td>
                                            <Permission 
                                                role={user.role}
                                                perform='paymentsClient:edit'
                                                yes={<PayForm edit={true} asModal={true} updatePayment={updatePayment} month={month} year={year} client={client} payment={pay} />}
                                            />
                                            <Permission
                                                role={user.role}
                                                perform='paymentsClient:remove'
                                                yes={<Button className='ml-2 rounded' variant='danger' onClick={() => handleDelete(pay.id)} size='sm' ><FontAwesomeIcon icon={faTrash} /></Button>}
                                            />
                                        </td>
                                    </tr>
                                )}
                            )}
                            </>
                            : <tr><td colSpan={11} className='text-center'>NO HAY PAGOS REALIZADOS</td></tr>
                        }
                        </tbody>
                    </Table>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='danger' className='rounded' onClick={() => setShowModal(false)} size='sm' >CERRAR</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}


export default InfoModal