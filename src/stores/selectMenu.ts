import { createSlice } from "@reduxjs/toolkit";

interface SelectMenuState {
  value: string;
}
const initialSate: SelectMenuState = {
  value: "",
};
const selectMenuSlice = createSlice({
  name: "selectMenu",
  initialState: initialSate,
  reducers: {
    setSelectMenu: (state, actions) => {
      state.value = actions.payload;
    },
  },
});

export const { setSelectMenu } = selectMenuSlice.actions;
export default selectMenuSlice.reducer;
