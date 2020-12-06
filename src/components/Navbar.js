import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import Logo from '../img/Logo 3.png';
import { Link } from 'react-router-dom';

const MainMenu =()=> {
    return(
    <Navbar expand="lg" bg='white' className='py-1 shadow-none custom-navbar' >
        <Navbar.Brand>
            <img src={Logo} alt='Logo' width='230' height='75' />
        </Navbar.Brand>
        <Nav >
            <Nav.Link as={Link} to='/' className='nav-link-menu p-2 mx-1 navbar-hover-effect' >INICIO</Nav.Link>
            <Nav.Link as={Link} to='/users' className='nav-link-menu p-2 mx-1 navbar-hover-effect' >CLIENTES</Nav.Link>
            <Nav.Link as={Link} to='/payment' className='nav-link-menu p-2 mx-1 navbar-hover-effect' >PAGOS</Nav.Link>
            <Nav.Link as={Link} to='/reports' className='nav-link-menu p-2 mx-1 navbar-hover-effect' >REPORTES</Nav.Link>
        </Nav>
    </Navbar>
    )
}

export default MainMenu