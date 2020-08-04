import {useState} from 'react';

export const CrudFunction =()=> {
    const userData = []

    const initialFormState = { id: null, name:'', lastName:'', idDocument:'', zoneLocation:''}
    const [users, setUsers] = useState(userData)
    const [edit, setEdit] = useState(false)
    const [userActual, setUserActual] = useState(initialFormState)

    const addUser = (user) => {
        user.id = users.length + 1
        setUsers([...users, user])
    }

    const deleteUser = (id) => {
        setUsers(users.filter((user) => user.id !== id))
    }

    const editRow = (user) => {
        setEdit(true)
        setUserActual({id: user.id, name: user.name, lastName: user.lastName, idDocument: user.idDocument, zoneLocation: user.zoneLocation})
    }

    const updateUser = (id, updateUser) => {
        setEdit(false)
        setUsers(users.map((user) => (user.id === id ? updateUser : user)))
    }

    return { users, edit, setEdit, userActual, addUser, deleteUser, editRow, updateUser }
}

export const AddUser = ({addUser}) => {
    const initialFormState = { id: null, name:'', lastName:'', idDocument:'', zoneLocation:''}
    const [user, setUser] = useState(initialFormState)

    const handleInputChange = event => {
        const {name, value} = event.target
        setUser({...user, [name]: value})
    }

    const handleSubmit = event => {
        event.preventDefault()
        if (!user.name || !user.lastName || !user.idDocument || !user.zoneLocation) return

        addUser(user)
        setUser(initialFormState)
    }

    return { user, handleInputChange, handleSubmit }
}

export const EditUser = (userActual) => {
    const [user, setUser] = useState(userActual)

    const handleInputChange = event => {
        const {name, value} = event.target
        setUser({...user, [name]: value})
    }

    const handleSubmit = ({event, updateUser}) => {
        event.preventDefault()
        updateUser(user.id, user)
    }

    return { user, handleInputChange, handleSubmit }
}