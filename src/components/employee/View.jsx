import React, { useEffect, useState } from 'react';
import { Container, Row, Col, ButtonGroup } from 'react-bootstrap';
import EmployeeList from './List';
import EmployeeForm from './Forms/EmployeeForm';
import OcupationForm from './Forms/OcupationForm';
import DeleteEmployee from './removeUsers';
import SearchData from '../SearchData';
import OcupationList from './OcupationList';
import { connect } from 'react-redux';
import { removeOcupation, createEmployee, updateEmployee, getOcupationsList, deleteEmployee, createPayment, selectRow, getEmployies, getSalaries, removeSalaries } from '../../ducks/rrhh';

const EmployeeView = ({ocupations, removeOcupation, user, selection, createEmployee, updateEmployee, deleteEmployees, createPayment, getSalaries, getEmployies, year, salaries, employies, getOcupationsList, removeSalaries, selectRow}) => {

    const [criteria, setCriteria] = useState('')
    
    useEffect(() =>{
        getOcupationsList()
        getEmployies()
        getSalaries()
    },[])

    return (
        <Container fluid>
            <Row>
                <Col sm lg={12}>
                    <h3 className='text-center mt-3'>REGISTRO PAGO EMPLEADOS</h3>
                </Col>
                <Col sm lg={2}>
                    <ButtonGroup>
                        <EmployeeForm isModal={true} editing={false} user={user} selection={selection} ocupations={ocupations} createEmployee={createEmployee} />
                        <EmployeeForm isModal={true} editing={true} user={user} selection={selection} ocupations={ocupations} updateEmployee={updateEmployee} />
                        <DeleteEmployee selection={selection} deleteEmployees={deleteEmployees} />
                    </ButtonGroup>
                </Col>
                <Col sm lg={2}>
                    <ButtonGroup>
                        <OcupationForm isModal={true} />
                        <OcupationList ocupations={ocupations} removeOcupation={removeOcupation} />
                    </ButtonGroup>
                </Col>
                <Col sm lg={4} className='my-2'>
                    <SearchData criteria={criteria} setCriteria={setCriteria}  />
                </Col>
                <Col sm lg={12}>
                    <EmployeeList criteria={criteria} createPayment={createPayment} selectRow={selectRow} selected={selection} year={year} salaries={salaries} employies={employies} removeSalaries={removeSalaries} />
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
        year: state.dates.year
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
        removeSalaries: (data) => dispatch(removeSalaries(data))
    }
)

export default connect(MSTP, MDTP)(EmployeeView)