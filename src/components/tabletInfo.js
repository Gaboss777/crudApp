import React from 'react';
import {Table, Button} from 'react-bootstrap';

export const ViewTablet =({users, editRow, confirmDelete, handleOpen})=>{
    return(
        <Table responsive bordered striped >
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th>CI/RIF</th>
                    <th>Zona</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {users.length > 0 ? (
                    users.map(user =>
                        <tr key={user.id}>
                            <td>{user.name}</td>
                            <td>{user.lastName}</td>
                            <td>{user.idDocument}</td>
                            <td>{user.zoneLocation}</td>
                            <td>
                                <Button
                                    variant='outline-success'
                                    className='mx-1'
                                    handleOpen={handleOpen}
                                    onClick={() => editRow(user)}>Editar</Button>
                                <Button
                                    variant='outline-danger'
                                    className='mx-1'
                                    handleOpen={handleOpen}
                                    onClick={() => confirmDelete(user)}>Borrar</Button>
                            </td>
                        </tr>
                    )
                ) : (
                    <tr>
                        <td colSpan={5}>No hay usuarios registrados</td>
                    </tr>
                )
                }

            </tbody>
        </Table>
    )
}