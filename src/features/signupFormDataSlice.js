/*eslint-disable*/
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    signupFormData: ""
}

const signupFormDataSlice = createSlice({
    name: 'signup',
    initialState,
    reducers: {
        storeSignupFormData: (state, action) => {
            state.signupFormData = action.payload;
        }
    }
})
export const { storeSignupFormData } = signupFormDataSlice.actions
export default signupFormDataSlice.reducer