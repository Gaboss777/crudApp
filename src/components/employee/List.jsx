import React, { useEffect } from 'react';
import { Badge, FormCheck, Table } from 'react-bootstrap';
import { connect } from 'react-redux';
import { selectRow } from '../../ducks/rrhh';
import InfoPayment from './InfoPayment';

const EmployeeList = ({employies, selectRow, selected, criteria}) => {

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
                employies.filter(user => user.firstName.toLowerCase().includes(criteria.toLowerCase()) || user.secondName.toLowerCase().includes(c) || user.lastName.toLowerCase().includes(c) || user.secondSurname.toLowerCase().includes(c) || user.document.toLowerCase().includes(c) || user.ocupation.toLowerCase().includes(c))
        }
        else{
            result=employies
        }
        return result
    }

    const newList = filteredList();

    console.log(employies)
    console.log(selected)
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
                    <tr className='hover-table' >
                        <td><FormCheck type='checkbox' checked={selected.find(x => x.id === e.id)} onChange={({ target }) => selectRow(target.checked, e)} id={'select_row_' + e.id} /> </td>
                        <td>{e.firstName} {e.secondName}</td>
                        <td>{e.lastName} {e.secondSurname}</td>
                        <td>{e.document}</td>
                        <td>{e.ocupation}</td>
                        <td>{e.initialDate}</td>
                        <td>{e.lastDate}</td>
                        <td><Badge variant={e.lastDate === '' ? 'success' : 'danger'}>{e.lastDate === '' ? 'ACTIVO' : 'DESPEDIDO'}</Badge></td>
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
        selectRow: (e, data) => dispatch(selectRow(e, data))
    }
)

export default connect(MSTP,MDTP)(EmployeeList)