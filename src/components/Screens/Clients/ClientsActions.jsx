import React, { Fragment } from 'react'
import { ButtonGroup, Col, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import DeleteClients from './DeleteClients';

import ClientsForm from './Forms/ClientsForm';
import Permission from '../../Layouts/Permission';
import ClientInfo from './ClientInfo';

const UsersActions = ({ user }) => {
    return (
        <Fragment >
            <Row>
                <Col sm lg={2}>
                    <ButtonGroup className='mb-2 rounded' aria-label='clients-actions' >
                        <Permission
                            role={user.role}
                            perform='clients:create'
                            yes={<ClientsForm asModal={true} editing={false} />}
                        />
                        <Permission
                            role={user.role}
                            perform='clients:edit'
                            yes={<ClientsForm asModal={true} editing={true} />}
                        />
                        <Permission
                            role={user.role}
                            perform='clients:remove'
                            yes={<DeleteClients />}
                        />
                        <ClientInfo />
                    </ButtonGroup>
                </Col>
            </Row>
        </Fragment>
    )
}

const MSTP = state => (
    {
        user: state.auth.user
    }
)

export default connect(MSTP, null)(UsersActions)