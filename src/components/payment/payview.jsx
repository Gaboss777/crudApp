
import React, { Fragment } from 'react';
import { Row, Col } from 'react-bootstrap';
import Calendar from './components/calendar';
import PayForm from './components/form';
import DropdownClient from './components/Dropdownlist';

const PayView = () => {
    return (
        <Fragment>
            <Row>
                <DropdownClient title='Cliente' />
                <Col>
                    <PayForm asModal={true} />
                </Col>
            </Row>
            <Row>
                <Col sm lg={12} >
                    <Calendar />
                </Col>
            </Row>
        </Fragment>
    )
}


export default PayView;
