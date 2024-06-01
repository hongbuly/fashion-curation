import { createSlice } from "@reduxjs/toolkit";

export interface IMenu {
  id: string;
  title: string;
  createdAt: number;
  selected: boolean;
  onClick: () => void;
}

interface MenusState {
  value: IMenu[];
}
const initialSate: MenusState = {
  value: [],
};
const menusSlice = createSlice({
  name: "menus",
  initialState: initialSate,
  reducers: {
    setMenus: (state, actions) => {
      state.value = actions.payload;
    },
  },
});

export const { setMenus } = menusSlice.actions;
export default menusSlice.reducer;
