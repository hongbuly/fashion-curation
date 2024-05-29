import { configureStore } from "@reduxjs/toolkit";
import selectSearchReducer from "./stores/selectSearch";

const store = configureStore({
  reducer: {
    selectSearch: selectSearchReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
