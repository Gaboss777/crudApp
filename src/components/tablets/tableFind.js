import React from 'react';
import {Table, Button} from 'react-bootstrap';

const FindTable =({findUser, editRow})=> {
    return(
        <Table responsive bordered size='sm'>
            <thead>
                <tr className='bg-primary text-white'>
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th>CI/RIF</th>
                    <th>Zona</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {findUser.length > 0 ? (
                    findUser.map((user, index) => 
                    <tr key={index} >
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
                        <td colSpan={5}>NO EXISTE EL USUARIO</td>
                    </tr>
                )
                }
            </tbody>
        </Table>
    )
}

export default FindTable