import React, { useState, Fragment } from 'react'
import UsersActions from '../Actions/UsersActions'
import UsersList from '../users/List'

export const UsersView = () => {
    const [criteria, setCriteria] = useState('')

    return (
    <Fragment>
        <h1 className='text-center text-white py-2 bg-warning title-section'>CLIENTES</h1>
        <UsersActions criteria={criteria} serCriteria={setCriteria} />
        <UsersList criteria={criteria} />
    </Fragment>
    )
}