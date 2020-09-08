//import librerias
import React, { useEffect, Fragment, useState } from 'react';
import { Form, Row, Col } from 'react-bootstrap'; 
import { connect } from 'react-redux';
import { getClient } from '../../../ducks/payment';
import { getUserList } from '../../../ducks/users';
import { Typeahead } from 'react-bootstrap-typeahead';

const DropdownClient = ({list, getClient, getUsers}) => {

    useEffect(() => {
        getUsers()
    }, [])

    return (
        <Fragment>
            <Form.Group as={Row} className='mx-2' >
                <Form.Label column sm={1} className='text-center' >CLIENTE</Form.Label>
                <Col sm={4}  >
                <Typeahead id='client-list' labelKey='name' options={list} onChange={( selected )=>getClient(selected)} placeholder='Elija un cliente... ' clearButton className='pl-2' />
                </Col>
            </Form.Group>
        </Fragment>
    )
}

const MSTP = state => (
    {
        list: state.users.list,
        client: state.payment.client
    }
)

const MDTP = dispatch => (
    {
        getClient: (client) => dispatch(getClient(client)),
        getUsers: () => dispatch(getUserList())
    }
)

export default connect(MSTP, MDTP)(DropdownClient);
