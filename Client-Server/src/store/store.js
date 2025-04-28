import { configureStore } from "@reduxjs/toolkit";
import trackAuthReducer from './features/trackAuthSlice'
import notificationReducer from './features/notificationSlice';
const store = configureStore({
    reducer : {
        trackAuth : trackAuthReducer,
        notification : notificationReducer,
    }
})

export default store 