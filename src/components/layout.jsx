import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { ToastContainer, Zoom } from 'react-toastify';

const Layout =({ children })=> {
    return(
        <Container>
            <Row>
                <Col xs={12} >
                    { children }
                </Col>
            </Row>
            <ToastContainer transition={Zoom} position="top-center" autoClose={2000} hideProgressBar closeOnClick draggable pauseOnHover={false} />
        </Container>
    )
}

export default Layout