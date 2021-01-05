const CREATE_REPORTS  = 'CREATE_REPORTS'

export const createReports = (data) => {
    return dispatch => {
        dispatch({type: CREATE_REPORTS, payload: data})
    }
}

const initialState = {
    reports: []
}

export const reportsReducer = (state = initialState, {type, payload}) => {
    switch (type){
        case CREATE_REPORTS:
            return {
                ...state,
                reports: payload
            }
        default:
            return initialState
    }
}