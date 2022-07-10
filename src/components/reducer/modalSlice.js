import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  displayDeleteModal: false,
};
export const modalReducer = createSlice({
  name: 'modal',
  initialState,

  reducers: {
    setDisplayDeleteModal: (state, action) => {
      state.displayDeleteModal = action.payload.display;
    },
  },
});

export const { setDisplayDeleteModal } = modalReducer.actions;

export const getDeleteModal = (state) => state.modalSlice.displayDeleteModal;

export default modalReducer.reducer;
