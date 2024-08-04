
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from '../slices/authSlice'
import employeeReducer from '../slices/employeeSlice'
import employerReducer from '../slices/employerSlice'


const rootReducer = combineReducers({
        authReducer,
        employeeReducer,
        employerReducer
})

const persistConfig = {
    key:'root',
    storage
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const Store = configureStore({
    reducer : persistedReducer
})

export const persistor = persistStore(Store)