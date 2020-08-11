import React from 'react';
import {Table, Button} from 'react-bootstrap';

export const ViewTablet =({users, editRow})=>{
    return(
        <Table responsive bordered striped >
            <thead>
                <tr>
                    <th>#</th>
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th>CI/RIF</th>
                    <th>Zona</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {users.length > 0 ? (
                    users.map((user, index) =>
                        <tr key={index} >
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.lastName}</td>
                            <td>{user.idDocument}</td>
                            <td>{user.zoneLocation}</td>
                            <td>
                                <Button
                                    variant='outline-success'
                                    className='mx-1'
                                    onClick={() => {
                                        editRow(user, true)
                                        }}>Editar</Button>
                                <Button
                                    variant='outline-danger'
                                    className='mx-1'
                                    onClick={() => {
                                        editRow(user, false)
                                        }}>Borrar</Button>
                            </td>
                        </tr>
                    )
                ) : (
                    <tr>
                        <td colSpan={6}>No hay usuarios registrados</td>
                    </tr>
                )
                }

            </tbody>
        </Table>
    )
}