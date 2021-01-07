import React, { useEffect, useState } from 'react'
import { Table, FormCheck, Badge, Spinner, Row, Col } from 'react-bootstrap';
import { clearSelectedRow, getUserList, selectRow } from 'ducks/usersReducer';
import { connect } from 'react-redux';
import PaginationList from 'components/Utils/PaginationList';
import Permission from 'components/Layouts/Permission'
import { useFilteredList } from 'components/Hooks/useFilteredList'

const ClientsList = ({ list, loading, getUserList, selectRow, selected, criteria, clearSelectedRow, userRole }) => {

    const [currentPage, setCurrentPage] = useState(1)
    const [usersPerPage, setUsersPerPage] = useState(10)
    const newList = useFilteredList(criteria, list)

    useEffect(() => {
        getUserList()
        if(selected.length > 0) {
            clearSelectedRow()
        }
    }, [])

    const indexOfLastUser = currentPage * usersPerPage
    const indexOfFirstUser = indexOfLastUser - usersPerPage
    const currentUsers = newList.slice(indexOfFirstUser, indexOfLastUser)
    
    return (
        <>
            <PaginationList usersPerPage={usersPerPage} currentPage={currentPage} list={newList} setUsersPerPage={setUsersPerPage} setCurrentPage={setCurrentPage} />
            {loading ? 
                <Row>
                    <Col className='text-center'>
                        <Spinner variant='warning' animation='grow' className='ml-4' />
                        <Spinner variant='warning' animation='grow' className='mx-1' />
                        <Spinner variant='warning' animation='grow' />
                    </Col>
                </Row>
            : newList &&
                <>
                <Table size='sm'>
                    <thead className='bg-warning text-white text-center text-uppercase'>
                        <tr>
                            <Permission 
                                role={userRole.role}
                                perform='check'
                                yes={<th><FormCheck type='checkbox' /></th>}
                            />
                            <th>Razon Social</th>
                            <th>Localizacion </th>
                            <th>Mensualidad</th>
                            <th>MB</th>
                            <th>Direccion IP </th>
                            <th>Servicio</th>
                            <th>STATUS</th>
                        </tr>
                    </thead>
                    <tbody className='text-center' >
                    {currentUsers.length > 0 ? 
                        <>
                        {currentUsers.map(user => (
                            <tr className='hover-table' onClick={() => selectRow(!document.getElementById('select_row_' + user.id).checked, user)} >
                                <Permission 
                                    role={userRole.role}
                                    perform='check'
                                    yes={<td><FormCheck checked={selected.find(x => x.id === user.id) ? true : false} id={'select_row_' + user.id} type='checkbox' onChange={({ target }) => selectRow(target.checked, user)} /></td>}
                                />
                                <td>{user.name}</td>
                                <td>{user.location} </td>
                                <td>{user.mensuality}</td>
                                <td>{user.bandwidth}</td>
                                <td>{user.ip} </td>
                                <td>{user.service}</td>
                                <td><Badge variant={user.status === 'Activo' ? 'success' : user.status === 'Suspendido' ? 'warning' : 'danger'} className='text-uppercase'>{user.status}</Badge></td>
                            </tr>
                        ))
                        }
                        </>
                    : <tr><td colSpan={8}>NO HAY DATOS DISPONIBLES</td></tr>
                    }
                    </tbody>
                </Table>
                </>
            }
        </>
    )
}
const MSTP = state => (
    {
        list: state.users.list,
        loading: state.users.loading,
        selected: state.users.selected,
        userRole: state.auth.user
    }
)
const MDTP = dispatch => (
    {
        getUserList: () => dispatch(getUserList()),
        selectRow: (e, user) => dispatch(selectRow(e, user)),
        clearSelectedRow: () => dispatch(clearSelectedRow())
    }
)
export default connect(MSTP, MDTP)(ClientsList)
