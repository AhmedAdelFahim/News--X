import {createStore, combineReducers} from 'redux';
import authReducer from "../reducers/auth";
import sourcesReducer from "../reducers/sources";
import newsReducer from "../reducers/news";
import appHeadReducer from "../reducers/appHead";

export default () => {
    const store = createStore(combineReducers({
            authReducer,
            sourcesReducer,
            newsReducer,
            appHeadReducer
        })
    );
    return store;
};

