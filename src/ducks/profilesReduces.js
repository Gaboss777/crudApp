import Axios from 'axios'
import { apiUrl } from './apiUrl'

const LIST_PROFILES = 'LIST_PROFILES'
const CREATE_PROFILE = 'CREATE_PROFILE'
const UPDATE_PROFILE = 'UPDATE_PROFILE'
const REMOVE_PROFILE = 'REMOVE_PROFILE'

export const getProfiles = () => {
      return dispatch => {
            Axios.get(apiUrl + '/profiles')
            .then(res => {
                  dispatch({type: LIST_PROFILES, payload: res.data.data})
            })
            .catch(err => console.log(err))
      }
}

export const createProfiles = (data) => {
      return dispatch => {
            Axios.post(apiUrl + '/profiles', data)
            .then(res => {
                  dispatch({type: CREATE_PROFILE, payload: data})
            })
            .catch(err => console.log(err))
      }
}

export const updateProfiles = (data) => {
      return dispatch => {
            Axios.put(apiUrl + `/profiles/${data.id}`, data)
            .then(res => {
                  dispatch({type: UPDATE_PROFILE, payload: data})
            })
            .catch(err => console.log(err))
      }
}

export const removeProfiles = (id) => {
      return dispatch => {
            Axios.delete(apiUrl + `/profiles/${id}`)
            .then(res => {
                  dispatch({type: REMOVE_PROFILE, payload: id})
            })
            .catch(err => console.log(err))
      }
}

const initialState = {
      list:[]
}

export const profilesReducer = (state = initialState, {type, payload}) => {
      switch(type){
            case LIST_PROFILES:
                  return {
                        ...state,
                        list: payload
                  }
            case CREATE_PROFILE:
                  return {
                        ...state,
                        list: [...state.list, payload]
                  }
            case UPDATE_PROFILE:
                  return {
                        ...state,
                        list: [state.list.map(x => x.id === payload.id ? payload : x)]
                  }
            case REMOVE_PROFILE:
                  return {
                        ...state,
                        list: state.list.filter(x => !payload.includes(x.id))
                  }
            default:
                  return state
      }
}