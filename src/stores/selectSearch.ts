import { createSlice } from "@reduxjs/toolkit";

interface SelectSearchState {
  value: boolean;
}
const initialSate: SelectSearchState = {
  value: false,
};
const selectSearchSlice = createSlice({
  name: "selectSearch",
  initialState: initialSate,
  reducers: {
    toggle: (state) => {
      state.value = !state.value;
    },
    setFalse: (state) => {
      state.value = false;
    },
  },
});

export const { toggle, setFalse } = selectSearchSlice.actions;
export default selectSearchSlice.reducer;
