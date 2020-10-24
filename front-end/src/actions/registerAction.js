import {
    SIGN_UP_FAILURE,
    SIGN_UP_SUCCESS,
} from '../constants/actionType';

export const registerSuccess = (data) => {
    return {
        type: SIGN_UP_SUCCESS,
        data
    };
};

export const registerFailure = (error) => {
    return {
        type: SIGN_UP_FAILURE,
        error
    };
};
