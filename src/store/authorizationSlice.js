import { createSlice } from "@reduxjs/toolkit";

const autorizationSlice = createSlice({
    name: 'autorize',
    initialState: {
        token: null
    },
    reducers: {
        login: (state, action) => {
            state.token = action.payload
            document.cookie = `${state.token}; max-age=3600000`;
           
        },
        logout: () => {
            document.cookie = `null; max-age=-1`;
        }
    },
})

export const { login, logout } = autorizationSlice.actions;

export default autorizationSlice.reducer;