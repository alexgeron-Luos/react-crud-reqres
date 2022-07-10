import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  title: 'ReqRes Users',
};
export const headerReducer = createSlice({
  name: 'header',
  initialState,

  reducers: {
    addTitle: (state, action) => {
      state.title = action.payload.title;
    },
  },
});

export const { addTitle } = headerReducer.actions;

//TODO change type
export const selectTitle = (state) => state.headerSlice.title;
export default headerReducer.reducer;
