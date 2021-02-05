import React, { useEffect, useState } from 'react'
import { Container, Table, FormCheck, Badge, Spinner, Row, Col } from 'react-bootstrap';
import { clearSelectedRow, getUserList, selectRow } from 'ducks/usersReducer';
import { connect } from 'react-redux';
import PaginationList from 'components/Utils/PaginationList';
import { useFilteredList } from 'components/Hooks/useFilteredList'
import { BtnPagination } from 'components/Utils/PaginationList';

const ClientsList = ({ list, loading, getUserList, selectRow, selected, criteria, clearSelectedRow, mensualities }) => {

    const [currentPage, setCurrentPage] = useState(1)
    const [usersPerPage, setUsersPerPage] = useState(15)
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
        <Container fluid className='px-0'>
            {loading ? 
                <Row className='mb-3'>
                    <Col className='text-center'>
                        <Spinner variant='warning' animation='grow' className='ml-4' />
                        <Spinner variant='warning' animation='grow' className='mx-1' />
                        <Spinner variant='warning' animation='grow' />
                    </Col>
                </Row>
            : newList &&
            <>
                <Row>
                    <Col sm lg={2} >
                        <p className='mb-0 my-2 font-weight-bold'>Mostrar del {indexOfFirstUser + 1} al {indexOfLastUser}</p>
                    </Col>
                    <Col sm lg={1} >
                        <BtnPagination setUsersPerPage={setUsersPerPage} list={newList} usersPerPage={usersPerPage} />
                    </Col>
                    <Col sm lg={9} className='float-right'>
                        <PaginationList usersPerPage={usersPerPage} currentPage={currentPage} list={newList} setUsersPerPage={setUsersPerPage} setCurrentPage={setCurrentPage} />
                    </Col>
                </Row>
                <Row>
                    <Col sm lg={12}>
                        <Table size='sm' striped bordered responsive className='rounded-table'>
                            <thead className='cerecom-bg-dark text-white text-center text-uppercase'>
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
                            <tbody className='text-center bg-white' >
                            {currentUsers.length > 0 ? 
                                <>
                                {currentUsers.map(user => {
                                    let totalMensuality = mensualities.filter(x => x.user_id === user.id).reduce((a,b) => {return a + b.amount}, 0)
                                    let bandwidht = mensualities.filter(x => x.user_id === user.id).map(x => x.bandwidth)

                                    return (
                                        <tr className={`${selected.find(x => x.id === user.id) ? 'bg-secondary text-white' : ''} hover-table font-cerecom-sm`} onClick={() => selectRow(!document.getElementById('select_row_' + user.id).checked, user)} >
                                            <td><FormCheck checked={selected.find(x => x.id === user.id) ? true : false} id={'select_row_' + user.id} type='checkbox' onChange={({ target }) => selectRow(target.checked, user)} /></td>
                                            <td>{user.name}</td>
                                            <td>{user.location} </td>
                                            <td>{totalMensuality}</td>
                                            <td>{bandwidht}</td>
                                            <td>{user.ip} </td>
                                            <td>{user.service}</td>
                                            <td><Badge variant={user.status === 'Activo' ? 'success' : user.status === 'Suspendido' ? 'warning' : 'danger'} className='text-uppercase'>{user.status}</Badge></td>
                                        </tr>
                                    )
                                }
                                )
                                }
                                </>
                            : <tr><td colSpan={8}>NO HAY DATOS DISPONIBLES</td></tr>
                            }
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </>
            }
        </Container>
    )
}
const MSTP = state => (
    {
        list: state.users.list,
        loading: state.users.loading,
        selected: state.users.selected,
        mensualities: state.users.mensuality
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
