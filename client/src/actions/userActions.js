import axios from 'axios';


import { GET_USERS, GET_ERRORS } from './types'; // + GET_FRIENDS 

// USERS - Get all users
export const getUsers = () => dispatch => { 
    axios
        .get('/api/users')
        .then(res => dispatch({
            type: GET_USERS,
            payload: res.data
        }))
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }))
}