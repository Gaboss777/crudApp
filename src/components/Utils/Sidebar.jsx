import React, { useState } from 'react'
import { Col, Container, Row, Nav } from 'react-bootstrap';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch, Link, useRouteMatch } from 'react-router-dom';
import Permission from '../Layouts/Permission';

const SideBar = ({ data, user, path }) => {
    const [key, setKey] = useState()

    return (
        <Col sm lg='2' className='px-0 sidebar-payment'>
            <Nav variant='tabs' activeKey={key} onSelect={(k) => setKey(k)} className='flex-column bg-warning' >
            {data.map((link) =>
                <Permission
                    role={user.role}
                    perform={`${link.perform}:visual`}
                    yes={<Nav.Link eventKey={link.id} as={Link} to={`${path}/${link.route}`} className='side-link'>{link.linkName}</Nav.Link>}
                />
            )}
            </Nav>
        </Col>
    )
}

const MSTP = state => (
    {
        user: state.auth.user
    }
)

export default connect(MSTP, null)(SideBar)