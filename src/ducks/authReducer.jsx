import Axios from 'axios'
import { apiUrl } from './apiUrl'
import jwtDecode from 'jwt-decode'

const ACCOUNTS_LIST = 'ACCOUNTS_LIST'
const ACCOUNT_REGISTER_SUCCESS = 'ACCOUNT_REGISTER_SUCCESS'
const ACCOUNT_UPDATE_SUCCESS = 'ACCOUNT_UPDATE_SUCCESS'
const ACCOUNT_DELETE_SUCCESS = 'ACCOUNT_DELETE_SUCCESS'

const PROFILES_LIST = 'PROFILES_LIST'
const PROFILE_REGISTER_SUCCESS = 'PROFILE_REGISTER_SUCCESS'
const PROFILE_UPDATE_SUCCESS = 'PROFILE_UPDATE_SUCCESS'
const PROFILE_DELETE_SUCCESS = 'PROFILE_DELETE_SUCCESS'

const LOGIN_CURRENT_USER = 'LOGIN_CURRENT_USER'
const LOGOUT_CURRENT_USER = 'LOGOUT_CURRENT_USER'

const CHECKED = 'CHECKED'
const UNCHECKED = 'UNCHECKED'
const CLEAR_SELECTED_ROW = 'CLEAR_SELECTED_ROW'

/* ACCESS SESSION && TOKEN */
export const setToken = (token) => {
    if(token) {
        Axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        Axios.interceptors.response.use(res => res, error=> {
            if(error.response && error.response.status === 403){
                localStorage.removeItem('jwtToken')
                return dispatch => {
                    dispatch({type: LOGIN_CURRENT_USER, payload: {}})
                }
            }
        })
    } else {
        delete Axios.defaults.headers.common['Authorization']
    }
}

export const login = (username, password) => {
    return dispatch => {
        return Axios.post(apiUrl + '/logins', {username, password})
            .then(res => {
                const token = res.data.jwt
                localStorage.setItem('jwtToken', token)
                setToken(token)
                dispatch({type: LOGIN_CURRENT_USER, payload: jwtDecode(token)})
            })
            .catch(err => console.log(err))
    }
}

export const logout = () => {
    return dispatch => {
        localStorage.removeItem('jwtToken')
        setToken(false)
        dispatch({type: LOGOUT_CURRENT_USER, payload: {}})
    }
}

export const getToken = () => {
    return localStorage.getItem('jwtToken')
}

/* ACCOUNTS */
export const registerAccount = (data) => {
    return dispatch => {
        Axios.post(apiUrl + '/accounts', data)
            .then(res => {
                dispatch({type: ACCOUNT_REGISTER_SUCCESS, payload: res.data.data})
            })
            .catch(err => console.log(err))
    }
}

export const updateAccount = (data) => {
    return dispatch => {
        Axios.put(apiUrl + `/accounts/${data.id}`, data)
            .then(res => {
                dispatch({type: ACCOUNT_UPDATE_SUCCESS, payload: res.data.data})
                console.log(res.data)
            })
            .catch(err => console.log(err))
    }
}

export const removeAccount = (id) => {
    return dispatch => {
        Axios.delete(apiUrl + `/accounts/${id}`, )
            .then(res => {
                console.log(res.data.data)
                dispatch({type: ACCOUNT_DELETE_SUCCESS, payload: id})
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

/* RULES && PROFILES */

export const getProfilesList = () => {
    return dispatch => {
        Axios.get(apiUrl + '/profiles')
            .then(res => {
                dispatch({type: PROFILES_LIST, payload: res.data.data})
            })
            .catch(err => console.log(err))
    }
}

export const registerProfile =(data) => {
    return dispatch => {
        Axios.post(apiUrl + '/profiles', data)
            .then(res => {
                dispatch({type: PROFILE_REGISTER_SUCCESS, payload: res.data.data})
            })
            .catch(err => console.log(err))
    }
}

export const updateProfile = (data) => {
    return dispatch => {
        Axios.put(apiUrl + `/profiles/${data.id}`, data)
            .then(res => {
                dispatch({type: PROFILE_UPDATE_SUCCESS, payload: res.data.data})
            })
            .catch(err => console.log(err))
    }
}

export const removeProfiles = (id) => {
    return dispatch => {
        Axios.delete(apiUrl + `/profiles/${id}`)
            .then(res => {
                dispatch({type: PROFILE_DELETE_SUCCESS, payload: id})
            })
            .catch(err => console.log(err))
    }
}

/* SELECTIONS */
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
    profiles: [],
    selected: []
}

export const authReducer = ( state = initialState, { type, payload}) => {
    switch(type){
        case LOGIN_CURRENT_USER:
            return {
                ...state,
                isAuthenticated: true,
                user: payload.data
            }
        case LOGOUT_CURRENT_USER:
            return {
                ...state,
                isAuthenticated: false,
                user: payload
            }
        case ACCOUNT_REGISTER_SUCCESS:
            return {
                ...state,
                accounts: [...state.accounts, payload]
            }
        case ACCOUNT_UPDATE_SUCCESS:
            return {
                ...state,
                accounts: [...state.accounts.map(x => x.id === payload.id ? payload : x)],
                selected: initialState.selected
            }
        case ACCOUNT_DELETE_SUCCESS:
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