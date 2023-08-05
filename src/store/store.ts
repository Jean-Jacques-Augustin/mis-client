import {configureStore} from '@reduxjs/toolkit';
import {misApi} from './apiSlice';

const store = configureStore({
    reducer: {
        [misApi.reducerPath]: misApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(misApi.middleware),
});

export default store;