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
    title: null,
    content: null,
    createdAt: null,
    isLoading: false
};

/**
 * A reducer takes two arguments, the current state and an action.
 */
const authReducer = (state, action) => {
    state = state || initialState;

    switch (action.type) {
        case LOG_IN_SUCCESS:
            return Object.assign({}, state, {
                isAuthenticated: true,
                isLoading: false,
                token: action.data,
            });

        case LOG_IN_FAILURE:
            return Object.assign({}, state, {
                isAuthenticated: false,
                isLoading: false,
                token: null,
                errorMessage: action.error.message || 'Something went wrong.'
            });

        case LOG_OUT_SUCCESS:
            return Object.assign({}, state, {
                isAuthenticated: false,
                isLoading: true,
                token: null,
            });

        default:
            return state;
    }
};

export default authReducer;