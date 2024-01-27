import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {persistReducer, persistStore} from "redux-persist";

import {misApi} from "./apiSlice";
import cartReducer from "./cartSlice";
import userReducer from "./userSlice";

const rootReducer = combineReducers({
    cart: cartReducer,
    user: userReducer,
    [misApi.reducerPath]: misApi.reducer,
});


const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(misApi.middleware),
});

export {store};
export type RootState = ReturnType<typeof rootReducer>;
