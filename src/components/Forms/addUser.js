import React, {useState} from 'react';
import {connect} from 'react-redux';
import FormUser from './Forms';
import { createUser}  from '../../ducks/users';
import { uuid } from 'uuidv4'
import Alerts from '../Alerts/alerts';

const NewUser = ({addUser, handleClose}) => {

    const initialFormState = { id: uuid(), razonSocial: '', idDocument: '', zoneLocation: '', bandwidth: '', Estado: '', services: '', ipAddress: '' }
    const [user, setUser] = useState(initialFormState)

    const handleInputChange = event => {
        const {name, value} = event.target
        setUser({...user, [name]: value})
    }

    const handleSubmit = event => {
        event.preventDefault()

        addUser(user)
        setUser(initialFormState)
        Alerts.InfoNotify("USUARIO AGREGADO")
    }

    return(
        <FormUser user={user} handleSubmit={handleSubmit} handleInputChange={handleInputChange} textSubmit="Agregar" variantBtn='outline-primary' />
    )
}

const mapDispatchToProps = dispatch => (
    {
        addUser: (data) => dispatch(createUser(data))
    }
)

export default connect(null, mapDispatchToProps)(NewUser)