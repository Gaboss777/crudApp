import Axios from 'axios';
const apiUrl = 'http://capi.inversionescerecom.com';

const CLIENT_SELECTED = "CLIENT_SELECTED";
const PAYMENT_INFO = "PAYMENT_INFO";

export const getClient = (name) => {
    return dispatch => {
        dispatch({ type: CLIENT_SELECTED, payload: name })
    }
}

export const getPayment = (data) => {
    return dispatch => {
        dispatch({ type: PAYMENT_INFO, payload: data })
    }
}

const initialState = {
    client: [],
    pago: []
}

export const paymentReducer = (state = initialState, { type, payload } ) => {
    switch(type){
        case CLIENT_SELECTED:
            return{
                ...state,
                client: payload
            }
        case PAYMENT_INFO:
            return{
                ...state,
                pago: [...state.pago, payload]
            }
            default:
                return state
    }
}