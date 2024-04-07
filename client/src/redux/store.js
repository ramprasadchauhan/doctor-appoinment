import { configureStore, combineReducers } from "@reduxjs/toolkit";

import alertReducer from "./alertSlice";

const rootReducer = combineReducers({
  alerts: alertReducer,
});

const store = configureStore({
  reducer: rootReducer,
});
export default store;
