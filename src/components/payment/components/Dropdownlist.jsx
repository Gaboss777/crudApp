//import librerias
import React, { useEffect, Fragment } from 'react';
import { Row, Col, Dropdown, Form, InputGroup } from 'react-bootstrap'; 
import { connect } from 'react-redux';
import { getClient } from '../../../ducks/payment';
import { getUserList } from '../../../ducks/users';

//crear componente
const DropdownClient = ({list, client, getClient, title, getUsers}) => {

    const onSelect =(e)=>{
        getClient(e)
        console.log(client)
    }

    useEffect(() => {
        getUsers()
    }, [])

    return (
        <Fragment>
            <Col sm lg={1} className='mr-2'><h3 className='my-2 text-uppercase'>{title}</h3></Col>
            <Col sm lg={3} className='pl-0 mb-2'>
                <Dropdown onSelect={onSelect} as={Form} >
                    <InputGroup >
                    <InputGroup.Prepend>
                        <Dropdown.Toggle variant='warning' id='dropdown-list-rigth' className='shadow-none' />
                        <Dropdown.Menu>
                            <Dropdown.Item eventKey='' >Sin Eleccion</Dropdown.Item>
                            {list.map(user => <Dropdown.Item eventKey={user.name}>{user.name}</Dropdown.Item>  )}
                        </Dropdown.Menu>
                    </InputGroup.Prepend>
                    <Form.Control type='text' value={client ? client : ''} placeholder='Elija un Cliente' className='pl-3 h-100' />
                    </InputGroup>
                </Dropdown>
            </Col>
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
