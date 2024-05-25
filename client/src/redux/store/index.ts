import { MakeStore, createWrapper } from 'next-redux-wrapper';
import { createStore, applyMiddleware, Store } from 'redux';
import thunk from 'redux-thunk';
import reducer from '../reducers';

const store: MakeStore<Store> = (initialState: {}) => createStore(reducer, initialState, applyMiddleware(thunk));

export const reduxWrapper = createWrapper<Store>(store);
