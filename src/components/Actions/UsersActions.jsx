import React, { Fragment } from 'react'
import { ButtonGroup, Col, Row } from 'react-bootstrap';
import DeleteUser from '../DeleteUser/deleteUser';

import UserForm from '../Forms/Form';
import SearchData from '../SearchData';
import UserView from '../users/UserView';

const UsersActions = ({ userSelected,criteria,setCriteria }) => {
    return (
        <Fragment >
            <Row>
                <Col sm lg={2}>
                <ButtonGroup className='mb-2' >
                    <UserForm btnText='Crear Nuevo Usuario' asModal={true} editing={false} />
                    <UserForm btnText='Guardar Cambios' asModal={true} editing={true} />
                    <DeleteUser />
                    <UserView editing={false} />
                </ButtonGroup>
                </Col>
                <Col sm lg={3}>
                    <SearchData criteria={criteria} setCriteria={setCriteria} />
                </Col>
            </Row>
        </Fragment>
    )
}

export default UsersActions