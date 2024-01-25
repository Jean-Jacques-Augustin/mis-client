import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {persistReducer, persistStore} from "redux-persist";
import storage from "redux-persist/lib/storage"; // Choisissez le type de stockage approprié (localStorage, AsyncStorage, etc.)

import {misApi} from "./apiSlice";
import cartReducer from "./cartSlice";
import userReducer from "./userSlice";

const rootReducer = combineReducers({
    cart: cartReducer,
    user: userReducer,
    [misApi.reducerPath]: misApi.reducer,
});

const persistConfig = {
    key: "root",
    storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(misApi.middleware),
});

const persistor = persistStore(store);

export {store, persistor};
export type RootState = ReturnType<typeof rootReducer>;
