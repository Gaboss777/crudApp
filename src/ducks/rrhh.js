const LIST_EMPLOYIES_SUCCESS = 'LIST_EMPLOYIES_SUCCESS'

const CREATE_EMPLOYEE_SUCCESS = 'CREATE_EMPLOYEE_SUCCESS'

const CREATE_OCUPATION_SUCCESS = 'CREATE_OCUPATION_SUCCESS'

const DELETE_EMPLOYEE_SUCCESS = 'DELETE_EMPLOYEE_SUCCESS'

const UPDATE_EMPLOYEE_SUCCESS = 'UPDATE_EMPLOYEE_SUCCESS'

const CREATE_PAYMENT = 'CREATE_PAYMENT'

const CHECKED = 'CHECKED'
const UNCHECKED = 'UNCHECKED'

export const getEmployies = () => {
    return dispatch => {
        dispatch({type: LIST_EMPLOYIES_SUCCESS})
    }
}

export const createEmployee = (data) => {
    return dispatch => {
        dispatch({type: CREATE_EMPLOYEE_SUCCESS, payload: data})
    }
}

export const createOcupation = (data) => {
    return dispatch => {
        dispatch({type: CREATE_OCUPATION_SUCCESS, payload: data})
        console.log(data)
    }
}

export const deleteEmployee = (data) => {
    return dispatch => {
        dispatch({type: DELETE_EMPLOYEE_SUCCESS, payload: data})
    }
}

export const updateEmployee = (data) => {
    return dispatch => {
        dispatch({type: UPDATE_EMPLOYEE_SUCCESS, payload: data})
    }
}

export const createPayment = (data) => {
    return dispatch => {
        dispatch({type: CREATE_PAYMENT, payload: data})
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


const initialState = {
    employies: [],
    ocupations: [],
    selected: [],
    payment: []
}

export const employiesReducer = (state = initialState, { type, payload} ) => {
    switch (type) {
        case CREATE_EMPLOYEE_SUCCESS:
            return {
                ...state,
                employies: [...state.employies, payload]
            }
        case CREATE_OCUPATION_SUCCESS:
            return {
                ...state,
                ocupations: [...state.ocupations, payload]
            }
        case DELETE_EMPLOYEE_SUCCESS:
            const users = payload.map(u => u.id)
            return {
                ...state,
                employies: state.employies.filter(x => !users.includes(x.id)),
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
        case CREATE_PAYMENT:
            return {
                ...state,
                payment: [...state.payment, payload]
            }
        default:
            return state
    }
}