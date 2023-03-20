import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface S {
    uid: string | null 
}

const initialState: S = {
    uid: null 
}

export const slice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        signedIn: (s, p:PayloadAction<string>) => {
            s.uid = p.payload
        },
        signedOff: (s) => {
            s.uid = null 
        }
    }
})

export const authReducer = slice.reducer
export const authActions = slice.actions