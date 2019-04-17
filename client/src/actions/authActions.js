import axios from 'axios';
import jwt_decode from 'jwt-decode';
import setAuthToken from '../utils/setAuthToken';

import { GET_ERRORS, SET_CURRENT_USER, USER_LOADING, GET_SUCCESS, CLEAR_ERRORS, CLEAR_SUCCESS } from './types';

// REGISTER - Register new user on snakker
export const registerUser = (userData, history) => dispatch => {
    axios
        .post('/api/users/register', userData)
        .then(res => history.push('/login')) // Redirect successful registration to login
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        })
};

// LOGIN - Login user and get TOKEN
export const loginUser = (userData) => dispatch => {
    axios
        .post('/api/users/login', userData)
        .then(res => {            
            // Save to localstorage
            // Set token (LS)
            const { token } = res.data;
            localStorage.setItem('jwtToken', token);

            // set token to authHeader
            setAuthToken(token);

            // Decode token to get userData
            const decoded = jwt_decode(token);

            // Set current user
            dispatch(setCurrentUser(decoded))
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        })
}

// PASSWORD RESET - SEND EMAIL WITH LINK
export const SendRetrieveLink = (userData) => dispatch => {
    axios
        .post('/api/users/retrieve', userData)
        .then(res => {
            if(res.data.success === true) {
                dispatch({
                    type: GET_SUCCESS,
                    payload: res.data
                })
                dispatch({
                    type: CLEAR_ERRORS,
                    payload: res.data
                })
            }
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
            dispatch({
                type: CLEAR_SUCCESS,
                payload: err.response.data
            })
        })
}

// PASSWORD RESET - RESET PASSWORD
export const resetPass = (token, userData) => dispatch => {
    axios
        .post(`/api/users/retrieve/${token}`, {userData})
        .then(res => {
            if(res.data.success === true) {
                dispatch({
                    type: GET_SUCCESS,
                    payload: res.data
                })
                dispatch({
                    type: CLEAR_ERRORS,
                    payload: res.data
                })
            }
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
            dispatch({
                type: CLEAR_SUCCESS,
                payload: err.response.data
            })
        })
}

// Set current user
export const setCurrentUser = decoded => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    };
};

// User Loading
export const setUserLoading = () => {
    return {
        type: USER_LOADING
    };
};

// Logout user
export const logoutUser = () => dispatch => {
    // Remove token from local storage
    localStorage.removeItem('jwtToken');
    // Remove Auth header 
    setAuthToken(false);
    // Set current user to empty object which sets isAuthenticated to false
    dispatch(setCurrentUser({}));
}