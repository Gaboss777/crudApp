import React from 'react';
import { connect } from 'react-redux';
import { removeUser } from '../../ducks/users';
import ConfirmWarning from '../Alerts/ConfirmWarning';
import Alerts from '../Alerts/alerts';

const DeleteUser =({deleteUser, userActual, handleClose})=>{

    const handleSubmit = (data) => {
        data.map(user => deleteUser(user.id))
        Alerts.RemoveNotify("USUARIO ELIMINADO")
        handleClose()
    }

    return (
        <ConfirmWarning textBtn="Eliminar" textWarning="Desea Eliminar el siguiente dato?" handleSubmit={handleSubmit} data={userActual} />
    )
}

const mapStateToProps = state => (
    {
        userActual: state.users.selected
    }
)

const mapDispatchToProps = dispatch => (
    {
        deleteUser: (data) => dispatch(removeUser(data))
    }
)

export default connect(mapStateToProps, mapDispatchToProps)(DeleteUser)