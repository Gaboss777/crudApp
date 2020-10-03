const PROVIDER_ADD = 'PROVIDER_ADD'
const BILL_ADD = 'BILL_ADD'

export const createProvider = (user) => {
    return dispatch => {
        dispatch({ type: PROVIDER_ADD, payload: user})
    }
}

export const createBill = (data) => {
    return dispatch => {
        dispatch({ type: BILL_ADD, payload: data})
    }
}

const initialState ={
    providers: [],
    bills: []
}

export const providerReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case PROVIDER_ADD:
            return {
                ...state,
                providers: [...state.providers, payload]
            }
        case BILL_ADD:
            return {
                ...state,
                bills: [...state.bills, payload]
            }
        default:
            return state
    }
}