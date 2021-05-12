import axios from 'axios'
import { useHistory } from 'react-router-dom'

export const FETCH_USER = 'FETCH_USER'
export const FETCHING_ERROR = 'FETCHING_ERROR'

export const getUser = userName => dispatch => {
    const {push} = useHistory()

    axios
        .get(`https://api.github.com/users/${userName}`)
        .then( res => {
            dispatch({ type: FETCH_USER, payload: res.data})
        })
        .catch( err => {
            dispatch({ type: FETCHING_ERROR, payload: err.message})
            push('/NotFound')
            
        })
}
