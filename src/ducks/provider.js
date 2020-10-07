import Axios from 'axios';
const apiUrl = 'http://capi.inversionescerecom.com';

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
        Axios.post(apiUrl+ `/providers/:${data.provider_id}/bills`, data)
            .then(res => {
                dispatch({ type: CREATE_BILL_SUCCESS, payload: data})
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
                dispatch({type: LIST_PROVIDERS_SUCCESS, payload: res.data })
                console.log(res.data)
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
                dispatch({type: LIST_BILLS_SUCCESS, payload: res.data})
            })
            .catch(err => {
                dispatch({type: LIST_BILLS_FAILED, payload: err})
            })
    }
}

export const getProviderBills =(data)=> {
    return dispatch => {
        dispatch({type: PROVIDER_BILLS_REQUEST})
        Axios.get(apiUrl+`/provider/:${data.provider_id}/bills`)
            .then(res => {
                dispatch({type: PROVIDER_BILLS_SUCCESS, payload: res.data})
            })
            .catch(err => {
                dispatch({type: PROVIDER_BILLS_FAILED, payload: err})
            })
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
        default:
            return state
    }
}