import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth'; // Import your auth reducer
const store = configureStore({
    reducer: {
        // Add your reducers here
        auth: authReducer, // Add the auth reducer to the store
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
        serializableCheck: false,
        }),
    });
    export default store;