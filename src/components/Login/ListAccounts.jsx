import React from 'react'
import { FormCheck, Table } from 'react-bootstrap'

const ListAccounts = ({accounts, selectRow, selected}) => {

    return (
        <Table>
            <thead className='bg-warning text-white'>
                <tr>
                    <th><FormCheck type='checkbox' /></th>
                    <th>ID</th>
                    <th>USERNAME</th>
                    <th>PASSWORD</th>
                    <th>NOMBRES</th>
                    <th>APELLIDOS</th>
                    <th>ROLE_ID</th>
                </tr>
            </thead>
            <tbody>
            {accounts.length > 0 ? 
                <>
                    {accounts.map(account => 
                        <tr>
                            <td><FormCheck type='checkbox' checked={selected.find(x => x.id === account.id)} onChange={({ target }) => selectRow(target.checked, account)} id={'select_row_' + account.id} /> </td>
                            <td>{account.id}</td>
                            <td>{account.username}</td>
                            <td>{account.password}</td>
                            <td>{account.firstname}</td>
                            <td>{account.lastname}</td>
                            <td>{account.role_id}</td>
                        </tr>
                    )}
                </>
                : <tr><td colSpan={7} className='text-center'>NO HAY CUENTAS CREADAS</td></tr>
            }
            </tbody>
        </Table>
    )
}

export default ListAccounts