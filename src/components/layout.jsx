import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Layout =({ children })=> {
    return(
        <Container>
            <Row>
                <Col>
                    <h3 className='text-center' >DATOS</h3>
                </Col>
                <Col xs={12} >
                    { children }
                </Col>
            </Row>
        </Container>
    )
}

export default Layout