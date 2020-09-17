import React, { Fragment } from 'react'
import { ButtonGroup, Col, Row } from 'react-bootstrap';
import DeleteUser from '../DeleteUser/deleteUser';

import UserForm from '../Forms/Form';
import SearchData from '../SearchData';

const UsersActions = ({ userSelected }) => {
    return (
        <Fragment >
            <Row>
                <Col sm lg={2}>
                <ButtonGroup className='my-2' >
                    <UserForm btnText='Crear Nuevo Usuario' asModal={true} editing={false} />
                    <UserForm btnText='Guardar Cambios' asModal={true} editing={true} />
                    <DeleteUser />
                </ButtonGroup>
                </Col>
                <Col>
                    <SearchData />
                </Col>
            </Row>
        </Fragment>
    )
}

export default UsersActions