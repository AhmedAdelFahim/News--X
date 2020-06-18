import {
    SOURCES_ERROR,
    SOURCES_SUCCESS,
    SOURCES_LOADING,
    SET_CURRENT_PAGE,
    RESET_STORE,
    SUBSCRIBE_SOURCE_SUCCESS,
    UNSUBSCRIBE_SOURCE_SUCCESS,
    SUBSCRIBE_SOURCE_LOADING,
    SUBSCRIBE_SOURCE_ERROR,
    UNSUBSCRIBE_SOURCE_ERROR,
    UNSUBSCRIBE_SOURCE_LOADING
} from "../actions/sources";

const defaultData = {
    isSubscribeLoading: false,
    isUnsubscribeLoading: false,
    isLoading: false,
    subscribeError: {},
    unsubscribeError: {},
    error: {},
    sources: [],
    pages: {},
    currentPage: 1
}

export default (state = defaultData, action) => {
    switch (action.type) {
        case SOURCES_LOADING:
            return {
                ...state,
                isLoading: true,
                error: {}
            }
        case SUBSCRIBE_SOURCE_LOADING:
            return {
                ...state,
                isSubscribeLoading: true,
                subscribeError: {}
            }
        case UNSUBSCRIBE_SOURCE_LOADING:
            return {
                ...state,
                isUnsubscribeLoading: true,
                unsubscribeError: {}
            }
        case SOURCES_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: {},
                sources: action.sources,
                pages: action.pages
            }
        case SOURCES_ERROR:
            return {
                ...state,
                isLoading: false,
                error: action.error
            }
        case SUBSCRIBE_SOURCE_ERROR:
            return {
                ...state,
                isSubscribeLoading: false,
                subscribeError: action.error
            }
        case UNSUBSCRIBE_SOURCE_ERROR:
            return {
                ...state,
                isUnsubscribeLoading: false,
                unsubscribeError: action.error
            }
        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.page
            }
        case RESET_STORE:
            return {
                ...state,
                currentPage: 1,
                sources: [],
                pages: {}
            }
        case SUBSCRIBE_SOURCE_SUCCESS:
            return {
                ...state,
                isSubscribeLoading: false,
                sources: state.sources.map((source) => {
                    if (source.id === action.source) {
                        source.isSourceSubscribed = true;
                    }
                    return source
                })
            }
        case UNSUBSCRIBE_SOURCE_SUCCESS:
            return {
                ...state,
                isUnsubscribeLoading: false,
                sources: state.sources.map((source) => {
                    if (source.id === action.source) {
                        source.isSourceSubscribed = false;
                    }
                    return source
                })
            }
        default:
            return state
    }
}
