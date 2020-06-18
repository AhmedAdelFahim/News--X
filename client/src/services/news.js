import {getNewsSuccess, newsLoading, newsError} from "../actions/news";
import axios from "axios";
import authHeader from "./authHeader";

export function getAllNews(dispatch) {
    return (query = '') => {
        dispatch(newsLoading());
        axios({
            headers: authHeader(),
            method: 'get',
            url: `${process.env.REACT_APP_BACKEND_URL}/users/news?${query}`,
        }).then((response) => {
            if (response.data.news && response.data.pages) {
                dispatch(getNewsSuccess(response.data.news, response.data.pages))
            }
        }).catch((error) => {
            if (error.response && error.response.data && error.response.data.message) {
                dispatch(newsError(error.response.data))
            } else {
                dispatch(newsError({message: 'network error'}))
            }
        })
    }
};
