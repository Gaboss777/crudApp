import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import ButtonActions from './btnActions';
import Logo from '../img/LOGO.png';

export const MenuCrud =()=> {

    return(
    <Navbar expand="lg" bg='light' className='mb-3' >
        <Navbar.Brand href="#home">
            <img src={Logo} alt='Logo' />
        </Navbar.Brand>
        <Nav >
            <ButtonActions />
        </Nav>
    </Navbar>
    )
}