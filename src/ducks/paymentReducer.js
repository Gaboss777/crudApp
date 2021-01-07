import Axios from 'axios';
import { apiUrl } from './apiUrl';

const CLIENT_SELECTED = "CLIENT_SELECTED";
const PAYMENT_LIST = 'PAYMENT_LIST';
const CREATE_PAYMENT = "CREATE_PAYMENT";
const UPDATE_PAYMENT = 'UPDATE_PAYMENT'
const FILE_UPLOAD = "FILE_UPLOAD";
const FILES_LIST = "FILES_LIST";
const PAYMENT_REMOVE = "PAYMENT_REMOVE"

export const getClient = (user) => {
    let u = user[0];
    return dispatch => {
        if(u){
            dispatch({type: CLIENT_SELECTED, payload: u})
        }
        else{
            dispatch({ type: CLIENT_SELECTED, payload: null })
        }
    }
}

export const getPayments = () => {
    return dispatch => {
        Axios.get(apiUrl + '/payments' )
            .then(res => {
                dispatch({type: PAYMENT_LIST, payload: res.data.data})
            })
            .catch(err => console.log(err))
    }
}

export const createPayment = (data) => {
    return dispatch => {
        Axios.post(apiUrl+'/payments',data)
        .then(res=>{
            dispatch({ type: CREATE_PAYMENT, payload: data })
            console.log(res.data.data)
            console.log(data)
        })
        .catch(err=>{
            console.log(err)
        })
    }
}

export const uploadFile = (data) => {
    return dispatch => {
        Axios.post(apiUrl + '/files', data)
        .then(res => {
            dispatch({type: FILE_UPLOAD, payload: res.data.data})
        })
        .catch(err => console.log(err))
    }
}

export const getFiles = () => {
    return dispatch => {
        Axios.get(apiUrl + '/files')
            .then(res => {
                dispatch({type: FILES_LIST, payload: res.data.data})
            })
            .catch(err => console.log(err))
    }
}

export const removePayment = (id) => {
    return dispatch => {
        Axios.delete(apiUrl + `/payments/${id}`)
            .then(res => {
                dispatch({type: PAYMENT_REMOVE, payload: id})
            })
            .catch(err => console.log(err))
    }
}

export const updatePayment = (data) => {
    return dispatch => {
        Axios.put(apiUrl + `/payments/${data.id}`, data)
            .then(res => {
                dispatch({type: UPDATE_PAYMENT, payload: data})
            })
            .catch(err => console.log(err))
    }
}

const initialState = {
    client: null,
    payments: [],
    files: []
}

export const paymentReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case CLIENT_SELECTED:
            return {
                ...state,
                client: payload
            }
        case PAYMENT_LIST:
            return {
                ...state,
                payments: payload
            }
        case CREATE_PAYMENT:
            return {
                ...state,
                payments: [...state.payments, payload]
            }
        case FILE_UPLOAD:
            return {
                ...state,
                files: [...state.files, payload]
            }
        case FILES_LIST:
            return {
                ...state,
                files: payload
            }
        case PAYMENT_REMOVE:
            return {
                ...state,
                payments: state.payments.filter(p => p.id !== payload)
            }
        case UPDATE_PAYMENT:
            return {
                ...state,
                payments: state.payments.map(p => p.id === payload.id ? payload : p)
            }
        default:
            return state
    }
}