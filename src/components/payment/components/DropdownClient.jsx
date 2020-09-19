//import librerias
import React, { useEffect, Fragment } from 'react';
import { InputGroup } from 'react-bootstrap'; 
import { connect } from 'react-redux';
import { getClient } from '../../../ducks/payment';
import { getUserList } from '../../../ducks/users';
import { Typeahead } from 'react-bootstrap-typeahead';

const DropdownClient = ({list, getClient, getUsers}) => {

    useEffect(() => {
        getUsers()
    }, [])

    const handleClientSelection =(selection)=>{
           getClient(selection)
    }

    return (
        <InputGroup className='my-2'>
            <InputGroup.Prepend className='bg-warning rounded-left text-uppercase' >
                <InputGroup.Text className='text-white px-2 font-weight-bold' >CLIENTE</InputGroup.Text>
            </InputGroup.Prepend>
            <Typeahead id='client-list' labelKey='name' options={list} onChange={( selected )=>handleClientSelection(selected)} placeholder='Elija un cliente... ' clearButton />
        </InputGroup>
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
