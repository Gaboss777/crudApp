//import librerias
import React, { useEffect } from 'react';
import { Container, Row, Col, Badge } from 'react-bootstrap';
import { connect } from 'react-redux';
import Calendar from './Calendar';
import { createPayment, getClient, getPayments, removePayment, updatePayment } from 'ducks/paymentReducer';
import { getUserList } from 'ducks/usersReducer'
import SelectionYear from 'components/Utils/SelectionYear';
import DropdownList from 'components/Utils/DropdownList';

const PayClientsView = ({client, user, year, payments, removePayment, list, getClient, getPayments, getUsers, createPayment, updatePayment}) => {

    useEffect(() => {
        getUsers()
        getPayments()
        if(client) {
            getClient('')
        }
    }, [])

    return (
        <Container fluid className='rounded bg-white'>
            <Row >
                <Col sm lg={12} className='px-0'>
                    <h3 className='text-center text-white mb-0 py-2 px-0 bg-warning rounded-top font-weight-bold'>REGISTRO COBRO</h3>
                </Col>
            </Row>
            <Row className='mt-3'>
                <Col sm lg={5} >
                    <DropdownList data={list} action={getClient} labelKey='name' text='CLIENTES' placeholder='Elija un cliente' />
                </Col>
                <Col sm lg={2} >
                    <SelectionYear disabled={client ? false : true} className={`${!client ? 'form-disable' : ''} rounded-right border border-warning`} />
                </Col>
            </Row>
            <Row className='pb-3'>
                { client &&
                <>
                    { year &&
                    <Col sm lg={12} className='mt-3'>
                        <h4 className='text-center font-weight-bold'>CALENDARIO DE PAGOS</h4>
                        <Calendar client={client} year={year} payments={payments} removePayment={removePayment} createPayment={createPayment} user={user} updatePayment={updatePayment} />
                    </Col>
                    }
                </>
                }
            </Row>
        </Container>
    )
}

const MSTP = state => (
    {
        list: state.users.list,
        client: state.payment.client,
        year: state.dates.year,
        payments: state.payment.payments,
        user: state.auth.user
    }
)

const MDTP = dispatch => (
    {
        removePayment: (id) => dispatch(removePayment(id)),
        getClient: (client) => dispatch(getClient(client)),
        getUsers: () => dispatch(getUserList()),
        getPayments: (client) => dispatch(getPayments(client)),
        createPayment: (data) => dispatch(createPayment(data)),
        updatePayment: (data) => dispatch(updatePayment(data))
    }
)

export default connect(MSTP, MDTP)(PayClientsView);
