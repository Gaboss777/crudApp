import React from 'react';
import {Table, Button} from 'react-bootstrap';

export const ViewTablet =({users, editRow})=>{
    return(
        <Table responsive bordered hover size='sm'>
            <thead>
                <tr className='bg-primary text-white'>
                    <th>#</th>
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th>CI/RIF</th>
                    <th>Zona</th>
                    <th>Accion</th>
                </tr>
            </thead>
            <tbody>
                {users.length > 0 ? (
                    users.map((user, index) =>
                        <tr key={index} >
                            <td>{index + 1}</td>
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
                                    variant='outline-warning'
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