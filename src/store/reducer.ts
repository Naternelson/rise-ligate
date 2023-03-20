import { combineReducers } from "@reduxjs/toolkit";
import { authReducer } from "./auth/slice";

export const RootReducer = combineReducers({
    auth: authReducer
})  