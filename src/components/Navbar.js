import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import Logo from '../img/LOGO.png';

const MainMenu =()=> {
    return(
    <Navbar expand="lg" bg='light' className='mb-3' >
        <Navbar.Brand href="#home">
            <img src={Logo} alt='Logo' />
        </Navbar.Brand>
        <Nav >
            <Nav.Link>LISTA</Nav.Link>
            <Nav.Link>PAGOS</Nav.Link>
        </Nav>
    </Navbar>
    )
}

export default MainMenu