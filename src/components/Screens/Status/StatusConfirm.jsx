import { faCheckSquare } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { Button, Col, Modal, Row, Table, Container } from 'react-bootstrap'

const StatusConfirm = ({ payments, updatePayments }) =>{

      const [show, setShow] = useState(false)

      const handleValidation = () => {
            let data = payments.map(x => {return {...x, validation: 1}})
            data.forEach(val => updatePayments(val))
            setShow(false)
      }

      return (
            <>
            <Button variant='primary' className='rounded' onClick={()=>setShow(true)} size='sm'><FontAwesomeIcon icon={faCheckSquare} /></Button>
            <Modal show={show} onHide={() => setShow(false)} centered dialogClassName='modal-m-lg' >
                  <Modal.Header className='bg-primary' closeButton>
                        <Modal.Title className='w-100 text-center text-white font-weight-bold'>VALIDAR PAGOS</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                        <Container>
                              <Row className='justify-content-center'>
                                    <Col sm lg={12} className='text-center mb-2'>
                                          <p>DESEA VALIDAR LOS SIGUIENTES DATOS?</p>
                                    </Col>
                                    <Col sm lg={12}>
                                          <Table size='sm' responsive striped bordered>
                                                <thead className='bg-primary text-white'>
                                                      <tr>
                                                            <th>FECHA</th>
                                                            <th>FACTURA</th>
                                                            <th>CONTROL</th>
                                                            <th>MONTO</th>
                                                            <th>MONEDA</th>
                                                            <th>CONCEPTO</th>
                                                            <th>METODO</th>
                                                            <th>BANCO</th>
                                                            <th>REFERENCIA</th>
                                                      </tr>
                                                </thead>
                                                <tbody>
                                                { payments.map(pay =>
                                                      <tr>
                                                            <td>{pay.date}</td>
                                                            <td>{pay.numbill}</td>
                                                            <td>{pay.numcontrol}</td>
                                                            <td>{new Intl.NumberFormat('es-VE', { minimumFractionDigits: 2 }).format(pay.amount)}</td>
                                                            <td>{pay.currency}</td>
                                                            <td>{pay.concept}</td>
                                                            <td>{pay.method}</td>
                                                            <td>{pay.bank}</td>
                                                            <td>{pay.reference}</td>
                                                      </tr>
                                                )}
                                                </tbody>
                                          </Table>
                                    </Col>
                              </Row>
                              <Row>
                                    <Col className='text-center'>
                                          <Button variant='success' className='rounded' onClick={() => handleValidation()}>ACEPTAR</Button>
                                          <Button variant='danger' className='ml-2 rounded' onClick={() => setShow(false)}>CANCELAR</Button>
                                    </Col>
                              </Row>
                        </Container>
                  </Modal.Body>
            </Modal>
            </>
      )
}

export default StatusConfirm