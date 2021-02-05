import React, { useEffect } from 'react';
import { Badge, FormCheck, Table } from 'react-bootstrap';
import InfoPayment from './InfoPayment';
import moment from 'moment'
import { useFilteredList } from 'components/Hooks/useFilteredList';

const EmployeeList = ({employies, role, selectRow, selected, criteria, salaries, removeSalaries, year, month, createPayment, ocupations}) => {

    const newList = useFilteredList(criteria, employies);

    return(
        <Table size='sm' responsive striped bordered className='text-center'>
            <thead className='bg-warning text-white'>
                <tr>
                    <th><FormCheck type='checkbox' /></th>
                    <th>NOMBRES</th>
                    <th>APELLIDOS</th>
                    <th>CEDULA</th>
                    <th>CARGO</th>
                    <th>FECHA DE INGRESO</th>
                    <th>FECHA DE EGRESO</th>
                    <th>STATUS</th>
                    <th>ACCION</th>
                </tr>
            </thead>
            <tbody>
            {employies.length > 0 ?
            <>
                {newList.map(e =>{
                    let nameOcupation = ocupations.filter(x => x.id === e.ocupation_id).map(x => {return x.name})

                    return(
                        <tr className='hover-table font-cerecom-sm' onClick={() => selectRow(!document.getElementById('select_row_' + e.id).checked, e)} >
                            <td><FormCheck type='checkbox' checked={selected.find(x => x.id === e.id) ? true : false} onChange={({ target }) => selectRow(target.checked, e)} id={'select_row_' + e.id} /> </td>
                            <td>{e.firstname} {e.secondname}</td>
                            <td>{e.lastname} {e.secondsurname}</td>
                            <td>{e.document.toString()}</td>
                            <td>{nameOcupation}</td>
                            <td>{moment(e.initialdate, 'YYYY-MM-DD').format('YYYY-MM-DD')}</td>
                            <td>{e.lastdate ? moment(e.lastdate, 'YYYY-MM-DD').format('YYYY-MM-DD') : 'ACTUALMENTE'}</td>
                            <td><Badge variant={!e.lastdate ? 'success' : 'danger'}>{!e.lastdate ? 'ACTIVO' : 'DESPEDIDO'}</Badge></td>
                            <td>
                                <InfoPayment role={role} user={e} salaries={salaries} year={year} removeSalaries={removeSalaries} createPayment={createPayment} month={month} />
                            </td>
                        </tr>
                    )}
            )}
            </> : <tr><td colSpan={9} className='text-center'>NO HAY EMPLEADOS REGISTRADOS</td></tr>
        }
            </tbody>
        </Table>
    )
}

export default EmployeeList