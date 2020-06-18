
export const SOURCES_LOADING = 'SOURCES_LOADING';
export const SOURCES_SUCCESS = 'SOURCES_SUCCESS';
export const SOURCES_ERROR = 'SOURCES_ERROR';
export const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE'
export const RESET_STORE = 'RESET_STORE'
export const SUBSCRIBE_SOURCE_LOADING = 'SUBSCRIBE_SOURCE_LOADING';
export const SUBSCRIBE_SOURCE_SUCCESS = 'SUBSCRIBE_SOURCE_SUCCESS';
export const SUBSCRIBE_SOURCE_ERROR = 'SUBSCRIBE_SOURCE_ERROR';
export const UNSUBSCRIBE_SOURCE_LOADING = 'UNSUBSCRIBE_SOURCE_LOADING';
export const UNSUBSCRIBE_SOURCE_SUCCESS = 'UNSUBSCRIBE_SOURCE_SUCCESS';
export const UNSUBSCRIBE_SOURCE_ERROR = 'UNSUBSCRIBE_SOURCE_ERROR';

export const sourcesLoading = () => {
    return {
        type: SOURCES_LOADING
    }
};

export const resetStore = () => {
    return {
        type: RESET_STORE
    }
};


export const getSourcesSuccess = (sources, pages) => {
    return {
        type: SOURCES_SUCCESS,
        sources,
        pages
    }
};

export const sourceError = (error) => {
    return {
        type: SOURCES_ERROR,
        error
    }
};


export const setCurrentPage = (page) => {
    return {
        type: SET_CURRENT_PAGE,
        page
    }
}

export const subscribeSourceLoading = () => {
    return {
        type: SUBSCRIBE_SOURCE_LOADING
    }
};

export const unsubscribeSourceLoading = () => {
    return {
        type: UNSUBSCRIBE_SOURCE_LOADING
    }
};

export const subscribeSourceSuccess = (source) => {
    return {
        type: SUBSCRIBE_SOURCE_SUCCESS,
        source
    }
};

export const subscribeSourceError = (error) => {
    return {
        type: SUBSCRIBE_SOURCE_ERROR,
        error
    }
};

export const unsubscribeSourceError = (error) => {
    return {
        type: UNSUBSCRIBE_SOURCE_ERROR,
        error
    }
};

export const unsubscribeSourceSuccess = (source) => {
    return {
        type: UNSUBSCRIBE_SOURCE_SUCCESS,
        source
    }
};
