import React, { useState } from 'react';
import { Button, Modal, Table } from 'react-bootstrap';
import {toast} from 'react-toastify'
import DeleteAlert from '../../Alerts/DeleteAlert'

const InfoModal = ({month,payments, year, removePayment}) => {
    const [showModal, setShowModal] = useState(false)

    const handleDelete = (data) => {
        toast(<DeleteAlert action={() => removePayment(data)} />, {position: toast.POSITION.BOTTOM_CENTER, autoClose: false} )
    }

    return (
        <>
            <Button variant='dark' onClick={() => setShowModal(true)} size='sm' >Ver Pagos</Button>
            <Modal show={showModal} onHide={()=> setShowModal(false)} dialogClassName='modal-xlg' >
                <Modal.Header closeButton className='bg-dark' >
                    <Modal.Title className=' text-center w-100 text-uppercase text-white'> PAGOS REALIZADOS EN {month.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body  >
                    <Table >
                        <thead className='bg-dark text-white'>
                            <tr>
                                <th>FECHA</th>
                                <th>MONTO</th>
                                <th>MONEDA</th>
                                <th>DESCUENTO</th>
                                <th>METODO</th>
                                <th>BANCO</th>
                                <th>#REFERENCIA</th>
                                <th>COMENTARIOS</th>
                                <th>IMAGEN</th>
                                <th>ACCION</th>
                            </tr>
                        </thead>
                        <tbody>
                        { payments.length > 0 ?
                            <>
                            { payments.filter(x=>x.period===month.id+'-'+year).map(pay =>{
                                let img = pay.imgUrl

                                return(
                                    <tr>
                                        <td>{pay.date}</td>
                                        <td>{pay.amount}</td>
                                        <td>{pay.currency}</td>
                                        <td>{pay.discount} %</td>
                                        <td>{pay.method}</td>
                                        <td>{pay.bank}</td>
                                        <td>{pay.reference}</td>
                                        <td>{pay.comment}</td>
                                        <td>{img ? URL.createObjectURL(img) : 'NO HAY IMAGEN'}</td>
                                        <td><Button variant='danger' onClick={() => handleDelete(pay.id)} size='sm' >ELIMINAR</Button> </td>
                                    </tr>
                                )}
                            )}
                            </>
                            : <tr><td colSpan={9} className='text-center'>NO HAY PAGOS REALIZADOS</td></tr>
                        }
                        </tbody>
                    </Table>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='danger' onClick={() => setShowModal(false)} size='sm' >CERRAR</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}


export default InfoModal