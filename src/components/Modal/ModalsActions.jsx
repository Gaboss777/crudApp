import React, { Fragment } from 'react'
import { ButtonGroup } from 'react-bootstrap';
import { faUserEdit, faTrashAlt, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import EditUser from '../Forms/editUser';
import DeleteUser from '../DeleteUser/deleteUser';
import UsersModal from './Modal';
import { connect } from 'react-redux';

import UserForm from '../Forms/Form';

const UsersActions = ({ userSelected }) => {
    return (
        <Fragment >
            <ButtonGroup className='mb-3' >
                <UserForm btnText='Crear Nuevo Usuario' asModal={true} editing={false} />
                <UserForm btnText='Editar Usuario' asModal={true} editing={true} />
                <DeleteUser />
            </ButtonGroup>
        </Fragment>
    )
}

const MSTP = state => (
    {
        userSelected: state.users.selected
    }
)

export default connect(MSTP, null)(UsersActions)