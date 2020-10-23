import React, { useEffect } from 'react';
import { Badge, FormCheck, Table } from 'react-bootstrap';
import { connect } from 'react-redux';
import { getEmployies, getSalaries, selectRow } from '../../ducks/rrhh';
import InfoPayment from './InfoPayment';
import moment from 'moment'

const EmployeeList = ({employies, selectRow, selected, criteria, getEmployies, getSalaries}) => {

    const userDefault = { id: '0'}
    useEffect(() => {
        getEmployies()
        getSalaries()
        if(selected.length > 0) {
            selectRow(false, userDefault )
        }
    }, [])

    const filteredList = () => {
        let c = criteria.toLowerCase()
        let result = [];
        if (criteria) {
            result =
                employies.filter(user => user.firstname.toLowerCase().includes(criteria.toLowerCase()) || user.secondname.toLowerCase().includes(c) || user.lastname.toLowerCase().includes(c) || user.secondsurname.toLowerCase().includes(c) || user.document.toLowerCase().includes(c) || user.occupation.toLowerCase().includes(c))
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
                {newList.map(e =>
                    <tr className='hover-table' onClick={() => selectRow(!document.getElementById('select_row_' + e.id).checked, e)} >
                        <td><FormCheck type='checkbox' checked={selected.find(x => x.id === e.id)} onChange={({ target }) => selectRow(target.checked, e)} id={'select_row_' + e.id} /> </td>
                        <td>{e.firstname} {e.secondname}</td>
                        <td>{e.lastname} {e.secondsurname}</td>
                        <td>{e.document}</td>
                        <td>{e.ocupation_id}</td>
                        <td>{moment(e.initialdate, 'YYYY-MM-DD').format('YYYY-MM-DD')}</td>
                        <td>{e.lastdate ? moment(e.lastdate, 'YYYY-MM-DD').format('YYYY-MM-DD') : 'ACTUALMENTE'}</td>
                        <td><Badge variant={!e.lastdate ? 'success' : 'danger'}>{!e.lastdate ? 'ACTIVO' : 'DESPEDIDO'}</Badge></td>
                        <td>
                            <InfoPayment user={e}/>
                        </td>
                    </tr>
            )}
            </> : <tr><td colSpan={9} className='text-center'>NO HAY EMPLEADOS REGISTRADOS</td></tr>
        }
            </tbody>
        </Table>
    )
}

const MSTP = state => (
    {
        employies: state.rrhh.employies,
        selected: state.rrhh.selected
    }
)

const MDTP = dispatch => (
    {
        selectRow: (e, data) => dispatch(selectRow(e, data)),
        getEmployies: () => dispatch(getEmployies()),
        getSalaries: () => dispatch(getSalaries())
    }
)

export default connect(MSTP,MDTP)(EmployeeList)