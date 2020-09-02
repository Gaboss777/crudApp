import React, { useEffect } from 'react'
import { Table, FormCheck, Badge } from 'react-bootstrap';
import { getUserList, selectRow } from '../../ducks/users';
import { connect } from 'react-redux';

const UsersList = ({list, loading, getUserList, selectRow,selected}) => {
    useEffect(() => {
        getUserList()
    }, [])

    return (
        <>
        {!loading && list.length > 0 &&
            <Table size='sm'>
                <thead className='bg-warning text-white text-center text-uppercase'>
                    <tr>
                        <th><FormCheck type='checkbox' /></th>
                        <th>Razon Social</th>
                        <th>CI/RIF </th>
                        <th>Email</th>
                        <th>Localizacion </th>
                        <th>Telefono </th>
                        <th>Mensualidad</th>
                        <th>MB</th>
                        <th>Direccion IP </th>
                        <th>Serial </th>
                        <th>Direccion MAC </th>
                        <th>Servicio</th>
                        <th>STATUS</th>
                    </tr>
                </thead>
                <tbody className='text-center' >
                    { list.map(user => (
                        <tr className='hover-table' onClick={()=>selectRow(!document.getElementById('select_row_'+user.id).checked,user)} >
                            <td><FormCheck checked={selected.find(x=>x.id===user.id)} id={'select_row_'+user.id} type='checkbox' onChange={({ target }) => selectRow( target.checked, user )} /></td>
                            <td>{user.name}</td>
                            <td>{user.document} </td>
                            <td>{user.email}</td>
                            <td>{user.location} </td>
                            <td>{user.phone}</td>
                            <td>{user.mensualidad}</td>
                            <td>{user.bandwidth}</td>
                            <td>{user.ip} </td>
                            <td>{user.serial}</td>
                            <td>{user.mac}</td>
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
        loading: state.users.loading,
        selected:state.users.selected
    }
)
const MDTP = dispatch => (
    {
        getUserList: () => dispatch(getUserList()),
        selectRow: (e, user) => dispatch(selectRow(e, user))
    }
)
export default connect(MSTP, MDTP)(UsersList)
