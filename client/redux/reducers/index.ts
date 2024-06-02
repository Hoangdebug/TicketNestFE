import { combineReducers } from 'redux';
import { localeReducer, modalReducer } from './common';
import { loaderReducer, memberReducer } from './api';

const rootReducers = combineReducers({
    locale: localeReducer,
    modal: modalReducer,
    loader: loaderReducer,
    profile: memberReducer,
});
export type ReduxStates = ReturnType<typeof rootReducers>;
export default rootReducers;
