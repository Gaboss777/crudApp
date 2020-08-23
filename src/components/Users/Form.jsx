import React from 'react';
import { Form, FormControl, Button } from 'react-bootstrap';
import { useState } from 'react';
import { connect } from 'react-redux';
import { createUser } from '../../ducks/users';
const UserForm = ({createUser,loading}) => {
    const [name, setName] = useState("");
    const handleSubmit = (e) => {
        e.preventDefault();
        let user = { name }
        createUser(user);

    }

    return (
        <Form onSubmit={handleSubmit}>
            <FormControl value={name} onChange={({ target }) => setName(target.value)} />
            <Button type='submit'>CREAR</Button>
        </Form>
    )
}

const MSTP = state => (
    {
        loading:state.users.loading
    }
)

const MDTP = dispatch => (
    {
        createUser:(user)=>dispatch(createUser(user))
    }
)

export default connect(MSTP, MDTP)(UserForm)