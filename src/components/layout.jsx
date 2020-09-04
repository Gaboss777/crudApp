import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { ToastContainer, Slide } from 'react-toastify';

const Layout =({ children })=> {
    return(
        <Container fluid>
            <Row>
                <Col xs lg={12} >
                    { children }
                </Col>
            </Row>
            <ToastContainer position='top-center' autoClose={2000} hideProgressBar closeOnClick transition={Slide}  />
        </Container>
    )
}

export default Layout