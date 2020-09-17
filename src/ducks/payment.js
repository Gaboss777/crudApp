import Axios from 'axios';
const apiUrl = 'http://capi.inversionescerecom.com';

const CLIENT_SELECTED = "CLIENT_SELECTED";
const PAYMENT_INFO = "PAYMENT_INFO";

export const getClient = (user) => {
    let u = user[0];
    return dispatch => {
        if(u){
            Axios.get(apiUrl + '/users/' + u.id).then(res => {
                dispatch({ type: CLIENT_SELECTED, payload: res.data.data })
            })
        }
        else{
            dispatch({ type: CLIENT_SELECTED, payload: null })
        }
    }
}

export const createPayment = (data) => {
    return dispatch => {
        Axios.post(apiUrl+'/payments',data).then(res=>{
            console.log(res.data.data)
            dispatch({ type: CLIENT_SELECTED, payload: res.data.data })
        })
        .catch(err=>{
            console.log(err)
        })
    }
}

const initialState = {
    client: null,
    pago: []
}

export const paymentReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case CLIENT_SELECTED:
            return {
                ...state,
                client: payload
            }
        case PAYMENT_INFO:
            return {
                ...state,
                pago: [...state.pago, payload]
            }
        default:
            return state
    }
}