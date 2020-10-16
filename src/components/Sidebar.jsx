import React, { Fragment, useState } from 'react'
import { Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const SideBar = () => {
    const [key, setKey] = useState('0')

    return (
        <Fragment>
            <Nav variant='tabs' activeKey={key} onSelect={(k) => setKey(k)} className='flex-column sidebar-payment bg-warning border-right border-dark' >
                <Nav.Link eventKey='1' as={Link} to='/payment/client' className='side-link'>Pago Clientes</Nav.Link>
                <Nav.Link eventKey='2' as={Link} to='/payment/provider' className='side-link' >Pago Proveedores</Nav.Link>
                <Nav.Link eventKey='3' as={Link} to='/payment/employee' className='side-link' >Pago Empleados</Nav.Link>
            </Nav>
        </Fragment>
    )
}

export default SideBar