import axios from 'axios';

import {
    GET_POSTS, 
    GET_ERRORS, 
    ADD_POST, 
    DELETE_POST, 
    POST_LOADING,
    CLEAR_ERRORS,
    GET_POST,
} from './types';

// POST - Get post by id 
export const getPost = (id) => dispatch => {
    dispatch(setPostLoading());
    axios
        .get(`/api/posts/${id}`)
            .then(res => dispatch({
                type: GET_POST,
                payload: res.data
            }))
            .catch(err => dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            }))
}

// POST - Get all posts
export const getPosts = () => dispatch => {
    dispatch(setPostLoading());
    axios
        .get('/api/posts')
            .then(res => dispatch({
                type: GET_POSTS,
                payload: res.data
            }))
            .catch(err => dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            }))
}

// POST - Get all posts by user id
export const getPostsById = (id) => dispatch => {
    dispatch(setPostLoading());
    axios
        .get(`/api/profile/${id}`)
            .then(res => dispatch({
                type: GET_POSTS,
                payload: res.data                
            }))
            .catch(err => dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            }))
}

// POST - Add post
export const addPost = (userData) => dispatch => {
    axios
        .post('/api/posts/add', userData)
            .then(res => 
                dispatch({
                    type: ADD_POST,
                    payload: res.data
                }),
                dispatch({
                    type: CLEAR_ERRORS,
                    payload: null
                })
            )
            .catch(err => dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            }))
}

// POST - Edit post
export const editPost = (id, userData) => dispatch => {
    axios
        .patch(`/api/posts/edit/${id}`, userData)
            .then(res => {
                dispatch({
                    type: CLEAR_ERRORS,
                    payload: null
                })
                if(res.data.success === true) {
                    dispatch(getPost(id))
                }
            })
            .catch(err => dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            }))
}
// POST - Remove post
export const deletePost = id => dispatch => {
    axios
        .delete(`/api/posts/remove/${id}`)
            .then(res => {
                if(res.data.success) {
                    dispatch({
                        type: DELETE_POST,
                        payload: id
                    })
                }
            })
            .catch(err => dispatch({
                type: GET_ERRORS,
                payload: null
            }))
}

// POST - Like post
export const likePost = id => dispatch => {
    axios
        .post(`/api/posts/like/${id}`)
        .then(res => dispatch(getPost(id)))
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }))
}

// POST - Unlike post 
export const unlikePost = id => dispatch => {
    axios
        .post(`/api/posts/unlike/${id}`)
        .then(res => dispatch(getPost(id)))
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }))
}

// Comment - Comment post
export const addComment = (id, userData) => dispatch => {
    axios
        .post(`/api/posts/comment/${id}`, userData)
        .then(res => {
            dispatch({
                type: CLEAR_ERRORS,
                payload: null
            })
            dispatch(getPost(id))
        })
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }))
}

// Comment - Delete Comment
export const deleteComment = (postID, commentID) => dispatch => {
    axios
        .delete(`/api/posts/comment/${postID}/${commentID}`)
        .then(res => dispatch(getPost(postID)))
        .catch(err => dispatch({
            type: GET_ERRORS,   
            payload: err.response.data
        }))
}

// POST - Set Post loading state
export const setPostLoading = () => {
    return {
        type: POST_LOADING
    };
};