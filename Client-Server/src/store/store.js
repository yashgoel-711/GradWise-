import { configureStore } from "@reduxjs/toolkit";
import trackAuthReducer from './features/trackAuthSlice'

const store = configureStore({
    reducer : {
        trackAuth : trackAuthReducer
    }
})

export default store 