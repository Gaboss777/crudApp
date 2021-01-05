import Axios from 'axios';
import { apiUrl } from './apiUrl'

const LIST_EMPLOYIES_REQUEST = 'LIST_EMPLOYIES_REQUEST'
const LIST_EMPLOYIES_SUCCESS = 'LIST_EMPLOYIES_SUCCESS'
const LIST_EMPLOYIES_FAILED = 'LIST_EMPLOYIES_FAILED'

const CREATE_EMPLOYEE_REQUEST = 'CREATE_EMPLOYEE_REQUEST'
const CREATE_EMPLOYEE_SUCCESS = 'CREATE_EMPLOYEE_SUCCESS'
const CREATE_EMPLOYEE_FAILED = 'CREATE_EMPLOYEE_FAILED'

const LIST_OCUPATIONS_REQUEST = 'LIST_OCUPATIONS_REQUEST'
const LIST_OCUPATIONS_SUCCESS = 'LIST_OCUPATIONS_SUCCESS'
const LIST_OCUPATIONS_FAILED = 'LIST_OCUPATIONS_FAILED'

const CREATE_OCUPATION_REQUEST = 'CREATE_OCUPATION_REQUEST'
const CREATE_OCUPATION_SUCCESS = 'CREATE_OCUPATION_SUCCESS'
const CREATE_OCUPATION_FAILED = 'CREATE_OCUPATION_FAILED'

const DELETE_EMPLOYEE_REQUEST = 'DELETE_EMPLOYEE_REQUEST'
const DELETE_EMPLOYEE_SUCCESS = 'DELETE_EMPLOYEE_SUCCESS'
const DELETE_EMPLOYEE_FAILED = 'DELETE_EMPLOYEE_FAILED'

const UPDATE_EMPLOYEE_REQUEST = 'UPDATE_EMPLOYEE_REQUEST'
const UPDATE_EMPLOYEE_SUCCESS = 'UPDATE_EMPLOYEE_SUCCESS'
const UPDATE_EMPLOYEE_FAILED = 'UPDATE_EMPLOYEE_FAILED'

const CREATE_PAYMENT_REQUEST = 'CREATE_PAYMENT_REQUEST'
const CREATE_PAYMENT_SUCCESS = 'CREATE_PAYMENT_SUCCESS'
const CREATE_PAYMENT_FAILED = 'CREATE_PAYMENT_FAILED'

const LIST_SALARIES_REQUEST ='LIST_SALARIES_REQUEST'
const LIST_SALARIES_SUCCESS ='LIST_SALARIES_SUCCESS'

const DELETE_SALARIES = 'DELETE_SALARIES'
const DELETE_OCUPATION = 'DELETE_OCUPATION'

const CHECKED = 'CHECKED'
const UNCHECKED = 'UNCHECKED'
const CLEAR_SELECTED_ROW = 'CLEAR_SELECTED_ROW'

export const getEmployies = () => {
    return dispatch => {
        dispatch({type: LIST_EMPLOYIES_REQUEST})
        Axios.get(apiUrl + '/employees')
            .then(res => {
                dispatch({type: LIST_EMPLOYIES_SUCCESS, payload: res.data.data})
            })
            .catch(err => {
                dispatch({type: LIST_EMPLOYIES_FAILED, payload: err})
            })
    }
}

export const createEmployee = (data) => {
    return dispatch => {
        dispatch({type: CREATE_EMPLOYEE_REQUEST})
        Axios.post(apiUrl + '/employees', data)
        .then(res => {
            dispatch({type: CREATE_EMPLOYEE_SUCCESS, payload: res.data.data})
        })
        .catch(err => {
            dispatch({type: CREATE_EMPLOYEE_FAILED, payload: err})
        })
    }
}

export const createOcupation = (data) => {
    return dispatch => {
        dispatch({type: CREATE_OCUPATION_REQUEST})
        Axios.post(apiUrl + '/occupations', data)
            .then(res => {
                dispatch({type: CREATE_OCUPATION_SUCCESS, payload: res.data.data})
            })
            .catch(err => {
                dispatch({type: CREATE_OCUPATION_FAILED, payload: err})
                console.log(err)
            })
    }
}

export const getOcupationsList = () => {
    return dispatch => {
        dispatch({type: LIST_OCUPATIONS_REQUEST})
        Axios.get(apiUrl + '/occupations')
            .then(res => {
                dispatch({type: LIST_OCUPATIONS_SUCCESS, payload: res.data.data})
            })
            .catch(err => {
                dispatch({type: LIST_OCUPATIONS_FAILED, payload: err})
            })
    }
}

export const deleteEmployee = (selection) => {
    let id = selection.map(s => s.id)
    return dispatch => {
        dispatch({type: DELETE_EMPLOYEE_REQUEST})
        Axios.delete(apiUrl + '/employees', {data: id})
            .then(res => {
                dispatch({type: DELETE_EMPLOYEE_SUCCESS, payload: id})
                console.log(res.data)
            })
            .catch(err => {
                dispatch({type: DELETE_EMPLOYEE_FAILED, payload: err})
            })
    }
}

export const updateEmployee = (user) => {
    return dispatch => {
        dispatch({type: UPDATE_EMPLOYEE_REQUEST})
        Axios.put(apiUrl + `/employees/${user.id}`, user)
            .then(res => {
                dispatch({type: UPDATE_EMPLOYEE_SUCCESS, payload: user})
            })
            .catch(err => {
                dispatch({type: UPDATE_EMPLOYEE_FAILED, payload: err})
                console.log(err.data)
            })
    }
}

export const createPayment = (data) => {
    return dispatch => {
        dispatch({type: CREATE_PAYMENT_REQUEST})
        Axios.post(apiUrl + '/salaries', data)
            .then(res => {
                dispatch({type: CREATE_PAYMENT_SUCCESS, payload: res.data.data})
                console.log(res.data.data)
                console.log(data)
            })
            .catch(err => {
                dispatch({type: CREATE_PAYMENT_FAILED, payload: err})
            })
    }
}

export const getSalaries = () => {
    return dispatch => {
        dispatch({type: LIST_SALARIES_REQUEST})
        Axios.get(apiUrl + '/salaries')
            .then(res  => {
                dispatch({type: LIST_SALARIES_SUCCESS, payload: res.data.data})
            })
            .catch(err => console.log(err))
    }
}

export const removeSalaries = (id) => {
    return dispatch => {
        Axios.delete(apiUrl + `/salaries/${id}`)
            .then(res => {
                dispatch({type: DELETE_SALARIES, payload: id})
            })
            .catch(err => console.log(err))
    }
}

export const removeOcupation = (id) => {
    return dispatch => {
        Axios.delete(apiUrl + `/occupations/${id}`)
            .then(res => {
                dispatch({type: DELETE_OCUPATION, payload: id})
            })
            .catch(err => console.log(err))
    }
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
    employies: [],
    ocupations: [],
    selected: [],
    salaries: [],
    loading: false
}

export const employiesReducer = (state = initialState, { type, payload} ) => {
    switch (type) {
        case LIST_EMPLOYIES_REQUEST:
            return {
                ...state,
                loading: true
            }
        case LIST_EMPLOYIES_SUCCESS:
            return {
                ...state,
                employies: payload,
                loading: false
            }
        case CREATE_EMPLOYEE_SUCCESS:
            return {
                ...state,
                employies: [...state.employies, payload]
            }
        case LIST_OCUPATIONS_SUCCESS:
            return {
                ...state,
                ocupations: payload,
                loading: false
            }
        case CREATE_OCUPATION_SUCCESS:
            return {
                ...state,
                ocupations: [...state.ocupations, payload]
            }
        case DELETE_EMPLOYEE_SUCCESS:
            return {
                ...state,
                employies: state.employies.filter(x => !payload.includes(x.id)),
                selected: initialState.selected
            }
        case UPDATE_EMPLOYEE_SUCCESS:
            return {
                ...state,
                employies: [...state.employies.map(user => user.id === payload.id ? payload : user)],
                selected: initialState.selected
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
                selected: []
            }
        case CREATE_PAYMENT_SUCCESS:
            return {
                ...state,
                salaries: [...state.salaries, payload]
            }
        case LIST_SALARIES_SUCCESS:
            return {
                ...state,
                salaries: payload
            }
        case DELETE_SALARIES:
            return {
                ...state,
                salaries: state.salaries.filter(s => s.id !== payload)
            }
        case DELETE_OCUPATION:
            return {
                ...state,
                ocupations: state.ocupations.filter(o => o.id !== payload)
            }
        default:
            return state
    }
}