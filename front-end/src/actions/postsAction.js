import {
    GET_ALL_POSTS_FAILURE,
    GET_ALL_POSTS_SUCCESS,
    ADD_POST_FAILURE,
    ADD_POST_SUCCESS,
    GET_POST_FAILURE,
    GET_POST_SUCCESS,
    EDIT_POST_FAILURE,
    EDIT_POST_SUCCESS,
    DELETE_POST_FAILURE,
    DELETE_POST_SUCCESS,
} from '../constants/actionType';

export const getAllPostsSuccess = (data) => {
    return {
        type: GET_ALL_POSTS_SUCCESS,
        data
    };
};

export const getAllPostsFailure = (error) => {
    return {
        type: GET_ALL_POSTS_FAILURE,
        error
    };
};

export const addPostSuccess = (data) => {
    return {
        type: ADD_POST_SUCCESS,
        data
    };
};

export const addPostFailure = (error) => {
    return {
        type: ADD_POST_FAILURE,
        error
    };
};

export const getPostSuccess = (data) => {
    return {
        type: GET_POST_SUCCESS,
        data
    };
};

export const getPostFailure = (error) => {
    return {
        type: GET_POST_FAILURE,
        error
    };
};

export const editPostSuccess = (data) => {
    return {
        type: EDIT_POST_SUCCESS,
        data
    };
};

export const editPostFailure = (error) => {
    return {
        type: EDIT_POST_FAILURE,
        error
    };
};

export const deletePostSuccess = (data) => {
    return {
        type: DELETE_POST_SUCCESS,
        data
    };
};

export const deletePostFailure = (error) => {
    return {
        type: DELETE_POST_FAILURE,
        error
    };
};
