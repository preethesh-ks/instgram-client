import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState:{
        response :null
    },
    reducers:{
        setResponse:(state,action)=>{
            state.response= action.payload
        }
    }
})
export const {setResponse} = userSlice.actions
export default userSlice.reducer;