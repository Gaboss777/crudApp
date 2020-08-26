import React from 'react';
import { Navbar, Nav, ButtonGroup } from 'react-bootstrap';
import Logo from '../img/LOGO.png';
import CallModal from './Modal/Modal';
import NewUser from './Forms/addUser';
import EditUser from './Forms/editUser';
import DeleteUser from './deleteUser';
import { faUserEdit, faTrashAlt, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';

const MenuCrud =(props)=> {
    return(
    <Navbar expand="lg" bg='light' className='mb-3' >
        <Navbar.Brand href="#home">
            <img src={Logo} alt='Logo' />
        </Navbar.Brand>
        <Nav >
            <ButtonGroup >
                <CallModal OverLayPlace='bottom' TooltipText="Agregar" HeaderModalColor='bg-primary' titleModal='Nuevo Usuario' variantBtn='warning' sizeBtn='lg' iconBtn={faUserPlus} >
                    <NewUser />
                </CallModal>
                <CallModal OverLayPlace='bottom' TooltipText="Editar" HeaderModalColor='bg-success' titleModal='Editar Usuario' variantBtn='warning' sizeBtn='lg' iconBtn={faUserEdit} disabled={props.userSelected ? false : true } >
                    <EditUser />
                </CallModal>
                <CallModal OverLayPlace='bottom' TooltipText="Eliminar" HeaderModalColor='bg-danger' titleModal='Eliminar Usuario' variantBtn='warning' sizeBtn='lg' sizeModal="sm" iconBtn={faTrashAlt} disabled={props.userSelected ? false : true } >
                    <DeleteUser />
                </CallModal>
            </ButtonGroup>
        </Nav>
    </Navbar>
    )
}

const mapStateToProps = state => (
    {
        userSelected: state.users.selected
    }
)

export default connect(mapStateToProps, null)(MenuCrud)