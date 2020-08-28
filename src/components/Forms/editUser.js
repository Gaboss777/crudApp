import React from 'react';
import { connect } from 'react-redux';
import { updateUser } from '../../ducks/users';
import UserForm from './Form';
import Alerts from '../Alerts/alerts';

const EditUser = ({userActual, editUser}) => {

    const handleSubmit = (data) => {
        editUser(userActual.id, data)
        Alerts.EditNotify("DATOS ACTUALIZADOS")
    }

    return(
        <UserForm handleSubmit={handleSubmit} textSubmit="Agregar" variantBtn='success' data={userActual} />
    )
}

const mapStateToProp = state =>(
    {
        userActual: state.users.selected
    }
)

const mapDispatchToProps = dispatch => (
    {
        editUser: (id, data) => dispatch(updateUser(id, data))
    }
)

export default connect(mapStateToProp, mapDispatchToProps)(EditUser)