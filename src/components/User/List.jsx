import React from 'react';
import { Table, FormCheck } from 'react-bootstrap';
import { connect } from 'react-redux';
import { useEffect } from 'react';
import { getUserList, setSelectedusers } from '../../ducks/users';
import { useState } from 'react';
export const UserList = ({ list, getUserList,selectUsers }) => {
    const [selectedUsers, setSelectedUsers] = useState([]);
    useEffect(() => {
        getUserList()
    }, [])

    const handleUserSelection = (e, user) => {
        if (e.target.checked) {
            if (user === 'ALL') {
                list.forEach(u => selectedUsers.push(u.id));
                setSelectedUsers([...selectedUsers])
            }
            else {
               setSelectedUsers([...selectedUsers,user])
            }
            selectUsers(selectedUsers)
        }
        else{
            setSelectedUsers([])
            selectUsers([])
        }
    }

    if (list) {
        return (
            <Table>
                <thead>
                    <tr>
                        <th><FormCheck title='aa' onChange={(e) => handleUserSelection(e, 'ALL')} /> </th>
                        <th>ID</th>
                        <th>Razon Social</th>
                        <th>CI/RIF</th>
                        <th>Ubicacion</th>
                        <th>Servicio</th>
                        <th>Ancho de Banda</th>
                        <th>Direccion IP</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        list.map((user, key) => (
                            <tr>
                                <th><FormCheck title='aa' checked={selectedUsers.includes(user.id)} onChange={(e) => handleUserSelection(e, user.id)} /></th>
                                <th>{user.id}</th>
                                <th>{user.razonSocial}</th>
                                <th>{user.idDocument}</th>
                                <th>{user.zoneLocation}</th>
                                <th>{user.services}</th>
                                <th>{user.bandwidth}</th>
                                <th>{user.ipAddress}</th>
                                <th>{user.estado}</th>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>
        )
    }
    else return null;
}

const MSTP = state => (
    {
        list: state.users.list
    }
)

const MDTP = dispatch => (
    {
        getUserList: () => dispatch(getUserList()),
        selectUsers:(users)=>dispatch(setSelectedusers(users))
    }
)

export default connect(MSTP, MDTP)(UserList)