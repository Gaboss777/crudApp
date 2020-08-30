import React, { Fragment } from 'react'
import { ButtonGroup } from 'react-bootstrap';
import { faUserEdit, faTrashAlt, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import NewUser from '../Forms/addUser';
import EditUser from '../Forms/editUser';
import DeleteUser from '../DeleteUser/deleteUser';
import UsersModal from './Modal';
import { connect } from 'react-redux';
import { ToastContainer, Zoom } from 'react-toastify';

const UsersActions = ({ userSelected }) => {
    return (
        <Fragment >
            <ButtonGroup className='mb-3' >
                <UsersModal OverLayPlace='top' TooltipText="Agregar" HeaderModalColor='bg-primary' titleModal='Nuevo Usuario' variantBtn='warning' sizeBtn='lg' iconBtn={faUserPlus} >
                    <NewUser />
                </UsersModal>
                <UsersModal OverLayPlace='top' TooltipText="Editar" HeaderModalColor='bg-success' titleModal='Editar Usuario' variantBtn='warning' sizeBtn='lg' iconBtn={faUserEdit} disabled={Array.isArray(userSelected) ? true : userSelected ? false : true } >
                    <EditUser />
                </UsersModal>
                <UsersModal OverLayPlace='top' TooltipText="Eliminar" HeaderModalColor='bg-danger' titleModal='Eliminar Usuario' variantBtn='warning' sizeBtn='lg' sizeModal="lg" iconBtn={faTrashAlt} disabled={userSelected ? false : true } >
                    <DeleteUser />
                </UsersModal>
            </ButtonGroup>
            <ToastContainer transition={Zoom} position="top-center" autoClose={2000} hideProgressBar closeOnClick draggable pauseOnHover={false} />
        </Fragment>
    )
}

const MSTP = state => (
    {
        userSelected: state.users.selected
    }
)

export default connect(MSTP, null)(UsersActions)