import { configureStore } from "@reduxjs/toolkit";
import selectSearchReducer from "./stores/selectSearch";
import scrollOffsetReducer from "./stores/scrollOffset";
import menusReducer from "./stores/menus";
import selectMenuReducer from "./stores/selectMenu";

const store = configureStore({
  reducer: {
    selectSearch: selectSearchReducer,
    scrollOffset: scrollOffsetReducer,
    menus: menusReducer,
    selectMenu: selectMenuReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
