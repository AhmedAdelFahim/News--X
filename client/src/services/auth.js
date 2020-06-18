import {signupLoading, signupError, authSuccess, signInError, signInLoading} from '../actions/auth';

import axios from 'axios'
export function signup(dispatch) {
    return (data) => {
        dispatch(signupLoading());
        axios({
            method: 'post',
            url: `${process.env.REACT_APP_BACKEND_URL}/auth/users/signup`,
            data
        }).then((response) => {
            dispatch(authSuccess(response.data))
        }).catch((error) => {
            if(error.response.data && error.response.data.errors){
                dispatch(signupError(error.response.data.errors));
            }
            dispatch(signupError({errors: {message:'network error'}}));
        })
    }
};

export function signin(dispatch) {
    return (data) => {
        dispatch(signInLoading());
        axios({
            method: 'post',
            url: `${process.env.REACT_APP_BACKEND_URL}/auth/users/signin`,
            data
        }).then((response) => {
            dispatch(authSuccess(response.data))
        }).catch((error) => {
            console.log(error)
            if(error.response && error.response.data && error.response.data.error){
                dispatch(signInError(error.response.data));
            }
            dispatch(signInError({errors: {message:'network error'}}));
        })
    }
}
