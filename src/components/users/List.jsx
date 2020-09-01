import React, { useEffect } from 'react'
import { Table, FormCheck, Badge } from 'react-bootstrap';
import { getUserList, selectRow } from '../../ducks/users';
import { connect } from 'react-redux';

const UsersList = ({list, loading, getUserList, selectRow}) => {
    useEffect(() => {
        getUserList()
    }, [])

    return (
        <>
        {!loading && list.length > 0 &&
            <Table >
                <thead className='bg-warning text-white'>
                    <tr>
                        <th><FormCheck type='checkbox' /></th>
                        <th>ID</th>
                        <th>Razon Social</th>
                        <th>CI/RIF</th>
                        <th>Ubicacion</th>
                        <th>Ancho de Banda</th>
                        <th>Direccion IP</th>
                        <th>Servicio</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody className='text-center'>
                    { list.map(user => (
                        <tr>
                            <td><FormCheck type='checkbox' onChange={({ target }) => selectRow( target.checked, user )} /></td>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.document}</td>
                            <td>{user.location}</td>
                            <td>{user.bandwidth}</td>
                            <td>{user.ip}</td>
                            <td>{user.service}</td>
                            <td><Badge variant={user.status === 'Activo' ? 'success' : user.status === 'Suspendido' ? 'warning' : 'danger'} className='text-uppercase'>{user.status}</Badge></td>
                        </tr>
                        ))
                    }
                </tbody>
            </Table>
        }
        </>
    )
}

const MSTP = state => (
    {
        list: state.users.list,
        loading: state.users.loading
    }
)

const MDTP = dispatch => (
    {
        getUserList: () => dispatch(getUserList()),
        selectRow: (e, user) => dispatch(selectRow(e, user))
    }
)

export default connect(MSTP, MDTP)(UsersList)