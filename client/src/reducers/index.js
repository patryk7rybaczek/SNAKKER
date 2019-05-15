import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import successReducer from './successReducer';
import postReducer from './postReducer';
import usersReducer from './usersReducer';

export default combineReducers({
    auth: authReducer,
    post: postReducer,
    users: usersReducer,
    error: errorReducer,
    success: successReducer
});