import React from 'react';
import { connect } from 'react-redux';
import { removeUser } from '../../ducks/users';
import DeleteAlert from '../Alerts/DeleteAlert';
import Alerts from '../Alerts/alerts';

const DeleteUser =({deleteUser, dataSelected, handleClose})=>{

    const handleSubmit = (data) => {
        deleteUser(data.id)
        Alerts.RemoveNotify("USUARIO ELIMINADO")
        handleClose()
    }

    return (
        <DeleteAlert textBtn="Eliminar" textWarning="Desea Eliminar el siguiente dato?" handleSubmit={handleSubmit} data={dataSelected} />
    )
}

const mapStateToProps = state => (
    {
        dataSelected: state.users.selected
    }
)

const mapDispatchToProps = dispatch => (
    {
        deleteUser: (data) => dispatch(removeUser(data))
    }
)

export default connect(mapStateToProps, mapDispatchToProps)(DeleteUser)