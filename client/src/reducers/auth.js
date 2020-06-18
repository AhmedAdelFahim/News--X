import {
    SIGNIN_LOADING,
    SIGNIN_ERROR,
    SIGNUP_LOADING,
    SIGNUP_ERROR,
    ADD_NEW_ERROR_SIGN_UP,
    AUTH_SUCCESS,
    LOGOUT
} from "../actions/auth";

const defaultData = {
    isAuthUser: !!localStorage.getItem("user"),
    token: (JSON.parse(localStorage.getItem("user")) && JSON.parse(localStorage.getItem("user")).accessToken) || '',
    isLoadingSignup: false,
    signupErrors:{},
    isLoadingSignin: false,
    signinErrors:{},
    userId:(JSON.parse(localStorage.getItem("user")) && JSON.parse(localStorage.getItem("user")).userId) || '',
    name:(JSON.parse(localStorage.getItem("user")) && JSON.parse(localStorage.getItem("user")).name) || ''
}

export default (state = defaultData, action) => {
    switch (action.type) {
        case ADD_NEW_ERROR_SIGN_UP:
            return {
                ...state,
                signupErrors: {...state.signupErrors,[action.key] :action.message}
            }
        case SIGNUP_LOADING:
            return {
                ...state,
                isLoadingSignup: true,
                signupErrors: {}
            }
        case SIGNIN_LOADING:
            return {
                ...state,
                isLoadingSignin: true,
                signinErrors: {}
            }
        case AUTH_SUCCESS:
            localStorage.setItem("user", JSON.stringify(action.user));
            return {
                ...state,
                isLoadingSignup: false,
                isLoadingSignin: false,
                signinErrors: {},
                signupErrors: {},
                isAuthUser: true,
                token: action.user.accessToken,
                userId: action.user.userId,
                name: action.user.name
            }
        case SIGNUP_ERROR:
            return {
                ...state,
                isLoadingSignup: false,
                signupErrors: action.errors
            }
        case SIGNIN_ERROR:
            return {
                ...state,
                isLoadingSignin: false,
                signinErrors: action.errors
            }
        case LOGOUT:
            return {
                ...state,
                isAuthUser: false,
                token: '',
                userId: '',
                name:'',
            }
        default:
            return state
    }
}
