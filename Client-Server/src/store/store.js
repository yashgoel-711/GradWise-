import { configureStore } from "@reduxjs/toolkit";
import trackAuthReducer from './features/trackAuthSlice'
import notificationReducer from './features/notificationSlice';
import navbarReducer from './features/navbarSlice.js'
const store = configureStore({
    reducer : {
        trackAuth : trackAuthReducer,
        notification : notificationReducer,
        navbar : navbarReducer
    }
})

export default store 