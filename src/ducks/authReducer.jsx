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
    } else {
        delete Axios.defaults.headers.common['Authorization']
    }
}

export const registerAccount = (data) => {
    return dispatch => {
        Axios.post(apiUrl + '/accounts', data)
            .then(res => {
                dispatch({type: REGISTER_USER_SUCCESS, payload: data})
            })
            .catch(err => console.log(err))
    }
}

export const updateAccount = (data) => {
    return dispatch => {
        Axios.put(apiUrl + `/accounts/${data.id}`, data)
            .then(res => {
                dispatch({type: UPDATE_USER_SUCCESS, payload: data})
            })
            .catch(err => console.log(err))
    }
}

export const removeAccount = (data) => {
    let id = data.map(x => x.id)
    return dispatch => {
        Axios.delete(apiUrl + '/accounts', {data: id})
            .then(res => {
                dispatch({type: DELETE_USER_SUCCESS, payload: id})
            })
            .catch(err => console.log(err))
    }
}

export const registerRole = (data) => {
    return dispatch => {
        Axios.post(apiUrl + '/roles', data)
         .then(res => {
             dispatch({type: REGISTER_ROLE_SUCCESS, payload: data})
         })
         .catch(err => console.log(err))
    }
}

export const getRolesList = () =>{
    return dispatch => {
        Axios.get(apiUrl + '/roles')
            .then(res => {
                dispatch({type: ROLES_LIST, payload: res.data.data})
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
        Axios.post(apiUrl + '/login', {username, password})
            .then(res => {
                const token = res.data.jwt;
                console.log(token);
                localStorage.setItem('jwtToken', token)
                setToken(token)
                dispatch({type: SET_CURRENT_USER, payload: jwtDecode(token)})
               
            })
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
                isAuthenticated: !!(Object.keys(payload).length),
                user: payload
            }
        case REGISTER_USER_SUCCESS:
            return {
                ...state,
                accounts: [...state.accounts, payload]
            }
        case REGISTER_ROLE_SUCCESS:
            return {
                ...state,
                roles: [...state.roles, payload]
            }
        case UPDATE_USER_SUCCESS:
            return {
                ...state,
                accounts: [...state.accounts.map(x => x.id === payload.id ? payload : x)]
            }
        case DELETE_USER_SUCCESS:
            return {
                ...state,
                accounts: state.accounts.filter(acc => !payload.includes(acc.id))
            }
        case ACCOUNTS_LIST:
            return {
                ...state,
                accounts: payload
            }
        case ROLES_LIST:
            return {
                ...state,
                roles: payload
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