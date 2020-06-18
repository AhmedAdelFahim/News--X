import {NEWS_ERROR, NEWS_SUCCESS, NEWS_LOADING, SET_CURRENT_PAGE_NEWS, RESET_STORE_NEWS} from "../actions/news";

const defaultData = {
    isLoading: false,
    error: {},
    news: [],
    pages: {},
    currentPage: 1
}

export default (state = defaultData, action) => {
    switch (action.type) {
        case NEWS_LOADING:
            return {
                ...state,
                isLoading: true,
                error: {}
            }
        case NEWS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: {},
                news: action.news,
                pages: action.pages
            }
        case NEWS_ERROR:
            return {
                ...state,
                isLoading: false,
                error: action.error
            }
        case SET_CURRENT_PAGE_NEWS:
            return {
                ...state,
                currentPage: action.page
            }
        case RESET_STORE_NEWS:
            return {
                ...state,
                currentPage: 1,
                news: [],
                pages: {},
                error: {}
            }
        default:
            return state
    }
}
