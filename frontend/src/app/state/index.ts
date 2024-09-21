import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface User {
    id: string;
    firstName: string;
    lastName: string;
    organization: string;
    email: string;
}

export interface InitialStateTypes {
    isSidebarCollapsed: boolean;
    isDarkMode: boolean;
    isSignupMode: boolean;
    isAuthenticated: boolean;
    user: User;
}

const initialState: InitialStateTypes = {
    isSidebarCollapsed: false,
    isDarkMode: false,
    isSignupMode: false,
    isAuthenticated: false,
    user: {
        id: '',
        firstName: '',
        lastName: '',
        organization: '',
        email: '',
    }
}

export const globalSlice = createSlice({
    name: 'global',
    initialState,
    reducers: {
        setIsSidebarCollapsed: (state, action: PayloadAction<boolean>) => {
            state.isSidebarCollapsed = action.payload;
        },
        setisDarkMode: (state, action: PayloadAction<boolean>) => {
            state.isDarkMode = action.payload;
        },
        setIsSignupMode: (state, action: PayloadAction<boolean>) => {
            state.isSignupMode = action.payload;
        },
        setIsAuthenticated: (state, action: PayloadAction<boolean>) => {
            state.isAuthenticated = action.payload;
        },
        setUser: (state, action: PayloadAction<User>) => {
            state.user = action.payload;
        }
    }

})

export const {setIsSidebarCollapsed, setisDarkMode, setIsSignupMode, setIsAuthenticated, setUser} = globalSlice.actions;
export default globalSlice.reducer;