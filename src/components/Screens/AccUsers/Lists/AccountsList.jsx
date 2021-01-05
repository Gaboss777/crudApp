import React from 'react'
import { FormCheck, Table } from 'react-bootstrap'
import { useFilteredList } from 'components/Hooks/useFilteredList'

const AccountsList = ({accounts, selectRow, selected, criteria}) => {

    const newList = useFilteredList(criteria, accounts)

    return (
        <Table>
            <thead className='bg-warning text-white'>
                <tr>
                    <th><FormCheck type='checkbox' /></th>
                    <th>ID</th>
                    <th>USERNAME</th>
                    <th>PASSWORD</th>
                    <th>ASIGNADO A</th>
                    <th>NIVEL DE PERMISO</th>
                </tr>
            </thead>
            <tbody>
            {newList.length > 0 ? 
                <>
                    {newList.map(account => 
                        <tr>
                            <td><FormCheck type='checkbox' checked={selected.find(x => x.id === account.id)} onChange={({ target }) => selectRow(target.checked, account)} id={'select_row_' + account.id} /> </td>
                            <td>{account.id}</td>
                            <td>{account.username}</td>
                            <td>{'*'.repeat(10)}</td>
                            <td>{account.user}</td>
                            <td>{account.role}</td>
                        </tr>
                    )}
                </>
                : <tr><td colSpan={7} className='text-center'>NO HAY CUENTAS CREADAS</td></tr>
            }
            </tbody>
        </Table>
    )
}

export default AccountsList