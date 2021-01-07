import React from 'react';
import { Container } from 'react-bootstrap';
import { ToastContainer, Slide } from 'react-toastify';
import MenuNavbar from '../Commons/MenuNavbar'
import { getToken } from '../../ducks/authReducer'

const Layout =({ children,user })=> {
    return(
        <Container fluid className='h-100 px-0'>
            {getToken() && <MenuNavbar /> }
            <Container fluid className='px-0'>
                { children }
            </Container>
            <ToastContainer autoClose={2000} position='top-center' hideProgressBar closeOnClick transition={Slide}  />
        </Container>
    )
}

export default Layout