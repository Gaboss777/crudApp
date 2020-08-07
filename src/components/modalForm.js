import React from 'react';
import { FormUsers } from './addUser';
import { EditForm } from './editUser';
import { DeleteUser } from './userOperations';
import { Modal } from 'react-bootstrap';

export const ModalForm =({handleClose, addUser, show, setEdit, edit, updateUser, userActual, confirm, setConfirm}) => {
    return(
        <div>
            <Modal show={show} onHide={handleClose}>
            { confirm ? (
                <div>
                    <Modal.Header closeButton >
                        <Modal.title>Desea borrar los siguientes datos?</Modal.title>
                    </Modal.Header>
                    <Modal.Body>
                        <DeleteUser handleClose={handleClose} userActual={userActual} setConfirm={setConfirm} />
                    </Modal.Body>
                </div>
            ) : (
                <div>
                    { edit ? (
                        <div>
                            <Modal.Header closeButton >
                                <Modal.Title>Editar Datos</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <EditForm setEdit={setEdit} userActual={userActual} updateUser={updateUser} handleClose={handleClose}/>
                            </Modal.Body>
                        </div>
                    ) : (
                        <div>
                            <Modal.Header closeButton >
                                <Modal.Title>Nuevo Usuario</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <FormUsers addUser={addUser} handleClose={handleClose}/>
                            </Modal.Body>
                        </div>
                    )}
                </div>
            )}
            </Modal>
        </div>
    )
}