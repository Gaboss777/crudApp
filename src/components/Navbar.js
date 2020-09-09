import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import Logo from '../img/LOGO.png';
import { Link } from 'react-router-dom';

const MainMenu =()=> {
    return(
    <Navbar expand="lg" bg='white' className='mb-3 py-1' >
        <Navbar.Brand href="#home">
            <img src={Logo} alt='Logo' />
        </Navbar.Brand>
        <Nav >
            <Nav.Link as={Link} to='/' className='nav-link-menu p-2 navbar-hover-effect' ><FontAwesomeIcon icon={faHome} className='mr-2' />INICIO</Nav.Link>
        </Nav>
    </Navbar>
    )
}

export default MainMenu