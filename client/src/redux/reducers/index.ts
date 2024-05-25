import { combineReducers } from 'redux';
import { loaderReducer } from './api';

const rootReducers = combineReducers({
    loader: loaderReducer,
});
export type ReduxStates = ReturnType<typeof rootReducers>;
export default rootReducers;
