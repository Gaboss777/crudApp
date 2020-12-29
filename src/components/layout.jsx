import React from 'react';
import { Container } from 'react-bootstrap';
import { ToastContainer, Slide } from 'react-toastify';
import MenuNavbar from './MenuNavbar'
import { getToken } from '../ducks/authReducer'

const Layout =({ children })=> {
    return(
        <Container fluid className='h-100 px-0'>
            {!getToken() && <MenuNavbar /> }
            <Container fluid >
                { children }
            </Container>
            <ToastContainer autoClose={2000} position='top-center' hideProgressBar closeOnClick transition={Slide}  />
        </Container>
    )
}

export default Layout