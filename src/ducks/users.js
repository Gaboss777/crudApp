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
        CHECKED:resource.toUpperCase()+'_CHECKED',
        DELETE_REQUESTED:resource.toUpperCase()+'_DELETE_REQUESTED',
        DELETE_SUCCEEDED:resource.toUpperCase()+'_DELETE_SUCCEEDED',
        DELETE_FAILED:resource.toUpperCase()+'_DELETE_FAILED',
        UPDATE_REQUESTED:resource.toUpperCase()+'_UPDATE_REQUESTED',
        UPDATE_SUCCEEDED:resource.toUpperCase()+'_UPDATE_SUCCEEDED',
        UPDATE_FAILED:resource.toUpperCase()+'_UPDATE_FAILED',
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
            dispatch({type:ACTIONS.CREATE_FAILED, payload:err})
        })
    }
}

export const removeUser=(id)=>{
    return dispatch=>{
        dispatch({type:ACTIONS.DELETE_REQUESTED})
        Axios.delete(apiUrl+`/usersData/${id}`).then(res=>{
            console.log(res.data)
            dispatch({type:ACTIONS.DELETE_SUCCEEDED,payload:id})
        })
        .catch(err=>{
            dispatch({type:ACTIONS.DELETE_FAILED, payload:err})
        })
    }
}

export const updateUser=(id, user)=>{
    return dispatch=>{
        dispatch({type:ACTIONS.UPDATE_REQUESTED})
        Axios.put(apiUrl+`/usersData/${id}`, user).then(res=>{
            dispatch({type:ACTIONS.UPDATE_SUCCEEDED,payload: res.data})
        })
        .catch(err=>{
            dispatch({type:ACTIONS.UPDATE_FAILED, payload:err})
        })
    }
}

export const selectRow =(e, user)=>{
    if(e) {
        return dispatch =>{
            dispatch({type:ACTIONS.CHECKED, payload: user})
        }
    } else {
        return dispatch =>{
            dispatch({type:ACTIONS.CHECKED, payload: null})
        }
    }
}


const initialState={
    list:[],
    selected: null,
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
        case ACTIONS.DELETE_REQUESTED:
            return{
                ...state,
                loading:true
            }
        case ACTIONS.DELETE_SUCCEEDED:
            return{
                ...state,
                list: state.list.filter(user => user.id !== payload),
                loading: false,
                selected: null
            }
        case ACTIONS.UPDATE_REQUESTED:
            return{
                ...state,
                loading: true
            }
        case ACTIONS.UPDATE_SUCCEEDED:
            return{
                ...state,
                list: state.list.map(user => user.id === payload.id ? payload: user),
                loading: false,
                selected: null
            }
        case ACTIONS.CHECKED:
            return{
                ...state,
                selected: payload
            }
        default:
            return state
    }
}