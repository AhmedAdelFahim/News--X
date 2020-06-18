export const NEWS_LOADING = 'NEWS_LOADING';
export const NEWS_SUCCESS = 'NEWS_SUCCESS';
export const NEWS_ERROR = 'NEWS_ERROR';
export const SET_CURRENT_PAGE_NEWS = 'SET_CURRENT_PAGE_NEWS'
export const RESET_STORE_NEWS = 'RESET_STORE_NEWS'

export const newsLoading = () => {
    return {
        type: NEWS_LOADING
    }
};

export const getNewsSuccess = (news, pages) => {
    return {
        type: NEWS_SUCCESS,
        news,
        pages
    }
};

export const newsError = (error) => {
    return {
        type: NEWS_ERROR,
        error
    }
};

export const setCurrentPage = (page) => {
    return {
        type: SET_CURRENT_PAGE_NEWS,
        page
    }
}

export const resetStore = () => {
    return {
        type: RESET_STORE_NEWS
    }
};
