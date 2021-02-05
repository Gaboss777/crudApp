import Axios from 'axios';
import { apiUrl } from './apiUrl'

const SELLERS_LIST = 'SELLERS_LIST'
const CREATE_SELLER ='CREATE_SELLER'
const SELLER_SELECTED = 'SELLER_SELECTED'
const REMOVE_SELLER = 'REMOVE_SELLER'
const PAYMENT_SELLER = 'PAYMENT_SELLER'
const SELLS_LIST = 'SELLS_LIST'
const REMOVE_SELL = 'REMOVE_SELL'
const VALIDATION_SELL = 'VALIDATION_SELL'
const UPDATE_SELLER = 'UPDATE_SELLER'

export const getSellUsersList = () => {
    return dispatch => {
        Axios.get(apiUrl + '/sellers')
            .then(res => {
                dispatch({type: SELLERS_LIST, payload: res.data.data})
            })
            .catch(err => console.log(err))
    }
}

export const createSellUser = (user) => {
    return dispatch => {
        Axios.post(apiUrl + '/sellers', user)
            .then(res => {
                dispatch({type: CREATE_SELLER, payload: user})
            })
            .catch(err => console.log(err))
    }
}

export const updateSellUser = (user) => {
    return dispatch => {
        Axios.put(apiUrl + `/sellers/${user.id}`, user)
            .then(res => {
                dispatch({type: UPDATE_SELLER, payload: user})
            })
            .catch(err => console.log(err))
    }
}

export const removeSellUser = (user) => {
    return dispatch => {
        Axios.delete(apiUrl + `/sellers/${user}`)
            .then(res => {
                dispatch({type: REMOVE_SELLER, payload: user})
            })
            .catch(err => console.log(err))
    }
}

export const createSell = (data) => {
    return dispatch => {
        Axios.post(apiUrl + '/sells', data)
            .then(res => {
                dispatch({type: PAYMENT_SELLER, payload: data})
            })
            .catch(err => console.log(err))
    }
}

export const validationSell = (data) => {
    return dispatch => {
        Axios.put(apiUrl + `/sells/${data.id}`, data)
            .then(res => {
                dispatch({type: VALIDATION_SELL, payload: data})
            })
            .catch(err => console.log(err))
    }
}

export const getSellsList = () => {
    return dispatch => {
        Axios.get(apiUrl + '/sells')
            .then(res => {
                dispatch({type: SELLS_LIST, payload: res.data.data})
            })
            .catch(err => console.log(err))
    }
}

export const removeSell = (id) => {
    return dispatch => {
        Axios.delete(apiUrl + `/sells/${id}`)
            .then(res => {
                dispatch({type: REMOVE_SELL, payload: id})
            })
            .catch(err => console.log(err))
    }
}

export const selectedSellUser = (user) => {
    let u = user[0]
    console.log(u)
    return dispatch => {
        if(u) {
            dispatch({type: SELLER_SELECTED, payload: u})
        } else {
            dispatch({type: SELLER_SELECTED, payload: null})
        }
    }
}

const initialState = {
    list: [],
    selected: null,
    sells: []
}

export const sellerReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case SELLERS_LIST:
            return {
                ...state,
                list: payload
            }
        case CREATE_SELLER:
            return {
                ...state,
                list: [...state.list, payload]
            }
        case REMOVE_SELLER:
            return {
                ...state,
                list: state.list.filter(s => s.id !== payload)
            }
        case SELLER_SELECTED:
            return {
                ...state,
                selected: payload
            }
        case SELLS_LIST:
            return {
                ...state,
                sells: payload
            }
        case PAYMENT_SELLER:
            return {
                ...state,
                sells: [...state.sells, payload]
            }
        case REMOVE_SELL:
            return {
                ...state,
                sells: state.sells.filter(p => p.id !== payload)
            }
        case VALIDATION_SELL:
            return {
                ...state,
                sells: state.sells.map(sell => sell.id === payload.id ? payload : sell)
            }
        case UPDATE_SELLER:
            return {
                ...state,
                list: state.list.map(x => x.id === payload.id ? payload : x)
            }
        default:
            return state
    }
}