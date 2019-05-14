import { 
    GET_POSTS, 
    GET_POST, 
    ADD_POST, 
    DELETE_POST, 
    POST_LOADING,
    EDIT_POST,
    UPDATE_POST,
} from '../actions/types';

const initialState = {
    posts: [],
    post: {},
    loading: false
}

export default function(state = initialState, action) {
    switch (action.type) {
        case POST_LOADING: 
            return {
                ...state,
                loading: true
            };
        case GET_POSTS:
            return {
                ...state,
                posts: action.payload,
                loading: false
            };
        case GET_POST:
            return {
                ...state,
                posts: state.posts.map( post =>
                    (post._id===action.payload._id) ? 
                        action.payload:post),
                loading: false
            }
        case UPDATE_POST:
            return {
                ...state,
                posts: state.posts.map( post =>
                    (post._id===action.payload._id) ? 
                        action.payload:post),
                loading: false
            };           
        case ADD_POST:
            return {
                ...state,
                posts: [action.payload, ...state.posts]
            }
        case EDIT_POST: 
            return {
                ...state,
                posts:[action.payload, ...state.posts]
            }
        case DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter(post => post._id !== action.payload)
            };
        default: 
            return state;
    }
}