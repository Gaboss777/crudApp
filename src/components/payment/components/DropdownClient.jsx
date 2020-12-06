//import librerias
import React, { useEffect, useState } from 'react';
import { InputGroup, Col, Row, Badge, Card } from 'react-bootstrap';
import { Typeahead } from 'react-bootstrap-typeahead';
import SelectionYear from '../../SelectionYear';

const DropdownClient = ({list, getClient, getUsers, client, getPayments}) => {
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
        <Col sm lg={4} className='mt-2'>
            <InputGroup>
                <InputGroup.Prepend className='bg-warning rounded-left text-uppercase' >
                    <InputGroup.Text className='text-white px-2 font-weight-bold' >CLIENTE</InputGroup.Text>
                </InputGroup.Prepend>
                <Typeahead id='client-list' defaultSelected={selection} labelKey='name' options={list} onChange={( selected )=>handlerSelection(selected)} placeholder='Elija un cliente... ' clearButton />
            </InputGroup>
        </Col>
        { client &&
        <>
            <Col sm lg={2} className='mt-2' >
                <SelectionYear />
            </Col>
            <Col sm lg={4}>
                <Card className='shadow-none my-1' border='dark'>
                    <Card.Header className='py-1'>
                        <Row className='justify-content-center'>
                            <Col sm lg={4}>
                                <p className='mb-1 font-weight-bold'>SERVICIO: </p>
                                <p className='mb-0'>{client.service}</p>
                            </Col>
                            <Col sm lg={8}>
                                <p className='mb-1'><span className='font-weight-bold mr-1'>STATUS: </span><Badge variant={client.status === 'Activo' ? 'success' : client.status === 'Suspendido' ? 'warning' : 'danger'} className='text-uppercase'>{client.status}</Badge></p>
                                <p className='mb-0'><span className='font-weight-bold mr-1'>MENSUALIDAD: </span> {client.mensuality}</p>
                            </Col>
                        </Row>
                    </Card.Header>
                </Card>
            </Col>
        </>
        }
    </Row>
    )
}

export default DropdownClient;
