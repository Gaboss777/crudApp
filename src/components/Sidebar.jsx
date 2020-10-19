import React, { Fragment, useState } from 'react'
import { Nav } from 'react-bootstrap'
import { Link, useLocation, useHistory } from 'react-router-dom'

const SideBar = ({ path }) => {

    const location = useLocation()
    const history = useHistory()
    console.log(location)
    console.log(history)

    const [key, setKey] = useState()



    return (
        <Fragment>
            <Nav variant='tabs' activeKey={key} onSelect={(k) => setKey(k)} className='flex-column sidebar-payment bg-warning border-right border-dark' >
                <Nav.Link eventKey='1' as={Link} to={`${path}/client`} className='side-link'>Pago Clientes</Nav.Link>
                <Nav.Link eventKey='2' as={Link} to={`${path}/provider`} className='side-link' >Pago Proveedores</Nav.Link>
                <Nav.Link eventKey='3' as={Link} to={`${path}/employee`} className='side-link' >Pago Empleados</Nav.Link>
            </Nav>
        </Fragment>
    )
}

export default SideBar