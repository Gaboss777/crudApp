//import librerias
import React, { useEffect, useState } from 'react';
import { InputGroup, Col, Row, Badge, Card } from 'react-bootstrap'; 
import { connect } from 'react-redux';
import { getClient, getPayments } from '../../../ducks/payment';
import { getUserList } from '../../../ducks/users';
import { Typeahead } from 'react-bootstrap-typeahead';

const DropdownClient = ({list, getClient, getUsers, client, payments, getPayments}) => {
    const [selection] = useState('')

    useEffect(() => {
        getUsers()
        getPayments()
        if(client) {
            handlerSelection(selection)
        }
    }, [])

    const handlerSelection = (selection) => {
        getClient(selection)
    }

    return (
    <Row>
        <Col sm lg={4} className='pt-2 pb-3 pl-1'>
            <InputGroup>
                <InputGroup.Prepend className='bg-warning rounded-left text-uppercase' >
                    <InputGroup.Text className='text-white px-2 font-weight-bold' >CLIENTE</InputGroup.Text>
                </InputGroup.Prepend>
                <Typeahead id='client-list' defaultSelected={selection} labelKey='name' options={list} onChange={( selected )=>handlerSelection(selected)} placeholder='Elija un cliente... ' clearButton />
            </InputGroup>
        </Col>
        { client &&
        <Col sm lg={4}>
            <Card className='shadow-none' border='dark'>
                <Card.Header className='pb-0'>
                    <Row className='justify-content-center'>
                        <Col sm lg={4}>
                            <p className='mb-1 font-weight-bold'>SERVICIO: </p>
                            <p>{client.service}</p>
                        </Col>
                        <Col sm lg={8}>
                            <p className='mb-1'><span className='font-weight-bold mr-1'>STATUS: </span><Badge variant={client.status === 'Activo' ? 'success' : client.status === 'Suspendido' ? 'warning' : 'danger'} className='text-uppercase'>{client.status}</Badge></p>
                            <p className='mb-1'><span className='font-weight-bold mr-1'>MENSUALIDAD: </span> {client.mensuality}</p>
                        </Col>
                    </Row>
                </Card.Header>
            </Card>
        </Col>
        }
    </Row>
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
        getUsers: () => dispatch(getUserList()),
        getPayments: (client) => dispatch(getPayments(client))
    }
)

export default connect(MSTP, MDTP)(DropdownClient);
