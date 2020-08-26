import React, {useState} from 'react';
import { connect } from 'react-redux';
import { updateUser } from '../../ducks/users';
import FormUser from './Forms';
import Alerts from '../Alerts/alerts';

const EditUser = ({userActual, editUser, handleClose, show}) => {
    const [user, setUser] = useState(userActual)

    const handleInputChange = event => {
        const {name, value} = event.target
        setUser({...user, [name]: value})
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        editUser(user.id, user)
        Alerts.EditNotify("DATOS ACTUALIZADOS")
    }

    return(
        <FormUser user={user} handleSubmit={handleSubmit} handleInputChange={handleInputChange} textSubmit="Editar" variantBtn='outline-success' />
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