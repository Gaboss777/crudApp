import React, { Fragment } from 'react'
import { ButtonGroup } from 'react-bootstrap';
import DeleteUser from '../DeleteUser/deleteUser';

import UserForm from '../Forms/Form';

const UsersActions = ({ userSelected }) => {
    return (
        <Fragment >
            <ButtonGroup className='mb-3' >
                <UserForm btnText='Crear Nuevo Usuario' asModal={true} editing={false} />
                <UserForm btnText='Guardar Cambios' asModal={true} editing={true} />
                <DeleteUser />
            </ButtonGroup>
        </Fragment>
    )
}

export default UsersActions