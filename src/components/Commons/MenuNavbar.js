import React from 'react';
import { Navbar, Nav, Button, NavDropdown } from 'react-bootstrap';
import Logo from '../../img/Logo 3.png';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { logout, getToken } from '../../ducks/authReducer'
import Permission from '../Layouts/Permission';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV, faKey, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

const MenuNavbar =({user, logout})=> {

    return(
    <Navbar expand="lg" bg='white' className='py-1' >
        <Navbar.Brand>
            <img src={Logo} alt='Logo' width='200' height='60' />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='responsive-navbar'>
            <FontAwesomeIcon icon={faEllipsisV} />
        </Navbar.Toggle>
        <Navbar.Collapse id='responsive-navbar' className='justify-content-end'>
            <Nav>
                <Permission
                    role={user.role}
                    perform='dashboard-page:visual'
                    yes={<Nav.Link as={Link} to='/' className='nav-link-menu p-2 mx-1 navbar-hover-effect float-left' >INICIO</Nav.Link>
                    }
                />
                {/* <Permission
                    role={user.role}
                    perform='clients-section:visual'
                    yes={<Nav.Link as={Link} to='/clients' className='nav-link-menu p-2 mx-1 navbar-hover-effect' >CLIENTES</Nav.Link>
                    }
                />
                <Permission
                    role={user.role}
                    perform='payments-section:visual'
                    yes={<Nav.Link as={Link} to='/payments' className='nav-link-menu p-2 mx-1 navbar-hover-effect' >PAGOS</Nav.Link>
                    }
                />
                <Permission
                    role={user.role}
                    perform='reports-section:visual'
                    yes={<Nav.Link as={Link} to='/reports' className='nav-link-menu p-2 mx-1 navbar-hover-effect' >REPORTES</Nav.Link>
                    }
                />
                <Permission
                    role={user.role}
                    perform='permission-section:visual'
                    yes={<Nav.Link as={Link} to='/permission' className='nav-link-menu p-2 mx-1 navbar-hover-effect '>PERMISOS</Nav.Link>
                    }
                 /> */}

                { getToken() ? (
                    <NavDropdown alignRight title={user.user} id='nav-dropdown' className='font-weight-bold text-dark dropdown-menu-left'>
                        <NavDropdown.Item className='px-3' as={Button} >
                            <FontAwesomeIcon icon={faKey} className='mr-2' style={{ fontSize: 10 }} />Cambiar Contrasena
                        </NavDropdown.Item>
                        <NavDropdown.Item as={Button} variant='danger' onClick={logout} className='px-3' >
                            <FontAwesomeIcon icon={faSignOutAlt} className='mr-2' />Salir
                        </NavDropdown.Item>
                    </NavDropdown>
                ) : null }
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