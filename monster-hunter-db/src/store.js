import { configureStore } from '@reduxjs/toolkit';
import yourReducer from './reducers';

const store = configureStore({
    reducer: yourReducer
});

export default store;