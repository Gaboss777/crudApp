import React from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import Logo from '../../img/Logo 3.png';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { logout, getToken } from '../../ducks/authReducer'
import Permission from '../Layouts/Permission';

const MenuNavbar =({user, logout})=> {

    return(
    <Navbar expand="lg" bg='white' className='py-1 shadow-none custom-navbar' >
        <Navbar.Brand>
            <img src={Logo} alt='Logo' width='230' height='75' />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='responsive-navbar' />
        <Navbar.Collapse id='responsive-navbar' className='justify-content-end'>
            <Nav >
                <Permission
                    role={user.role}
                    perform='dashboard-page:visual'
                    yes={() =>
                        <Nav.Link as={Link} to='/' className='nav-link-menu p-2 mx-1 navbar-hover-effect' >INICIO</Nav.Link>
                    }
                />
                <Permission
                    role={user.role}
                    perform='clients-section:visual'
                    yes={() =>
                        <Nav.Link as={Link} to='/clients' className='nav-link-menu p-2 mx-1 navbar-hover-effect' >CLIENTES</Nav.Link>
                    }
                />
                <Permission
                    role={user.role}
                    perform='payments-section:visual'
                    yes={() =>
                        <Nav.Link as={Link} to='/payments' className='nav-link-menu p-2 mx-1 navbar-hover-effect' >PAGOS</Nav.Link>
                    }
                />
                <Permission
                    role={user.role}
                    perform='reports-section:visual'
                    yes={() =>
                        <Nav.Link as={Link} to='/reports' className='nav-link-menu p-2 mx-1 navbar-hover-effect' >REPORTES</Nav.Link>
                    }
                />
                <Permission
                    role={user.role}
                    perform='permission-section:visual'
                    yes={() =>
                        <Nav.Link as={Link} to='/permission' className='nav-link-menu p-2 mx-1 navbar-hover-effect '>PERMISOS</Nav.Link>
                    }
                 />

                { getToken() && (
                        <Navbar.Text className='ml-5'>
                            <span className='mr-2 font-weight-bold text-uppercase text-dark'>{user.user} </span><Button variant='danger' size='sm' onClick={() => logout()} >Salir</Button>
                        </Navbar.Text>
                )}
            </Nav>
        </Navbar.Collapse>
    </Navbar>
    )
}

const MSTP = state => (
    {
        user: state.auth.user
    }
)

const MDTP = dispatch => (
    {
        logout: () => dispatch(logout())
    }
)

export default connect(MSTP, MDTP)(MenuNavbar)