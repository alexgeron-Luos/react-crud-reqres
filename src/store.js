import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './components/reducer/usersSlice';
import headerSlice from './components/reducer/headerSlice';
import modalSlice from './components/reducer/modalSlice';

export default configureStore({
  reducer: { usersReducer, headerSlice, modalSlice },
});
