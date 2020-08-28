export const actionCreator=(resource)=>{
    return {
        LIST_REQUESTED:resource.toUpperCase()+'_LIST_REQUESTED',
        LIST_SUCCEEDED:resource.toUpperCase()+'_LIST_SUCCEEDED',
        LIST_FAILED:resource.toUpperCase()+'_LIST_FAILED'
    }
}

const initialState={
    list:[],
    loading:false
}

const ACTIONS = actionCreator('user');

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
            }
        default:
            return state
    }
}