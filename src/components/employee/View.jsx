import React, { useState } from 'react';
import { Container, Row, Col, ButtonGroup } from 'react-bootstrap';
import EmployeeList from './List';
import EmployeeForm from './Forms/EmployeeForm';
import OcupationForm from './Forms/OcupationForm';
import DeleteUser from './removeUsers';
import SearchData from '../SearchData';
import OcupationList from './OcupationList';

const EmployeeView = () => {

    const [criteria, setCriteria] = useState('')

    return (
        <Container fluid>
            <Row>
                <Col sm lg={12}>
                    <h3 className='text-center my-3'>REGISTRO PAGO EMPLEADOS</h3>
                </Col>
                <Col sm lg={2}>
                    <ButtonGroup>
                        <EmployeeForm isModal={true} editing={false} />
                        <EmployeeForm isModal={true} editing={true} />
                        <DeleteUser />
                    </ButtonGroup>
                </Col>
                <Col sm lg={2}>
                    <ButtonGroup>
                        <OcupationForm isModal={true} />
                        <OcupationList />
                    </ButtonGroup>
                </Col>
                <Col sm lg={4} className='my-2'>
                    <SearchData criteria={criteria} setCriteria={setCriteria}  />
                </Col>
                <Col sm lg={12}>
                    <EmployeeList criteria={criteria} />
                </Col>
            </Row>
        </Container>
    )
}

export default EmployeeView