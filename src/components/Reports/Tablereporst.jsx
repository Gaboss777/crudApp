import React from 'react'
import { Table } from 'react-bootstrap'

const Tablereports = ({column}) => {
    return (
        <Table>
            <thead className='bg-warning text-white text-center'>
                <tr>
                {column.map(c => 
                    <th>{c}</th>
                )}
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td colSpan={column.length} className='text-center'>NO HAY DATOS</td>
                </tr>
            </tbody>
        </Table>
    )
}

export default Tablereports