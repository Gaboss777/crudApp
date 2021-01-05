import Axios from 'axios'
import { apiUrl } from './apiUrl'
import jwtDecode from 'jwt-decode'

const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS'
const REGISTER_ROLE_SUCCESS = 'REGISTER_ROLE_SUCCESS'
const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS'
const DELETE_USER_SUCCESS = 'DELETE_USER_SUCCESS'
const SET_CURRENT_USER = 'SET_CURRENT_USER'
const ACCOUNTS_LIST = 'ACCOUNTS_LIST'
const ROLES_LIST = 'ROLES_LIST'
const CHECKED = 'CHECKED'
const UNCHECKED = 'UNCHECKED'
const CLEAR_SELECTED_ROW = 'CLEAR_SELECTED_ROW'

export const setToken = (token) => {
    if(token) {
        Axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        Axios.interceptors.response.use(res => res, error=> {
            if(error.response && error.response.status === 403){
                localStorage.removeItem('jwtToken')
                return dispatch => {
                    dispatch({type: SET_CURRENT_USER, payload: {}})
                }
            }
        })
    } else {
        delete Axios.defaults.headers.common['Authorization']
    }
}

export const registerAccount = (data) => {
    return dispatch => {
        Axios.post(apiUrl + '/accounts', data)
            .then(res => {
                dispatch({type: REGISTER_USER_SUCCESS, payload: res.data.data})
            })
            .catch(err => console.log(err))
    }
}

export const updateAccount = (data) => {
    let id = data.id
    return dispatch => {
        Axios.put(apiUrl + `/accounts/${id}`, data)
            .then(res => {
                dispatch({type: UPDATE_USER_SUCCESS, payload: res.data.data})
            })
            .catch(err => console.log(err))
    }
}

export const removeAccount = (id) => {
    return dispatch => {
        Axios.delete(apiUrl + `/accounts/${id}`, )
            .then(res => {
                console.log(res.data.data)
                dispatch({type: DELETE_USER_SUCCESS, payload: id})
            })
            .catch(err => console.log(err))
    }
}

export const getAccountsList = () =>{ 
    return dispatch => {
        Axios.get(apiUrl + '/accounts')
            .then(res => {
                dispatch({type: ACCOUNTS_LIST, payload: res.data.data})
            })
            .catch(err => console.log(err))
    }
}

export const login = (username, password) => {
    return dispatch => {
        return Axios.post(apiUrl + '/logins', {username, password})
            .then(res => {
                const token = res.data.jwt
                localStorage.setItem('jwtToken', token)
                setToken(token)
                dispatch({type: SET_CURRENT_USER, payload: jwtDecode(token)})
            })
            .catch(err => console.log(err))
    }
}

export const logout = () => {
    return dispatch => {
        localStorage.removeItem('jwtToken')
        setToken(false)
        dispatch({type: SET_CURRENT_USER, payload: {}})
    }
}

export const getToken = () => {
    return localStorage.getItem('jwtToken')
}

export const selectRow = (e, user) => {
    if (e) {
        return dispatch => {
            dispatch({ type: CHECKED, payload: user })
        }
    } else {
        return dispatch => {
            dispatch({ type: UNCHECKED, payload: user })
        }
    }
}

export const clearSelectedRow = () => {
    return dispatch => {
        dispatch({type: CLEAR_SELECTED_ROW})
    }
}

const initialState = {
    isAuthenticated: false,
    user: {},
    accounts: [],
    roles: [],
    selected: []
}

export const authReducer = ( state = initialState, { type, payload}) => {
    switch(type){
        case SET_CURRENT_USER:
            return {
                ...state,
                isAuthenticated: Object.keys(payload).length>0,
                user: payload.data
            }
        case REGISTER_USER_SUCCESS:
            return {
                ...state,
                accounts: [...state.accounts, payload]
            }
        case UPDATE_USER_SUCCESS:
            return {
                ...state,
                accounts: [...state.accounts.map(x => x.id === payload.id ? payload : x)],
                selected: initialState.selected
            }
        case DELETE_USER_SUCCESS:
            return {
                ...state,
                accounts: state.accounts.filter(acc => acc.id !== payload),
                selected: initialState.selected
            }
        case ACCOUNTS_LIST:
            return {
                ...state,
                accounts: payload
            }
        case CHECKED:
            return {
                ...state,
                selected: [...state.selected, payload]
            }
        case UNCHECKED:
            return {
                ...state,
                selected: [...state.selected.filter(x => x.id !== payload.id)]
            }
        case CLEAR_SELECTED_ROW:
            return {
                ...state,
                selected: initialState.selected
            }
        default:
            return state
    }
}