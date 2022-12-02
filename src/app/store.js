/*eslint-disable*/

import { configureStore } from '@reduxjs/toolkit'
import signupFormReducer from '../features/signupFormDataSlice'
export const store = configureStore({
    reducer: {
        signupFormData: signupFormReducer

    },
})

export default store;