import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import Logo from '../img/LOGO.png';
import { Link } from 'react-router-dom';

const MainMenu =()=> {
    return(
    <Navbar expand="lg" bg='light' className='mb-3' >
        <Navbar.Brand href="#home">
            <img src={Logo} alt='Logo' />
        </Navbar.Brand>
        <Nav >
            <Link to="/" >INICIO</Link>
        </Nav>
    </Navbar>
    )
}

export default MainMenu