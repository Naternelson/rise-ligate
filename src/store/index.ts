import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { RootReducer } from "./reducer";

export const store = configureStore({
    reducer: RootReducer
})
type RootState = ReturnType<typeof store.getState> 
type RootDispatch = typeof store.dispatch
export const useAppSelector = useSelector<RootState>
export const useAppDispatch = useDispatch<RootDispatch>