import React, { useState } from 'react'
import { Col, Container, Row, Nav } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

const SideBar = ({ data, path }) => {
    const [key, setKey] = useState()

    return (
        <Router>
            <Container fluid className='px-0' >
                <Row>
                    <Col sm lg='2'>
                        <Nav variant='tabs' activeKey={key} onSelect={(k) => setKey(k)} className='flex-column sidebar-payment bg-warning border-right border-dark' >
                        {data.map(link =>
                            <Nav.Link eventKey={link.id} as={Link} to={`${path}/${link.route}`} className='side-link'>{link.linkName}</Nav.Link>
                        )}
                        </Nav>
                    </Col>
                    <Col sm lg='10'>
                        <Switch>
                        {data.map(link => 
                            <Route path={`${path}/${link.route}`} component={link.component} />
                        )}
                        </Switch>
                    </Col>
                </Row>
            </Container>
        </Router>
    )
}

export default SideBar