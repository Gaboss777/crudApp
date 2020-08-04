import React  from 'react';
import {Col, Row, Container} from 'react-bootstrap';
import { ViewTablet } from './tabletInfo';
import { FormUsers } from './addUser';
import { EditForm } from './editUser';
import { CrudFunction } from '../helpers/funcionesCrud';

const CrudApp =()=> {
    const { users, edit, setEdit, userActual, addUser, deleteUser, editRow, updateUser } = CrudFunction()
    return (
        <Container fluid >
            <Row className='my-3'>
                <h1 className='mx-auto'>PROYECTO CRUD</h1>
            </Row>
            <Row className='text-center'>
            {edit ? (
                <Col>
                    <Col>
                        <h2>Editar Datos</h2>
                    </Col>
                    <Col>
                        <EditForm setEdit={setEdit} userActual={userActual} updateUser={updateUser} />
                    </Col>
                </Col>
                ) : (
                <Col>
                    <Col>
                    <h2>Agregar Datos</h2>
                    </Col>
                    <Col>
                        <FormUsers addUser={addUser} />
                    </Col>
                </Col>
            )}
                <Col>
                    <Col>
                        <h2>Datos</h2>
                    </Col>
                    <Col>
                        <ViewTablet users={users} deleteUser={deleteUser} editRow={editRow} />
                    </Col>
                </Col>
            </Row>
        </Container>
    )
}

export default CrudApp;