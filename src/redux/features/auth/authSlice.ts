import { RootState } from "@/redux/store";
import { createSlice } from "@reduxjs/toolkit";

export type TUser = {
    userId: string;
    userRole: string;
    userEmail: string;
    iat: number;
    exp: number;
}


type TAuthState = {
    user: null | TUser;
}


const initialState: TAuthState = {
    user: null,
}


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action) => {
            const { user } = action.payload;
            state.user = user;
        },
        logout: (state) => {
            state.user = null;
        },
    },
});


export const { setUser, logout } = authSlice.actions;

export default authSlice.reducer;


export const selectCurrentUser = (state: RootState) => state.auth.user;