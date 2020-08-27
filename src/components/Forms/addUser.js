import React from 'react';
import {connect} from 'react-redux';
import UserForm from './Form';
import { createUser}  from '../../ducks/users';
import { uuid } from 'uuidv4'
import Alerts from '../Alerts/alerts';

const NewUser = ({addUser}) => {

    const initialState = { razonSocial: '', idDocument: '', zoneLocation: '', bandwidth: '', Estado: '', services: '', ipAddress: ''}

    const handleSubmit = (data) => {
        let newUser = Object.assign({ id: uuid() }, data)
        addUser(newUser)
        Alerts.InfoNotify("USUARIO AGREGADO")
    }

    return(
        <UserForm handleSubmit={handleSubmit} textSubmit="Agregar" variantBtn='outline-primary' data={initialState} />
    )
}

const mapDispatchToProps = dispatch => (
    {
        addUser: (data) => dispatch(createUser(data))
    }
)

export default connect(null, mapDispatchToProps)(NewUser)