import React, { useState } from 'react';
import { Button, Modal, Table } from 'react-bootstrap';

const InfoModal = ({title}) => {

    const [showModal, setShowModal] = useState(false)

    const payment = []

    return (
        <>
            <Button variant='dark' onClick={() => setShowModal(true)} size='sm' >Ver Pagos</Button>
            <Modal show={showModal} onHide={()=> setShowModal(false)} dialogClassName='modal-xlg' >
                <Modal.Header closeButton className='bg-warning' >
                    <Modal.Title className=' text-center w-100 text-uppercase text-white'> PAGOS REALIZADOS EN {title}</Modal.Title>
                </Modal.Header>
                <Modal.Body >
                    <Table >
                        <thead>
                            <tr>
                                <th>FECHA</th>
                                <th>MONTO</th>
                                <th>METODO</th>
                                <th>BANCO</th>
                                <th># REFERENCIA</th>
                                <th>COMENTARIOS</th>
                            </tr>
                        </thead>
                        <tbody>
                        { payment.length > 0 ?
                            <>
                            { payment.map(pay =>
                                <tr>
                                    <td>{pay.date}</td>
                                    <td>{pay.amount}</td>
                                    <td>{pay.method}</td>
                                    <td>{pay.bank}</td>
                                    <td>{pay.reference}</td>
                                    <td>{pay.coment}</td>
                                </tr>
                            )}
                            </>
                            : <tr><td colSpan={6} className='text-center'>NO HAY PAGOS REALIZADOS</td></tr>
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