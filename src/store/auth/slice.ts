import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserType } from "../../models";

type S =  UserType

const initialState: S = {}

export const slice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        addUser: (_s, p: PayloadAction<UserType>) => {
            return p.payload
        },
        stripUser: (s) => {
            return {uid: s.uid}
        },
        updateUser: (s, p:PayloadAction<Partial<UserType>>) => {
            return {...s, ...p.payload}
        },
        signedOff: () => {
            return initialState 
        }
    }
})

export const authReducer = slice.reducer
export const authActions = slice.actions