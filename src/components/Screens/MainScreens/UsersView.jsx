import Permission from 'components/Layouts/Permission'
import SearchData from 'components/Utils/SearchData'
import React, { useState, Fragment } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { connect } from 'react-redux'
import ClientsActions from '../Clients/ClientsActions'
import UsersList from '../Clients/List'

const UsersView = ({user}) => {
    const [criteria, setCriteria] = useState('')

    return (
    <Container fluid className='px-0'>
        <h1 className='text-center text-white py-2 bg-warning title-section'>CLIENTES</h1>
        <Row>
            <Permission 
                role={user.role}
                perform='clients:actions'
                yes={() =>
                    <Col sm lg={2}>
                        <ClientsActions />
                    </Col>
                }
            />
            <Col sm lg={3}>
                <SearchData criteria={criteria} setCriteria={setCriteria} />
            </Col>
        </Row>
        <Row>
            <Col sm lg={12}>
                <UsersList criteria={criteria} />
            </Col>
        </Row>
    </Container>
    )
}

const MSTP = state => (
    {
        user: state.auth.user
    }
)

export default connect(MSTP, null)(UsersView)