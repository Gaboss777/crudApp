import React from 'react';
import { Table } from 'react-bootstrap';
import { connect } from 'react-redux';

const EmployeeList = ({employies}) => {
    return(
        <Table>
            <thead className='bg-warning text-white'>
                <tr>
                    <th>NOMBRES</th>
                    <th>APELLIDOS</th>
                    <th>CEDULA</th>
                    <th>FECHA DE INGRESO</th>
                    <th>SALARIO</th>
                </tr>
            </thead>
            <tbody>
            {employies.lenght > 0 ?
            <>
            {employies.map(e =>
                <tr>
                    <td>{e.name}</td>
                    <td>{e.lastName}</td>
                    <td>{e.document}</td>
                    <td>{e.initialDate}</td>
                    <td>{e.salary}</td>
                </tr>
            )}
            </> : <tr><td colSpan={5} className='text-center'>NO HAY EMPLEADOS</td></tr>
        }
            </tbody>
        </Table>
    )
}

const MSTP = state => (
    {
        employies: state.rrhh.employies
    }
)

export default connect(MSTP, null)(EmployeeList)