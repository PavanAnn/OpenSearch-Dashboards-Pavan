import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import logReducer from './states/index';
const rootReducer = combineReducers({ logReducer });

const store = configureStore({
  reducer: rootReducer,
});

export default store;
export type RootState = ReturnType<typeof rootReducer>;
