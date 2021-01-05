import React from 'react'
import {Container, Row, Col, Button} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThList, faFileInvoiceDollar, faFileContract } from '@fortawesome/free-solid-svg-icons';
import { Link, Redirect } from 'react-router-dom';
import Permission from '../../Layouts/Permission';
import { connect } from 'react-redux';

const Dashboard = ({ user }) => {
    return (
        <Permission
            role={user.role}
            perform='dashboard-page:visual'
            yes={() => (
                <Container fluid>
                    <Row className='justify-content-center dashboard-container'>
                        <Col className='text-center btn-dash-position '>
                            <Permission 
                                role={user.role}
                                perform='clients-section:visual'
                                yes={() =>
                                    <Link to='/clients'><ButtonDashboard textBtn='CLIENTES' icon={faThList} /></Link>
                                }
                            />
                            <Permission 
                                role={user.role}
                                perform='payments-section:visual'
                                yes={() =>
                                    <Link to='/payments'><ButtonDashboard textBtn='PAGOS' icon={faFileInvoiceDollar} /></Link>
                                }
                            />
                            <Permission 
                                role={user.role}
                                perform='reports-section:visual'
                                yes={() =>
                                    <Link to='/reports'><ButtonDashboard textBtn='REPORTES' icon={faFileContract} /></Link>
                                }
                            />
                        </Col>
                    </Row>
                </Container>
            )}
         />
    )
}

const ButtonDashboard =({textBtn, icon})=> {
    return(
        <Button className='btn-dash-size btn-dash-style btn-dash-vertical mt-3' ><FontAwesomeIcon icon={icon} size='2x' className='mt-3' /><p className='mt-2'>{textBtn}</p></Button>
    )
}

const MSTP = state => (
    {
        user: state.auth.user
    }
)

export default connect(MSTP, null)(Dashboard)