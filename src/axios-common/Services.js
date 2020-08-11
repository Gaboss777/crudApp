import http from './http-common';

const getAll =()=> {
    return http.get(`/usersData`)
}

const create=(data)=>{
    return http.post("/usersData", data)
}

const update=(id, data)=>{
    return http.put(`/usersData/${id}`, data)
}

const remove=(id)=> {
    return http.delete(`/usersData/${id}`)
}

const removeAll=()=>{
    return http.delete(`/usersData`)
}

const findData=(data)=>{
    return http.get(`/usersData?idDocument=${data}`)
}

export default {
    getAll,
    create,
    update,
    remove,
    removeAll,
    findData
}