import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {persistReducer, persistStore} from "redux-persist";
import storage from "redux-persist/lib/storage";

import {misApi} from "./apiSlice";
import cartReducer from "./cartSlice";
import userReducer from "./userSlice";

// Configuring persist for the cart reducer
const cartPersistConfig = {
    key: "cart",
    storage: storage,
    whitelist: ["items"],
};

const persistedCartReducer = persistReducer(
    cartPersistConfig,
    cartReducer
);

// Configuring persist for the user reducer
const userPersistConfig = {
    key: "user",
    storage: storage,
    whitelist: ["user"],
};

const persistedUserReducer = persistReducer(
    userPersistConfig,
    userReducer
);

const rootReducer = combineReducers({
    cart: persistedCartReducer,
    user: persistedUserReducer,
    [misApi.reducerPath]: misApi.reducer,
});

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(misApi.middleware),
});

const persistor = persistStore(store);

export {store, persistor};
export type RootState = ReturnType<typeof rootReducer>;
