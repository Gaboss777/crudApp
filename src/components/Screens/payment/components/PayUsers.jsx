//import librerias
import React, { useEffect } from 'react';
import { Container, Row, Col, Badge, Card} from 'react-bootstrap';
import { connect } from 'react-redux';
import Calendar from './Calendar';
import { createPayment, getClient, getPayments, removePayment } from '../../../../ducks/paymentReducer';
import { getUserList } from '../../../../ducks/usersReducer'
import SelectionYear from '../../../Utils/SelectionYear';
import InfoCard from './InfoClient';
import DropdownList from '../../../Utils/DropdownList';
import Permission from '../../../Layouts/Permission';

const PayUsers = ({client, user, year, payments, removePayment, list, getClient, getPayments, getUsers, createPayment}) => {

    useEffect(() => {
        getUsers()
        getPayments()
        if(client) {
            getClient('')
        }
    }, [])

    return (
        <Permission 
            role={user.role}
            perform='clients-page:visual'
            yes={() =>
                <Container fluid className='px-0'>
                    <h1 className='text-center text-white py-2 bg-warning title-section'>REGISTRO COBRO CLIENTES</h1>
                    <Row >
                        <Col sm lg={4} >
                            <DropdownList data={list} action={getClient} labelKey='name' text='CLIENTES' placeholder='Elija un cliente' />
                        </Col>
                        <Col sm lg={2} className='mt-2' >
                            <SelectionYear disabled={client ? false : true} className={!client ? 'form-disable' : ''} />
                        </Col>
                        {client && 
                            <Col sm lg={4}>
                                <InfoCard client={client} />
                            </Col>
                        }
                    </Row>
                    <Row>
                        { client &&
                        <>
                            { year &&
                            <Col sm lg={12} className='mt-3'>
                                <h4 className='text-center'>CALENDARIO DE PAGOS</h4>
                                <Calendar client={client} year={year} payments={payments} removePayment={removePayment} createPayment={createPayment} user={user} />
                            </Col>
                            }
                        </>
                        }
                    </Row>
                </Container>
            }

        />
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
        createPayment: (data) => dispatch(createPayment(data))
    }
)

export default connect(MSTP, MDTP)(PayUsers);
