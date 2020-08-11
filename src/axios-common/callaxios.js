
import ServicesData from './Services';

const showApi =({setUsers})=> {
    ServicesData.getAll()
        .then(response => {
            const data = response.data
            setUsers(data)
            console.log(data)
        })
        .catch(err => console.log('Error en datos', err))
}

const createApi = data => {
    ServicesData.create(data)
    .then(response => {
        console.log('Ingresado con exito')
        console.log(response.data);
    })
    .catch(err => console.log('Error al ingresar datos', err))
}


const updateApi =(id, data)=> {
    ServicesData.update(id, data)
    .then(response => {
        const data = response.data
        console.log('Actualziado correctamente')
        console.log(data)
    })
    .catch(err => console.log('Error al actualziar', err))
}

const removeApi = id => {
    ServicesData.remove(id)
    .then(response => {
        console.log('Usuario borrado')
    })
    .catch(err => console.log('Error al eliminar usuario', err))
}

const removeAll = (userList) => {
    ServicesData.removeAll()
        .then(response => {
            console.log('Datos Eliminados')
        })
        .catch(err => console.log('Error al eliminar datos', err))
}

export default {
    createApi,
    updateApi,
    showApi,
    removeApi,
    removeAll
}