import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
 import userReducer from '../slices/userSlices'



//Combine reducers
const rootReducer = combineReducers({
    userReducer

});

const persistConfig = {
    key: 'root',
    storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create Redux store
export const myStore = configureStore({
    reducer: persistedReducer,
});

export const persistor = persistStore(myStore);
