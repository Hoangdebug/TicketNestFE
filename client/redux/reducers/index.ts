import { combineReducers } from 'redux';
import { localeReducer, modalReducer } from './common';
import { loaderReducer } from './api';

const rootReducers = combineReducers({
    locale: localeReducer,
    modal: modalReducer,
    loader: loaderReducer,
});
export type ReduxStates = ReturnType<typeof rootReducers>;
export default rootReducers;
