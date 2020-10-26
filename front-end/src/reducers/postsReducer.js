// Import custom components
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

var initialState = {
    posts:{},
    title:null,
    content:null,
    createdAt:null,
    editedAt:null,
    isLoading: false
};

/**
 * A reducer takes two arguments, the current state and an action.
 */
const postsReducer = (state, action) => {
    state = state || initialState;

    switch (action.type) {
        case GET_ALL_POSTS_SUCCESS:
            return Object.assign({}, state, {
                posts:action.data,
                title:null,
                content:null,
                createdAt:null,
                editedAt:null,
                isLoading: false
            });

        case GET_ALL_POSTS_FAILURE:
            return Object.assign({}, state, {
                posts:{},
                title:null,
                content:null,
                createdAt:null,
                editedAt:null,
                isLoading: false,
                errorMessage: action.error.message || 'Something went wrong.'
            });

        case ADD_POST_SUCCESS:
            return Object.assign({}, state, {
                isAuthenticated: false,
                isLoading: true,
                token: null,
            });

        default:
            return state;
    }
};

export default postsReducer;