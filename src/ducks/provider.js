import Axios from 'axios';
import { apiUrl } from './apiUrl'

const CREATE_PROVIDER_REQUEST = 'CREATE_PROVIDER_REQUEST'
const CREATE_PROVIDER_SUCCESS = 'CREATE_PROVIDER_SUCCESS'
const CREATE_PROVIDER_FAILED = 'CREATE_PROVIDER_FAILED'

const CREATE_BILL_REQUEST = 'CREATE_BILL_REQUEST'
const CREATE_BILL_SUCCESS = 'CREATE_BILL_SUCCESS'
const CREATE_BILL_FAILED = 'CREATE_BILL_FAILED'

const LIST_BILLS_REQUEST = 'LIST_BILLS_REQUEST'
const LIST_BILLS_SUCCESS = 'LIST_BILLS_SUCCESS'
const LIST_BILLS_FAILED = 'LIST_BILLS_FAILED'

const LIST_PROVIDERS_REQUEST = 'LIST_PROVIDERS_REQUEST'
const LIST_PROVIDERS_SUCCESS = 'LIST_PROVIDERS_SUCCESS'
const LIST_PROVIDERS_FAILED = 'LIST_PROVIDERS_FAILED'

const PROVIDER_BILLS_REQUEST = 'PROVIDER_BILLS_REQUEST'
const PROVIDER_BILLS_SUCCESS = 'PROVIDER_BILLS_SUCCESS'
const PROVIDER_BILLS_FAILED = 'PROVIDER_BILLS_FAILED'

const BILLS_REMOVE_SUCCESS = 'BILLS_REMOVE_SUCCES'
const PROVIDER_REMOVE_SUCCESS = 'PROVIDER_REMOVE_SUCESS'

export const createProvider = (data) => {
    return dispatch => {
        dispatch({type: CREATE_PROVIDER_REQUEST })
        Axios.post(apiUrl+ '/providers', data)
            .then(res => {
                dispatch({ type: CREATE_PROVIDER_SUCCESS, payload: data})
            })
            .catch(err => {
                dispatch({ type: CREATE_PROVIDER_FAILED, payload: err})
            })
    }
}

export const createBill = (data) => {
    return dispatch => {
        dispatch({type: CREATE_BILL_REQUEST})
        Axios.post(apiUrl+ '/bills', data)
            .then(res => {
                dispatch({ type: CREATE_BILL_SUCCESS, payload: res.data.data})
            })
            .catch(err => {
                dispatch({type: CREATE_BILL_FAILED, payload: err})
            })
    }
}

export const getProviders = () => {
    return dispatch => {
        dispatch({type: LIST_PROVIDERS_REQUEST})
        Axios.get(apiUrl+'/providers')
            .then(res => {
                dispatch({type: LIST_PROVIDERS_SUCCESS, payload: res.data.data })
            })
            .catch(err => {
                dispatch({type: LIST_PROVIDERS_FAILED, payload: err})
            })
    }
}

export const getBills = () => {
    return dispatch => {
        dispatch({type: LIST_BILLS_REQUEST})
        Axios.get(apiUrl+'/bills')
            .then(res => {
                dispatch({type: LIST_BILLS_SUCCESS, payload: res.data.data})
            })
            .catch(err => {
                dispatch({type: LIST_BILLS_FAILED, payload: err})
            })
    }
}

export const getProviderBills =(data)=> {
    return dispatch => {
        dispatch({type: PROVIDER_BILLS_REQUEST})
        Axios.get(apiUrl+`/providers/${data.provider_id}/bills`)
            .then(res => {
                dispatch({type: PROVIDER_BILLS_SUCCESS, payload: res.data})
            })
            .catch(err => {
                dispatch({type: PROVIDER_BILLS_FAILED, payload: err})
            })
    }
}

export const removeBills = (id) => {
    console.log(id)
    return dispatch => {
        Axios.delete(apiUrl + `/bills/${id}`)
            .then(res => {
                dispatch({type: BILLS_REMOVE_SUCCESS, payload: id})
            })
            .catch(err => console.log(err))
    }
}

export const removeProvider = (id) => {
    console.log(id)
    return dispatch => {
        Axios.delete(apiUrl + `/providers/${id}`)
            .then(res => {
                dispatch({type: PROVIDER_REMOVE_SUCCESS, payload: id})
            })
            .catch(err => console.log(err))
    }
}


const initialState ={
    providers: [],
    bills: [],
    loading: false
}


export const providerReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case CREATE_PROVIDER_SUCCESS:
            return {
                ...state,
                providers: [...state.providers, payload]
            }
        case CREATE_BILL_SUCCESS:
            return {
                ...state,
                bills: [...state.bills, payload]
            }
        case LIST_BILLS_SUCCESS:
            return {
                ...state,
                bills: payload
            }
        case LIST_PROVIDERS_SUCCESS:
            return {
                ...state,
                providers: payload
            }
        case PROVIDER_BILLS_SUCCESS:
            return {
                ...state,
                bills: state.bills.filter(x => x.provider_id === payload.provider_id)
            }
        case BILLS_REMOVE_SUCCESS:
            return {
                ...state,
                bills: state.bills.filter(x => x.id !== payload)
            }
        case PROVIDER_REMOVE_SUCCESS:
            return {
                ...state,
                providers: state.providers.filter(p => p.id !== payload)
            }
        default:
            return state
    }
}