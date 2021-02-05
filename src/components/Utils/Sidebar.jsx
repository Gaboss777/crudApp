import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react'
import { Col, Nav, Accordion } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Permission from '../Layouts/Permission';

export const SubMenu = ({link, toggle, setToggle}) => {
    const [subkey, setSubkey] = useState('')

    const collapsedAction = () => {
        setToggle(false)
        setSubkey('')
    }

    const lastItem = link.subLinks.slice(-1)
    console.log(lastItem)

    return (
        <Nav.Item className='my-1' >
            <Accordion.Toggle as={Nav.Link} variant='link' eventKey={link.id} onClick={collapsedAction}className={`${toggle ? 'bg-warning accordion-item' : 'rounded'} sidebar-link py-2`} >
                <FontAwesomeIcon icon={link.icon} className='mr-2' />{link.linkName}<FontAwesomeIcon icon={toggle ? faCaretDown : faCaretUp } className='float-right' />
            </Accordion.Toggle>
            <Accordion.Collapse eventKey={link.id} >
                <Nav activeKey={subkey} onSelect={(k) => setSubkey(k)} className='flex-column bg-warning'>
                    {link.subLinks.map(sub => (
                        <Nav.Item className={`${lastItem.id === sub.id ? 'rounded-bottom' : '' }`}>
                            <Nav.Link as={Link} eventKey={sub.id} to={`/${link.linkName}/${sub.route}`} className='sidebar-link sublink py-2 pl-5' ><FontAwesomeIcon icon={sub.icon} className='mr-1' />{sub.linkName}</Nav.Link>
                        </Nav.Item>
                    ))}
                </Nav>
            </Accordion.Collapse>
        </Nav.Item>
    )
}

const SideBar = ({ data, role, path }) => {
    const [key, setKey] = useState('')
    const [toggle, setToggle] = useState(true)

    return (
        <Col sm lg='2' className='py-3 sidebar'>
            <Accordion activeKey={key} onSelect={(k) => setKey(k)}>
            {data.map((link) =>
                <Permission
                    role={role}
                    perform={`${link.perform}:visual`}
                    yes={
                        <>
                            {Array.isArray(link.subLinks)
                                ? <SubMenu link={link} setToggle={setToggle} toggle={key === link.id ? true : false} />
                                :
                                <Nav activeKey={key} onSelect={(k) => setKey(k)} >
                                    <Nav.Item className='my-1 w-100'>
                                        <Nav.Link eventKey={link.id} as={Link} to={`/${link.route}`} className='sidebar-link rounded py-2'><FontAwesomeIcon icon={link.icon} className='mr-1' /> {link.linkName}</Nav.Link>
                                    </Nav.Item>
                                </Nav>

                            }
                        </>
                    }
                />
            )}
            </Accordion>
        </Col>
    )
}

const MSTP = state => (
    {
        role: state.auth.user.role
    }
)

export default connect(MSTP, null)(SideBar)