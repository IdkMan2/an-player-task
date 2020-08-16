import {Action, ThunkAction} from "@reduxjs/toolkit";
import {rootReducer} from "./rootReducer";
import {store} from "./store";

export type RootState = ReturnType<typeof rootReducer>;

export type StandardDispatch = typeof store.dispatch;

export type StandardThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;

export type StandardThunkFunction<Arguments = void, ReturnType = void> = (...args: any[]) => StandardThunk<any>;