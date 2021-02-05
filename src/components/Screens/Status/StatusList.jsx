import { useFilteredList } from 'components/Hooks/useFilteredList'
import PaginationList from 'components/Utils/PaginationList'
import ConfirmAlert from 'components/Utils/Alerts/ConfirmAlert'
import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { Container, Table, Badge, Button, Row, Col } from 'react-bootstrap'
import StatusConfirm from './StatusConfirm'
import { BtnPagination } from 'components/Utils/PaginationList'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWindowClose } from '@fortawesome/free-solid-svg-icons'

const StatusList = ({ clients, updatePayments, payments, year, criteria, month }) => {

      const [currentPage, setCurrentPage] = useState(1)
      const [usersPerPage, setUsersPerPage] = useState(15)

      const newList = useFilteredList(criteria, clients)

      const indexOfLastUser = currentPage * usersPerPage
      const indexOfFirstUser = indexOfLastUser - usersPerPage
      const currentList = newList.slice(indexOfFirstUser, indexOfLastUser)

      const handleValidation = (arrData) => {
            let data = arrData.map(x => {return {...x, validation: 0}})
            data.forEach(val => updatePayments(val))
      }

      const removeValidation = (id) => {
            let paymentFilter = payments.filter(x => x.user_id === id)
            toast(<ConfirmAlert title='Desea invalidar este cliente?' action={() => handleValidation(paymentFilter)} />, {position: toast.POSITION.BOTTOM_CENTER, autoClose: false} )
      }

      return (
            <Container fluid className='px-0'>
                  <Row>
                        <Col sm lg={2}>
                              <p className='mb-0 my-2 font-weight-bold'>Mostrar del {indexOfFirstUser + 1} al {indexOfLastUser}</p>
                        </Col>
                        <Col sm lg={1}>
                              <BtnPagination setUsersPerPage={setUsersPerPage} usersPerPage={usersPerPage} list={newList} />
                        </Col>
                        <Col sm lg={9}>
                              <PaginationList usersPerPage={usersPerPage} currentPage={currentPage} list={newList} setUsersPerPage={setUsersPerPage} setCurrentPage={setCurrentPage} />
                        </Col>
                  </Row>
                  <Row>
                        <Col sm lg={12}>
                              <Table size='sm' className='mt-2 text-center' striped bordered responsive>
                                    <thead className='cerecom-bg-dark text-white'>
                                          <tr>
                                                <th>CLIENTE</th>
                                                <th>MENSUALIDAD</th>
                                                <th>LOCALIZACION</th>
                                                <th>SERVICIO</th>
                                                <th>STATUS</th>
                                                <th>VALIDACION</th>
                                                <th>ACCION</th>
                                          </tr>
                                    </thead>
                                    <tbody>
                                    { clients.length > 0 ?
                                          <>
                                          {currentList.map(user => {

                                                let paymentsFilter = payments.filter(pay => pay.user_id === user.id && pay.period === month+'-'+year)
                                                let validation = paymentsFilter.map(p => p.validation)

                                                return (
                                                      <tr className='font-cerecom-sm'>
                                                            <td>{user.name}</td>
                                                            <td>{user.mensuality}</td>
                                                            <td>{user.location}</td>
                                                            <td>{user.service}</td>
                                                            <td><Badge variant={user.status === 'Activo' ? 'success' : user.status === 'Cancelado' ? 'danger' : 'warning'} >{user.status.toUpperCase()}</Badge></td>
                                                            <td><Badge variant={validation.includes(1) ? 'primary' : 'danger'}>{validation.includes(1) ? 'VALIDADO' : 'PENDIENTE'}</Badge></td>
                                                            <td>
                                                            { paymentsFilter.length > 0 ?
                                                                  <>
                                                                  { validation.includes(0) 
                                                                        ? <StatusConfirm payments={paymentsFilter} updatePayments={updatePayments} />
                                                                        : <Button variant='danger' size='sm' onClick={() => removeValidation(user.id)} className='rounded' ><FontAwesomeIcon icon={faWindowClose} /></Button>
                                                                  }
                                                                  </>
                                                                  : null
                                                            }
                                                            </td>
                                                      </tr>
                                                )}
                                          )}
                                          </>
                                          : <tr><td colSpan={7}>NO HAY DATOS</td></tr>
                                    }
                                    </tbody>
                              </Table>
                        </Col>
                  </Row>
            </Container>
      )
}

export default StatusList