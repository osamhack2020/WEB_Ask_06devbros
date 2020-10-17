import {
    LOG_IN_SUCCESS,
    LOG_IN_FAILURE,
    LOG_OUT_SUCCESS,
} from '../constants/actionType';

export const loginSuccess = (data) => {
    return {
        type: LOG_IN_SUCCESS,
        data
    };
};

export const loginFailure = (error) => {
    return {
        type: LOG_IN_FAILURE,
        error
    };
};

export const logoutSuccess = () => {
    return {
        type: LOG_OUT_SUCCESS
    };
};