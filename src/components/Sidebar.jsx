import { faCashRegister, faFileAlt, faFileInvoice, faMoneyCheckAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { Fragment } from 'react'
import { Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const SideBar = () => {
    return (
        <Fragment>
            <Nav className='flex-column sidebar-payment bg-warning' >
                <Nav.Link as={Link} to='/payment/client'><FontAwesomeIcon icon={faCashRegister} className='mr-2' />Pago Clientes</Nav.Link>
                <Nav.Link as={Link} to='/payment/provider'><FontAwesomeIcon icon={faMoneyCheckAlt} className='mr-2' />Proveedores</Nav.Link>
                <Nav.Link as={Link} to='/payment/accountStatus'><FontAwesomeIcon icon={faFileInvoice} className='mr-2' />Estados de Cuentas</Nav.Link>
                <Nav.Link as={Link} to='/payment/reports'><FontAwesomeIcon icon={faFileAlt} className='mr-2' />Reportes</Nav.Link>
            </Nav>
        </Fragment>
    )
}

export default SideBar