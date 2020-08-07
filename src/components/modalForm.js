import React from 'react';
import { FormUsers } from './addUser';
import { EditForm } from './editUser';
import { Modal } from 'react-bootstrap';

export const ModalForm =({handleClose, addUser, show, setEdit, edit, updateUser, userActual}) => {
    return(
        <div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton >
                    <Modal.Title>Agregar Usuario</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                {edit ? (
                    <EditForm setEdit={setEdit} userActual={userActual} updateUser={updateUser} handleClose={handleClose}/>
                ) : (
                    <FormUsers addUser={addUser} handleClose={handleClose}/>
                )}
                </Modal.Body>
            </Modal>
        </div>
    )
}