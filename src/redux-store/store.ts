import {configureStore, getDefaultMiddleware} from "@reduxjs/toolkit";
import {rootReducer} from "./rootReducer";

function configureReduxStore() {
  return configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware()
  });
}

export const store = configureReduxStore();
