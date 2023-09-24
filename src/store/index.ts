import {configureStore} from "@reduxjs/toolkit";
import converterReducer from "./converter.slice";


export const store = configureStore({
    reducer: {
        converterState: converterReducer
    }
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch