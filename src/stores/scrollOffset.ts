import { createSlice } from "@reduxjs/toolkit";

interface ScrollOffsetState {
  value: number;
}
const initialSate: ScrollOffsetState = {
  value: 0,
};
const scrollOffsetSlice = createSlice({
  name: "scrollOffset",
  initialState: initialSate,
  reducers: {
    resetScroll: (state) => {
      state.value = 0;
    },
    upCurrentScroll: (state) => {
      state.value = state.value + 1;
    },
    downCurrentScroll: (state) => {
      if (state.value > 0) state.value = state.value - 1;
    },
  },
});

export const { resetScroll, upCurrentScroll, downCurrentScroll } =
  scrollOffsetSlice.actions;
export default scrollOffsetSlice.reducer;
