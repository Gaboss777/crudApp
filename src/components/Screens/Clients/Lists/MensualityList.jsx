import React, { useState } from 'react'
import { Button, Modal, Table } from 'react-bootstrap'
import PropTypes from 'prop-types'
import { toast } from 'react-toastify'
import ConfirmAlert from 'components/Utils/Alerts/ConfirmAlert'
import MensualityForm from '../Forms/MensualityForm'
import Permission from 'components/Layouts/Permission'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

const MensualityList = ({ list, selected, removeMensuality, updateMensuality, user, ...rest }) => {

      const [show, setShow] = useState(false)

      const handleDelete = (data) => {
            toast(<ConfirmAlert title='Desea eliminar los datos?' action={() => removeMensuality(data)} />, {position: toast.POSITION.BOTTOM_CENTER, autoClose: false} )
      }

      return (
            <>
                  <Button variant='primary' className='rounded-right' onClick={() => setShow(true)} {...rest} >Mensualidades</Button>
                  <Modal show={show} onHide={() => setShow(false)} centered >
                        <Modal.Header closeButton className='bg-primary'>
                              <Modal.Title className='text-center w-100 text-white font-weight-bold'>LISTA DE MENSUALIDADES</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                              <Table size='sm' className='text-center' responsive striped bordered>
                                    <thead className='bg-primary text-white'>
                                          <tr>
                                                <th>MONTO</th>
                                                <th>CONCEPTO</th>
                                                <th>OTROS</th>
                                                <th>MB</th>
                                                <th>ACCION</th>
                                          </tr>
                                    </thead>
                                    <tbody>
                                    { list.length > 0 && selected ?
                                          <>
                                          { list.filter(x => x.user_id === selected.id).map(data => 
                                                <tr className='font-cerecom-sm'>
                                                      <td>{data.amount}</td>
                                                      <td>{data.concept}</td>
                                                      <td>{data.extras ? data.extras : 'N/A'}</td>
                                                      <td>{data.bandwidth ? data.bandwidth : 'N/A'}</td>
                                                      <td>
                                                      <Permission 
                                                            role={user.role}
                                                            perform='clients:edit'
                                                            yes={<MensualityForm className='rounded ml-2' size='sm' edit={true} isModal={true} updateMensuality={updateMensuality} mensuality={data} selected={selected} />}
                                                      />
                                                      <Permission 
                                                            role={user.role}
                                                            perform='clients:remove'
                                                            yes={<Button variant='danger' className='mr-2 rounded' size='sm' onClick={() => handleDelete(data.id)}><FontAwesomeIcon icon={faTrash} /></Button>}
                                                      />
                                                      </td>
                                                </tr>
                                          )}
                                          </>
                                          : <tr><td colSpan={5}>NO HAY DATOS</td></tr>
                                    }
                                    </tbody>
                              </Table>
                        </Modal.Body>
                  </Modal>
            </>
      )
}

MensualityList.propTypes = {
      list: PropTypes.array,
      show: PropTypes.bool
}

MensualityList.defaultProps = {
      list: []
}



export default MensualityList