import {
    LOG_IN_SUCCESS,
    LOG_IN_FAILURE,
    LOG_OUT_SUCCESS,
} from '../constants/actionType';

export const postsSuccess = (data) => {
    return {
        type: LOG_IN_SUCCESS,
        data
    };
};

export const postsFailure = (error) => {
    return {
        type: LOG_IN_FAILURE,
        error
    };
};
