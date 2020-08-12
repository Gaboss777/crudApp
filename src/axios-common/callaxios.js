
import ServicesData from './Services';

const getApi=({setUsers})=> {
    ServicesData.getAll()
        .then(response => {
            setUsers(response.data)
            console.log(response.data)
        })
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

export default {
    getApi,
    createApi,
    updateApi,
    removeApi,
}