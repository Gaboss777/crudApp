import React from 'react';
import {Table, Button} from 'react-bootstrap';

export const ViewTablet =(props)=>{
    return(
        <Table responsive >
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
                {props.users.length > 0 ? (
                    props.users.map((user) =>
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.lastName}</td>
                            <td>{user.idDocument}</td>
                            <td>{user.zoneLocation}</td>
                            <td>
                                <Button 
                                    variant='success' 
                                    className='mx-1'
                                    onClick={() => props.editRow(user)}>Edit</Button>
                                <Button
                                    variant='danger'
                                    className='mx-1'
                                    onClick={() => props.deleteUser(user.id)}>Delete</Button>
                            </td>
                        </tr>
                    )
                ) : (
                    <tr>
                        <td colSpan={3}>No hay usuarios registrados</td>
                    </tr>
                )
                }

            </tbody>
        </Table>
    )
}