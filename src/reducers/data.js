import {FETCH_USER, FETCHING_ERROR} from '../actions/actions'

export const initialState = {
    user: {},
    error: ''
}

export const userDataReducer = (state = initialState, action) => {
    console.log(state.user)

    switch(action.type){
        case FETCH_USER:
            return {
                ...state,
                user: action.payload
            }
        case FETCHING_ERROR:
            return {
                ...state,
                error: action.payload
            }
        default:
            return state
    }
}

