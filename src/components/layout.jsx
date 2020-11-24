import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { ToastContainer, Slide } from 'react-toastify';

const Layout =({ children })=> {
    return(
        <Container fluid className='h-100'>
            <Row>
                <Col xs lg={12} >
                    { children }
                </Col>
            </Row>
            <ToastContainer autoClose={2000} position='top-center' hideProgressBar closeOnClick transition={Slide}  />
        </Container>
    )
}

export default Layout