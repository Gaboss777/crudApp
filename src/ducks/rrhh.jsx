const ADD_EMPLOYEE = 'ADD_EMPLOYEE'

export const createEmployee = (data) => {
    return dispatch => {
        dispatch({type: ADD_EMPLOYEE, payload: data})
    }
}

const initialState = {
    employies: []
}

export const employiesReducer = (state = initialState, { type, payload} ) => {
    switch (type) {
        case ADD_EMPLOYEE:
            return {
                ...state,
                employies: [...state.employies, payload]
            }
        default:
            return state
    }
}