import Axios from 'axios';
const apiUrl = 'http://localhost:3000';
export const actionCreator=(resource)=>{
    return {
        LIST_REQUESTED:resource.toUpperCase()+'_LIST_REQUESTED',
        LIST_SUCCEEDED:resource.toUpperCase()+'_LIST_SUCCEEDED',
        LIST_FAILED:resource.toUpperCase()+'_LIST_FAILED',
        CREATE_REQUESTED:resource.toUpperCase()+'_CREATE_REQUESTED',
        CREATE_SUCCEEDED:resource.toUpperCase()+'_CREATE_SUCCEEDED',
        CREATE_FAILED:resource.toUpperCase()+'_CREATE_FAILED',
    }
}
const ACTIONS = actionCreator('user');

export const getUserList= ()=>{
    return dispatch =>{
        dispatch({type:ACTIONS.LIST_REQUESTED})
        Axios.get(apiUrl+'/usersData').then(res=>{
            dispatch({type:ACTIONS.LIST_SUCCEEDED,payload:res.data})
        })
        .catch(err=>{
            dispatch({type:ACTIONS.LIST_FAILED,payload:err})
        })
    }
}

export const createUser=(user)=>{
    return dispatch =>{
        dispatch({type:ACTIONS.CREATE_REQUESTED})
        Axios.post(apiUrl+'/usersData',user).then(res=>{
            dispatch({type:ACTIONS.CREATE_SUCCEEDED,payload:res.data})
        })
        .catch(err=>{
            dispatch({type:ACTIONS.CREATE_FAILED})
        })
    }
}



const initialState={
    list:[],
    loading:false
}



export const usersReducer = (state=initialState,{type,payload})=>{
    switch(type){
        case ACTIONS.LIST_REQUESTED:
            return{
                ...state,
                list:[],
                loading:true
            }
        case ACTIONS.LIST_FAILED:
            return{
                ...state,
                list:[],
                loading:false
            }
        case ACTIONS.LIST_SUCCEEDED:
            return{
                ...state,
                list:payload,
                loading:false
            }
        case ACTIONS.CREATE_REQUESTED:
            return{
                ...state,
                loading:false
            }
        case ACTIONS.CREATE_SUCCEEDED:
            return{
                ...state,
                list:[...state.list,payload]
            }
        default:
            return state
    }
}