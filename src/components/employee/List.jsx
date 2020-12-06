import React, { useEffect } from 'react';
import { Badge, FormCheck, Table } from 'react-bootstrap';
import InfoPayment from './InfoPayment';
import moment from 'moment'

const EmployeeList = ({employies, selectRow, selected, criteria, salaries, removeSalaries, year, createPayment, ocupations}) => {

    const userDefault = { id: '0'}
    useEffect(() => {
        if(selected.length > 0) {
            selectRow(false, userDefault )
        }
    }, [])

    const filteredList = () => {
        let c = criteria.toLowerCase()
        let result = [];
        if (criteria) {
            result =
                employies.filter(user => user.firstname.toLowerCase().includes(c) || user.secondname.toLowerCase().includes(c) || user.lastname.toLowerCase().includes(c) || user.secondsurname.toLowerCase().includes(c) || user.occupation.toLowerCase().includes(c))
        }
        else{
            result=employies
        }
        return result
    }

    const newList = filteredList();
    return(
        <Table>
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
                        <tr className='hover-table' onClick={() => selectRow(!document.getElementById('select_row_' + e.id).checked, e)} >
                            <td><FormCheck type='checkbox' checked={selected.find(x => x.id === e.id)} onChange={({ target }) => selectRow(target.checked, e)} id={'select_row_' + e.id} /> </td>
                            <td>{e.firstname} {e.secondname}</td>
                            <td>{e.lastname} {e.secondsurname}</td>
                            <td>{e.document.toString()}</td>
                            <td>{nameOcupation}</td>
                            <td>{moment(e.initialdate, 'YYYY-MM-DD').format('YYYY-MM-DD')}</td>
                            <td>{e.lastdate ? moment(e.lastdate, 'YYYY-MM-DD').format('YYYY-MM-DD') : 'ACTUALMENTE'}</td>
                            <td><Badge variant={!e.lastdate ? 'success' : 'danger'}>{!e.lastdate ? 'ACTIVO' : 'DESPEDIDO'}</Badge></td>
                            <td>
                                <InfoPayment user={e} salaries={salaries} year={year} removeSalaries={removeSalaries} createPayment={createPayment} />
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