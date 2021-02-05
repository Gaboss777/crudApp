import React, { useEffect, useState } from 'react';
import { Container, Row, Col, ButtonGroup } from 'react-bootstrap';
import EmployeeList from './List';
import EmployeeForm from './Forms/EmployeeForm';
import OcupationForm from './Forms/OcupationForm';
import DeleteEmployee from './DeleteEmployee';
import SearchData from '../../Utils/SearchData';
import OcupationList from './OcupationList';
import { connect } from 'react-redux';
import { removeOcupation, createEmployee, updateEmployee, getOcupationsList, deleteEmployee, createPayment, selectRow, getEmployies, getSalaries, removeSalaries, clearSelectedRow, updateOcupation } from '../../../ducks/rrhhReducer';
import Permission from '../../Layouts/Permission';

const EmployeeView = ({ocupations, role, removeOcupation, user, selection, createEmployee, updateEmployee, deleteEmployees, createPayment, getSalaries, getEmployies, year, month, salaries, employies, getOcupationsList, removeSalaries, selectRow, clearSelectRow, updateOcupation}) => {

    const [criteria, setCriteria] = useState('')

    useEffect(() =>{
        getOcupationsList()
        getEmployies()
        getSalaries()
        if(selection.length > 0){
            clearSelectRow()
        }
    },[])

    return (
        <Container fluid className='px-0 rounded bg-white'>
            <h3 className='text-center text-white py-2 bg-warning font-weight-bold rounded-top'>REGISTRO PAGO EMPLEADO</h3>
            <Row className='px-3'>
                <Permission
                    role={role}
                    perform='employies:actions'
                    yes={
                        <Col sm lg={2}>
                            <ButtonGroup>
                                <Permission
                                    role={role}
                                    perform='employies:create'
                                    yes={
                                        <EmployeeForm isModal={true} editing={false} user={user} selection={selection} ocupations={ocupations} createEmployee={createEmployee} />
                                    }
                                />
                                <Permission
                                    role={role}
                                    perform='employies:edit'
                                    yes={
                                        <EmployeeForm isModal={true} editing={true} user={user} selection={selection} ocupations={ocupations} updateEmployee={updateEmployee} />
                                    }
                                />
                                <Permission
                                    role={role}
                                    perform='employies:remove'
                                    yes={
                                        <DeleteEmployee selection={selection} deleteEmployees={deleteEmployees} />
                                    }
                                />
                            </ButtonGroup>
                        </Col>
                    }
                />
                <Permission
                    role={role}
                    perform='employies:create'
                    yes={
                        <Col sm lg={2}>
                            <ButtonGroup>
                                <OcupationForm isModal={true} edit={false} />
                                <OcupationList role={role} ocupations={ocupations} removeOcupation={removeOcupation} updateOcupation={updateOcupation} />
                            </ButtonGroup>
                        </Col>
                    }
                />
                <Col sm lg={4}>
                    <SearchData criteria={criteria} setCriteria={setCriteria} />
                </Col>
                <Col sm lg={12}>
                    <EmployeeList role={role} criteria={criteria} createPayment={createPayment} selectRow={selectRow} selected={selection} year={year} salaries={salaries} employies={employies} removeSalaries={removeSalaries} ocupations={ocupations} month={month} />
                </Col>
            </Row>
        </Container>
    )
}

const MSTP = state => (
    {
        ocupations: state.rrhh.ocupations,
        user: state.rrhh.selected[0],
        selection: state.rrhh.selected,
        employies: state.rrhh.employies,
        salaries: state.rrhh.salaries,
        year: state.dates.year,
        role: state.auth.user.role,
        month: state.dates.month
    }
)

const MDTP = dispatch => (
    {
        removeOcupation: (data) => dispatch(removeOcupation(data)),
        createEmployee: (data) => dispatch(createEmployee(data)),
        updateEmployee: (data) => dispatch(updateEmployee(data)),
        getOcupationsList: () => dispatch(getOcupationsList()),
        createPayment: (data) => dispatch(createPayment(data)),
        deleteEmployees: (data) => dispatch(deleteEmployee(data)),
        selectRow: (e, data) => dispatch(selectRow(e, data)),
        getEmployies: () => dispatch(getEmployies()),
        getSalaries: () => dispatch(getSalaries()),
        removeSalaries: (data) => dispatch(removeSalaries(data)),
        clearSelectRow: () => dispatch(clearSelectedRow()),
        updateOcupation: (data) => dispatch(updateOcupation(data))
    }
)

export default connect(MSTP, MDTP)(EmployeeView)