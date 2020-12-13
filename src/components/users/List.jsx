import React, { useEffect, useState } from 'react'
import { Table, FormCheck, Badge, Spinner, Row, Col } from 'react-bootstrap';
import { getUserList, selectRow } from '../../ducks/users';
import { connect } from 'react-redux';
import PaginationList from '../PaginationList';

const UsersList = ({ list, loading, getUserList, selectRow, selected, criteria }) => {

    const [currentPage, setCurrentPage] = useState(1)
    const [usersPerPage, setUsersPerPage] = useState(10)

    const userDefault = []

    useEffect(() => {
        getUserList()
        if(selected.length > 0) {
            selectRow(false, userDefault )
        }
    }, [])

    const filteredList = () => {
        let c = criteria.toLowerCase()
        let result = [];
        if (criteria) {
            result =
                list.filter(user => user.name.toLowerCase().includes(criteria.toLowerCase()) || user.location.toLowerCase().includes(c) || user.ip.toLowerCase().includes(c) || user.service.toLowerCase().includes(c) || user.status.toLowerCase().includes(c))
        }
        else{
            result=list
        }
        return result
    }

    const newList = filteredList();

    const indexOfLastUser = currentPage * usersPerPage
    const indexOfFirstUser = indexOfLastUser - usersPerPage
    const currentUsers = newList.slice(indexOfFirstUser, indexOfLastUser)

    return (
        <>
            {loading ? 
                <Row>
                    <Col className='text-center'>
                        <Spinner variant='warning' animation='grow' className='ml-4' />
                        <Spinner variant='warning' animation='grow' className='mx-1' />
                        <Spinner variant='warning' animation='grow' />
                    </Col>
                </Row>
            : filteredList &&
                <>
                <Table size='sm'>
                    <thead className='bg-warning text-white text-center text-uppercase'>
                        <tr>
                            <th><FormCheck type='checkbox' /></th>
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
                                <td><FormCheck checked={selected.find(x => x.id === user.id)} id={'select_row_' + user.id} type='checkbox' onChange={({ target }) => selectRow(target.checked, user)} /></td>
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
                <PaginationList usersPerPage={usersPerPage} totalUsers={newList.length} currentPage={currentPage} list={list} setUsersPerPage={setUsersPerPage} setCurrentPage={setCurrentPage} />
                </>
            }
        </>
    )
}
const MSTP = state => (
    {
        list: state.users.list,
        loading: state.users.loading,
        selected: state.users.selected
    }
)
const MDTP = dispatch => (
    {
        getUserList: () => dispatch(getUserList()),
        selectRow: (e, user) => dispatch(selectRow(e, user))
    }
)
export default connect(MSTP, MDTP)(UsersList)
