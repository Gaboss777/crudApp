import Axios from 'axios';
import { apiUrl } from './apiUrl'

export const actionCreator = (resource) => {
    return {
        LIST_REQUESTED: resource.toUpperCase() + '_LIST_REQUESTED',
        LIST_SUCCEEDED: resource.toUpperCase() + '_LIST_SUCCEEDED',
        LIST_FAILED: resource.toUpperCase() + '_LIST_FAILED',
        CREATE_REQUESTED: resource.toUpperCase() + '_CREATE_REQUESTED',
        CREATE_SUCCEEDED: resource.toUpperCase() + '_CREATE_SUCCEEDED',
        CREATE_FAILED: resource.toUpperCase() + '_CREATE_FAILED',
        CHECKED: resource.toUpperCase() + '_CHECKED',
        UNCHECKED: resource.toUpperCase() + '_UNCHECKED',
        DELETE_REQUESTED: resource.toUpperCase() + '_DELETE_REQUESTED',
        DELETE_SUCCEEDED: resource.toUpperCase() + '_DELETE_SUCCEEDED',
        DELETE_FAILED: resource.toUpperCase() + '_DELETE_FAILED',
        UPDATE_REQUESTED: resource.toUpperCase() + '_UPDATE_REQUESTED',
        UPDATE_SUCCEEDED: resource.toUpperCase() + '_UPDATE_SUCCEEDED',
        UPDATE_FAILED: resource.toUpperCase() + '_UPDATE_FAILED',
    }
}

const ACTIONS = actionCreator('user');
const CLEAR_SELECTED_ROW = 'CLEAR_SELECTED_ROW'

export const getUserList = () => {
    return dispatch => {
        dispatch({ type: ACTIONS.LIST_REQUESTED })
        Axios.get(apiUrl + '/users')
            .then(res => {
                dispatch({ type: ACTIONS.LIST_SUCCEEDED, payload: res.data.data })
            })
            .catch(err => {
                dispatch({ type: ACTIONS.LIST_FAILED, payload: err })
            })
    }
}

export const createUser = (user) => {
    return dispatch => {
        dispatch({ type: ACTIONS.CREATE_REQUESTED })
        Axios.post(apiUrl + '/users', user).then(res => {

            dispatch({ type: ACTIONS.CREATE_SUCCEEDED, payload: res.data.data })
        })
            .catch(err => {

                dispatch({ type: ACTIONS.CREATE_FAILED, payload: err })
            })
    }
}

export const removeUser = (selection) => {
    let id = selection.map(s => s.id)
    return dispatch => {
        dispatch({ type: ACTIONS.DELETE_REQUESTED })
        Axios.delete(apiUrl + '/users', { data: id }).then(res => {
            dispatch({ type: ACTIONS.DELETE_SUCCEEDED, payload: id })
        })
            .catch(err => {
                dispatch({ type: ACTIONS.DELETE_FAILED, payload: err.response })
            })
    }
}

export const updateUser = (user) => {
    console.log(user)
    return dispatch => {
        dispatch({ type: ACTIONS.UPDATE_REQUESTED })
        Axios.put(apiUrl + `/users/${user.id}`, user).then(res => {
            dispatch({ type: ACTIONS.UPDATE_SUCCEEDED, payload: res.data.data })
        })
            .catch(err => {
                console.log(err)
                dispatch({ type: ACTIONS.UPDATE_FAILED, payload: err })
            })
    }
}

export const selectRow = (e, user) => {
    if (e) {
        return dispatch => {
            dispatch({ type: ACTIONS.CHECKED, payload: user })
        }
    } else {
        return dispatch => {
            dispatch({ type: ACTIONS.UNCHECKED, payload: user })
        }
    }
}

export const clearSelectedRow = () => {
    return dispatch => {
        dispatch({type: CLEAR_SELECTED_ROW})
    }
}

const initialState = {
    list: [],
    selected: [],
    loading: false
}



export const usersReducer = (state = initialState, { type, payload }) => {
    switch (type) {

        case ACTIONS.LIST_REQUESTED:
            return {
                ...state,
                loading: true
            }
        case ACTIONS.LIST_FAILED:
            return {
                ...state,
                list: [],
                loading: false
            }
        case ACTIONS.LIST_SUCCEEDED:
            return {
                ...state,
                list: payload,
                loading: false
            }
        case ACTIONS.CREATE_REQUESTED:
            return {
                ...state,
                loading: false
            }
        case ACTIONS.CREATE_SUCCEEDED:
            return {
                ...state,
                list: [...state.list, payload]
            }
        case ACTIONS.DELETE_REQUESTED:
            return {
                ...state,
            }
        case ACTIONS.DELETE_SUCCEEDED:
            return {
                ...state,
                list: state.list.filter(user =>!payload.includes(user.id)),
                loading: false,
                selected: initialState.selected
            }
        case ACTIONS.UPDATE_REQUESTED:
            return {
                ...state,
            }
        case ACTIONS.UPDATE_SUCCEEDED:
            return {
                ...state,
                list: [...state.list.map(user => user.id === payload.id ? payload : user)],
                loading: false,
                selected: initialState.selected
            }
        case ACTIONS.CHECKED:
            return {
                ...state,
                selected: [...state.selected, payload]
            }
        case ACTIONS.UNCHECKED:
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