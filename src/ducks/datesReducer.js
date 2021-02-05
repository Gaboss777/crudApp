const YEAR_SELECTION = 'YEAR_SELECTION'
const MONTH_SELECTION = 'MONTH_SELECTION'

export const selectedYear = (data) => {
    return dispatch => {
        dispatch({type: YEAR_SELECTION, payload: data})
    }
}

export const selectedMonth = (data) => {
    return dispatch => {
        dispatch({type: MONTH_SELECTION, payload: data})
    }
}

const initialState = {
    year: null,
    month: null
}

export const datesReducer = (state = initialState, { type, payload}) => {
    switch (type) {
        case YEAR_SELECTION:
            return {
                ...state,
                year: payload
            }
        case MONTH_SELECTION:
            return {
                ...state,
                month: payload
            }
        default:
            return state
    }
}