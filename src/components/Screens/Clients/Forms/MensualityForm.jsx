import { faPlusSquare, faUserEdit } from '@fortawesome/free-solid-svg-icons'
import React, { useState, Fragment, useEffect } from 'react'
import { Col, Form, Button, Modal, Row, Table } from 'react-bootstrap'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import Alerts from 'components/Utils/Alerts/alerts'

const MensualityForm = ({ selected, isModal, createMensuality, edit, mensuality, updateMensuality, ...rest }) => {

      const [concept, setConcept] = useState('')
      const [amount, setAmount] = useState(0)
      const [bandwidth, setBandwidth] = useState('')
      const [another, setAnother] = useState('')

      const [showModal, setShowModal] = useState(false)
      const [list, setList] = useState([])

      const client = selected[0]

      const addToList = () => {
            if(concept && amount){
                  let data = {concept, amount, bandwidth, extras: another, user_id: client.id }
                  let newList = list
                  newList.push(data)
                  setList(newList)
                  setConcept('')
                  setAmount(0)
                  setBandwidth('')
                  setAnother('')
            } else {
                  Alerts.NoFoundNotify('DATOS VACIOS')
            }
      }

      const onSubmit = (e) => {
            e.preventDefault()
            if(edit){
                  let data = { id: mensuality.id, concept, amount, bandwidth, extras: another, user_id: client.id }
                  updateMensuality(data)
            } else {
                  list.forEach(x => createMensuality(x))
            }
            setShowModal(false)
            onCancel()
      }

      const onCancel = () => {
            setShowModal(false)
            setList([])
            setConcept('')
            setAmount(0)
            setBandwidth('')
            setAnother('')
      }
      
      useEffect(() => {
            if(edit && mensuality){
                  setConcept(mensuality.concept)
                  setAmount(mensuality.amount)
                  setBandwidth(mensuality.bandwidth)
                  setAnother(mensuality.extras)
            }
      }, [list, edit, mensuality])

      const table = (
            <Table responsive striped bordered size='sm' className='text-center'>
                  <thead className='bg-primary text-white'>
                        <tr>
                              <th>CONCEPTO</th>
                              <th>MONTO</th>
                              <th>MB</th>
                              <th>OTROS</th>
                        </tr>
                  </thead>
                  <tbody>
                        { list.lenght > 0
                              ?     <>
                                    {list.map(data =>
                                          <tr className='font-cerecom-sm'>
                                                <td>{data.concept}</td>
                                                <td>{data.amount}</td>
                                                <td>{data.bandwidth ? data.bandwidth : 'N/A'}</td>
                                                <td>{data.another ? data.another : 'N/A'}</td>
                                          </tr>
                                    )}
                                    </>
                              : <tr><td colSpan={4}>NO HAY DATOS AGREGADOS</td></tr>
                        }
                  </tbody>
            </Table>
      )

      const form = (
            <Form onSubmit={onSubmit}>
                  <Form.Row>
                        <Form.Group as={Col} sm lg={2}>
                              <Form.Label>Monto</Form.Label>
                              <Form.Control size='sm' type='number' value={amount} onChange={({target}) => setAmount(target.valueAsNumber)} />
                        </Form.Group>
                        <Form.Group as={Col} sm lg={4}>
                              <Form.Label>Concepto</Form.Label>
                              <Form.Control size='sm' as='select' value={concept} onChange={({target}) => setConcept(target.value)} >
                                    <option value='' >Elija una opcion</option>
                                    <option value='servicio'>Servicio</option>
                                    <option value='alquiler'>Alquiler</option>
                                    <option value='mantenimiento'>Mantenimiento</option>
                                    <option value='otros'>Otros</option>
                              </Form.Control>
                        </Form.Group>
                        <Form.Group as={Col} sm lg={3}>
                              <Form.Label>Otros</Form.Label>
                              <Form.Control size='sm' disabled={ concept !== 'otros' ? true : false } type='text' value={another} onChange={({target}) => setAnother(target.value)} />
                        </Form.Group>
                        <Form.Group as={Col} sm lg={1}>
                              <Form.Label>MB</Form.Label>
                              <Form.Control size='sm' type='text' value={bandwidth} onChange={({target}) => setBandwidth(target.value)} />
                        </Form.Group>
                        {!edit &&
                              <Col sm lg={2} className='my-auto text-center'>
                                    <Button variant='primary' className='rounded' onClick={() => addToList()}><FontAwesomeIcon icon={faPlusSquare} /></Button>
                              </Col>
                        }
                  </Form.Row>
                  <Row>
                        <Col className='my-2 text-center'>
                              <Button type='submit' variant='success' className='rounded' size='sm' disabled={list.length > 0 || edit ? false : true}>{edit ? 'EDITAR' : 'CREAR'}</Button>
                              <Button variant='danger' onClick={() => onCancel()} size='sm' className='ml-2 rounded'>CANCELAR</Button>
                        </Col>
                  </Row>
            </Form>
      )

      if(isModal){
            return (
                  <Fragment>
                        <Button {...rest} disabled={selected.length !== 1 ? true : false} variant='primary' onClick={() => setShowModal(true)}>{edit ? <FontAwesomeIcon icon={faUserEdit} /> : <FontAwesomeIcon icon={faPlusSquare} size='lg' /> }</Button>
                        <Modal show={showModal} onHide={() => setShowModal(false)} centered dialogClassName='modal-m-sm'>
                              <Modal.Header closeButton className='bg-primary' >
                                    <Modal.Title className='text-center w-100 text-white font-weight-bold' >{edit ? 'EDITAR' : 'CREAR'} MENSUALIDAD </Modal.Title>
                              </Modal.Header>
                              <Modal.Body>
                              <Row>
                                    <Col sm lg={12}>
                                          {form}
                                    </Col>
                                    {!edit &&
                                          <Col sm lg={12}>
                                                {table}
                                          </Col>
                                    }
                              </Row>
                              </Modal.Body>
                        </Modal>
                  </Fragment>
            )
      } else return form
}

export default MensualityForm