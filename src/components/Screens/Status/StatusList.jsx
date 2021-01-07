import { useFilteredList } from 'components/Hooks/useFilteredList'
import PaginationList from 'components/Utils/PaginationList'
import React, { useState } from 'react'
import { Tab, Table, Tabs, Badge } from 'react-bootstrap'
import StatusConfirm from './StatusConfirm'

const StatusList = ({ clients, updatePayments, payments, year, criteria }) => {

      const months = [{ id: '01', name: 'enero' }, { id: '02', name: 'febrero' }, { id: '03', name: 'marzo' }, { id: '04', name: 'abril' }, { id: '05', name: 'mayo' }, { id: '06', name: 'junio' }, { id: '07', name: 'julio' }, { id: '08', name: 'agosto' }, { id: '09', name: 'septiembre' }, { id: '10', name: 'octubre' }, { id: '11', name: 'noviembre' }, { id: '12', name: 'diciembre' }]
      const initialMonth = months[0]
      const [key, setKey] = useState(initialMonth.id)
      const [currentPage, setCurrentPage] = useState(1)
      const [usersPerPage, setUsersPerPage] = useState(10)

      const newList = useFilteredList(criteria, clients)

      const indexOfLastUser = currentPage * usersPerPage
      const indexOfFirstUser = indexOfLastUser - usersPerPage
      const currentList = newList.slice(indexOfFirstUser, indexOfLastUser)

      return (
            <>
            <Tabs activeKey={key} onSelect={(k) => setKey(k)} className='nav-fill tab-payment'>
                  {months.map(month => 
                        <Tab eventKey={month.id} title={month.name}>
                              <PaginationList usersPerPage={usersPerPage} currentPage={currentPage} list={newList} setUsersPerPage={setUsersPerPage} setCurrentPage={setCurrentPage} />
                              <Table className='mt-2'>
                                    <thead className='bg-warning text-white'>
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

                                                let paymentsFilter = payments.filter(pay => pay.user_id === user.id && pay.period === month.id+'-'+year)
                                                let validation = paymentsFilter.map(p => p.validation)
                                                let totalPayments = paymentsFilter.reduce((a, b) => {return a + b.amount}, 0)

                                                return (
                                                      <tr>
                                                            <td>{user.name}</td>
                                                            <td>{user.mensuality}</td>
                                                            <td>{user.location}</td>
                                                            <td>{user.service}</td>
                                                            <td><Badge variant={user.status === 'Activo' ? 'success' : user.status === 'Cancelado' ? 'danger' : 'warning'} >{user.status.toUpperCase()}</Badge></td>
                                                            <td><Badge variant={validation.includes(1) ? 'primary' : 'danger'}>{validation.includes(1) ? 'VALIDADO' : 'PENDIENTE'}</Badge></td>
                                                            <td>
                                                            { paymentsFilter.length > 0 && validation.includes(0)
                                                                  && <StatusConfirm payments={paymentsFilter} updatePayments={updatePayments} />
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
                        </Tab>
                  )}

            </Tabs>
            </>
      )
}

export default StatusList