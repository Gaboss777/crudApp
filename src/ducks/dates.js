const YEAR_SELECTION = 'YEAR_SELECTION'

export const selectedYear = (data) => {
    return dispatch => {
        dispatch({type: YEAR_SELECTION, payload: data})
    }
}

const initialState = {
    year: null
}

export const datesReducer = (state = initialState, { type, payload}) => {
    switch (type) {
        case YEAR_SELECTION:
            console.log(payload)
            return {
                year: payload
            }
        default:
            return state
    }
}