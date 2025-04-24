import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: !!localStorage.getItem("studentData"),
    studentData: JSON.parse(localStorage.getItem("studentData")) || null,
};

const trackAuthSlice = createSlice({
    name : "trackAuth",
    initialState,
    reducers:{
        login : (state,action)=>{

            state.status = true ;
            state.studentData = action.payload
            
        },
        logout : (state)=>{
            state.status = false,
            state.studentData = null
            localStorage.removeItem("studentData"); 
        }
    } 
})

export const{login,logout} = trackAuthSlice.actions
export default trackAuthSlice.reducer