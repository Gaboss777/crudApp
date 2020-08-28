import React, {useState} from 'react';
import {Table, FormCheck} from 'react-bootstrap';

export const ViewTablet =({users, InfoUser })=>{

    const [check, setCheck] = useState([])

    const handleChecked=(checked, id)=> {
        if (checked) {
            InfoUser(id)
            setCheck(id)
            console.log(check)
        } else {
            setCheck([])
        }
    }

    const toggleAll =(checked)=> {
        if (checked) {
            setCheck(users.map(user => user.id))
            console.log(check)
        } else {
            setCheck([])
        }
    }

    return(
        <Table responsive bordered hover size='sm'>
            <thead>
                <tr className='bg-dark text-white'>
                    <th><FormCheck type='checkbox' onChange={({ target }) => toggleAll(target.checked)} /></th>
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th>CI/RIF</th>
                    <th>Zona</th>
                </tr>
            </thead>
            <tbody>
                {users.length > 0 ? (
                    users.map((user, index) =>
                        <tr key={index} className={ check === user.id ? 'text-white bg-primary' : ''}>
                            <td><FormCheck
                                type='checkbox'
                                onChange={({ target }) => handleChecked(target.checked, user.id)}
                                checked={check.includes(user.id)}
                                /></td>
                            <td>{user.name}</td>
                            <td>{user.lastName}</td>
                            <td>{user.idDocument}</td>
                            <td>{user.zoneLocation}</td>
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