import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import EmployeeList from './EmployeeList';
import EmployeeForm from './Form';

const EmployeeView = () => {
    return (
        <Container fluid>
            <Row>
                <Col>
                    <EmployeeForm isModal={true} />
                    <EmployeeList />
                </Col>
            </Row>
        </Container>
    )
}

export default EmployeeView