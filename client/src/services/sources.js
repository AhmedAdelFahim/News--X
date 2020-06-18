import {
    sourceError,
    sourcesLoading,
    getSourcesSuccess,
    subscribeSourceSuccess,
    unsubscribeSourceSuccess,
    subscribeSourceError,
    subscribeSourceLoading,
    unsubscribeSourceError,
    unsubscribeSourceLoading
} from '../actions/sources';
import authHeader from './authHeader'
import axios from 'axios'
import {logout} from "../actions/auth";

export function getAllSources(dispatch) {
    return (query = '') => {
        dispatch(sourcesLoading());
        axios({
            headers: authHeader(),
            method: 'get',
            url: `${process.env.REACT_APP_BACKEND_URL}/sources?${query}`,
        }).then((response) => {
            if (response.data.sources && response.data.pages) {
                dispatch(getSourcesSuccess(response.data.sources, response.data.pages))

            }
        }).catch((error) => {
            if(error.response && error.response.status === 401) {
                localStorage.removeItem('user')
                dispatch(logout())
            } else if (error.response && error.response.data && error.response.data.message) {
                dispatch(sourceError(error.response.data))
            } else {
                dispatch(sourceError({message: 'network error'}))
            }
        })
    }
}

export function subscribeSource(dispatch) {
    return (userId, sourceId) => {
        dispatch(subscribeSourceLoading());
        axios({
            headers: authHeader(),
            method: 'patch',
            url: `${process.env.REACT_APP_BACKEND_URL}/users/${userId}/sources/${sourceId}/subscribe`,
        }).then((response) => {
            if (response.data.sourceId) {
                dispatch(subscribeSourceSuccess(response.data.sourceId))

            }
        }).catch((error) => {
            if(error.response && error.response.status === 401) {
                localStorage.removeItem('user')
                dispatch(logout())
            } else if (error.response && error.response.data && error.response.data.message) {
                dispatch(subscribeSourceError(error.response.data))
            } else {
                dispatch(subscribeSourceError({message: 'network error'}))
            }
        })
    }
}

export function unsubscribeSource(dispatch) {
    return (userId, sourceId) => {
        dispatch(unsubscribeSourceLoading());
        axios({
            headers: authHeader(),
            method: 'patch',
            url: `${process.env.REACT_APP_BACKEND_URL}/users/${userId}/sources/${sourceId}/unsubscribe`,
        }).then((response) => {
            if (response.data.sourceId) {
                dispatch(unsubscribeSourceSuccess(response.data.sourceId))

            }
        }).catch((error) => {
            if(error.response && error.response.status === 401) {
                localStorage.removeItem('user')
                dispatch(logout())
            } else if (error.response && error.response.data && error.response.data.message) {
                dispatch(unsubscribeSourceError(error.response.data))
            } else {
                dispatch(unsubscribeSourceError({message: 'network error'}))
            }
        })
    }
}
