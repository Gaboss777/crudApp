import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import ButtonActions from './btnActions';

export const MenuCrud =()=> {

    return(
    <Navbar expand="lg" bg='light' className='mb-3' >
        <Navbar.Brand href="#home">PROYECTO CRUD</Navbar.Brand>
        <Nav >
            <Nav.Link href='#home'>home</Nav.Link>
            <ButtonActions />
        </Nav>
    </Navbar>
    )
}